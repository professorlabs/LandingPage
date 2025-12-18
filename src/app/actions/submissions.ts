"use server";

import { kv } from "@vercel/kv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const ADMIN_USER = "professorlabbyrifat";
const ADMIN_PASS = "*#@byrifat2748";
const SESSION_COOKIE = "admin_session";

const isKVConfigured = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
const LOCAL_DB_PATH = path.join(process.cwd(), "db_submissions.json");

export interface Submission {
    id: string;
    type: "inquiry" | "booking";
    email: string;
    createdAt: string;
    inquiry?: string;
    name?: string;
    phone?: string;
    softwareType?: string;
    description?: string;
    [key: string]: any; // Allow for other metadata if needed
}

// Helper for local storage
function getLocalSubmissions(): Submission[] {
    if (!fs.existsSync(LOCAL_DB_PATH)) return [];
    try {
        const data = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveLocalSubmissions(subs: Submission[]) {
    try {
        fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(subs, null, 2));
    } catch (e) {
        console.error("Local save failed", e);
    }
}

export async function login(formData: FormData) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    redirect("/hack/admin/login");
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value === "authenticated";
}

export async function saveInquiry(data: { email: string; inquiry: string }) {
    try {
        const id = Date.now().toString();
        const submission: Submission = {
            id,
            type: "inquiry",
            ...data,
            createdAt: new Date().toISOString(),
        };

        if (isKVConfigured) {
            await kv.lpush("submissions", submission);
        } else {
            console.log("KV not configured, saving to local file:", submission);
            const subs = getLocalSubmissions();
            subs.unshift(submission);
            saveLocalSubmissions(subs);
        }

        revalidatePath("/hack/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to save inquiry:", error);
        return { success: false, error: "Failed to save inquiry" };
    }
}

export async function saveBooking(data: {
    name: string;
    phone: string;
    email: string;
    softwareType: string;
    description: string;
}) {
    try {
        const id = Date.now().toString();
        const submission: Submission = {
            id,
            type: "booking",
            ...data,
            createdAt: new Date().toISOString(),
        };

        if (isKVConfigured) {
            await kv.lpush("submissions", submission);
        } else {
            console.log("KV not configured, saving to local file:", submission);
            const subs = getLocalSubmissions();
            subs.unshift(submission);
            saveLocalSubmissions(subs);
        }

        revalidatePath("/hack/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to save booking:", error);
        return { success: false, error: "Failed to save booking" };
    }
}

export async function getSubmissions(): Promise<Submission[]> {
    if (!(await isAuthenticated())) {
        throw new Error("Unauthorized");
    }

    try {
        if (isKVConfigured) {
            const submissions = await kv.lrange<Submission>("submissions", 0, -1);
            return submissions;
        } else {
            return getLocalSubmissions();
        }
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        return [];
    }
}

export async function deleteSubmission(id: string) {
    if (!(await isAuthenticated())) {
        throw new Error("Unauthorized");
    }

    try {
        if (isKVConfigured) {
            const submissions = await kv.lrange<Submission>("submissions", 0, -1);
            const filtered = submissions.filter((s) => s.id !== id);

            await kv.del("submissions");
            if (filtered.length > 0) {
                await kv.lpush("submissions", ...filtered.reverse());
            }
        } else {
            const subs = getLocalSubmissions();
            const filtered = subs.filter((s) => s.id !== id);
            saveLocalSubmissions(filtered);
        }

        revalidatePath("/hack/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete submission:", error);
        return { success: false };
    }
}
