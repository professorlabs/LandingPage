import { redirect } from "next/navigation";
import { isAuthenticated, getSubmissions, logout, deleteSubmission } from "../../../actions/submissions";
import React from 'react';

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const auth = await isAuthenticated();
    if (!auth) {
        redirect("/hack/admin/login");
    }

    const submissions = await getSubmissions();

    const handleLogout = async () => {
        "use server";
        await logout();
    };

    const handleDelete = async (formData: FormData) => {
        "use server";
        const id = formData.get("id") as string;
        await deleteSubmission(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-serif">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/logo.svg" alt="ProfessorLab" className="w-8 h-8" />
                            <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
                        </div>
                        <div className="flex items-center">
                            <form action={handleLogout}>
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 font-sans uppercase tracking-widest transition-colors">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                    <div className="bg-white overflow-hidden shadow border border-gray-100 p-5">
                        <dt className="text-sm font-medium text-gray-500 truncate font-sans uppercase tracking-wider">
                            Total Submissions
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {submissions.length}
                        </dd>
                    </div>
                    <div className="bg-white overflow-hidden shadow border border-gray-100 p-5">
                        <dt className="text-sm font-medium text-gray-500 truncate font-sans uppercase tracking-wider">
                            Bookings
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-blue-900">
                            {submissions.filter((s: any) => s.type === 'booking').length}
                        </dd>
                    </div>
                    <div className="bg-white overflow-hidden shadow border border-gray-100 p-5">
                        <dt className="text-sm font-medium text-gray-500 truncate font-sans uppercase tracking-wider">
                            Inquiries
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-900">
                            {submissions.filter((s: any) => s.type === 'inquiry').length}
                        </dd>
                    </div>
                </div>

                <div className="bg-white shadow border border-gray-100 overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {submissions.map((sub: any) => (
                            <li key={sub.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-none border ${sub.type === 'booking' ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-green-50 border-green-200 text-green-900'
                                                }`}>
                                                {sub.type}
                                            </span>
                                            <span className="text-xs text-gray-400 font-sans">
                                                {new Date(sub.createdAt).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                {sub.name && <p className="text-sm font-medium text-gray-900 mb-1">{sub.name}</p>}
                                                <p className="text-sm text-gray-500 font-sans">{sub.email}</p>
                                                {sub.phone && <p className="text-xs text-gray-400 font-sans mt-0.5">{sub.phone}</p>}
                                            </div>
                                            <div>
                                                {sub.softwareType && <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">{sub.softwareType}</p>}
                                                <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-2">
                                                    "{sub.description || sub.inquiry}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <form action={handleDelete}>
                                            <input type="hidden" name="id" value={sub.id} />
                                            <button className="text-xs text-red-300 hover:text-red-600 font-sans uppercase tracking-widest transition-colors">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {submissions.length === 0 && (
                            <li className="p-10 text-center text-gray-400 font-sans italic">
                                No submissions found.
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
