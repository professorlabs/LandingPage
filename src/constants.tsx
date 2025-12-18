
import React from 'react';

export const FORMULAS = [
  "E = mc²",
  "∇²ψ = -8πmE/h² ψ",
  "∂f/∂t + v·∇f = 0",
  "∫₀^∞ e^(-x²) dx = √π/2",
  "lim(n→∞) (1+1/n)^n = e",
  "∂²u/∂t² = c²∇²u",
  "det(A - λI) = 0",
  "L = -∑yᵢlog(ŷᵢ)",
  "∇θJ(θ) = 0",
  "σ(z) = 1/(1+e^(-z))",
  "y = WX + b",
  "w = w - α∇L(w)",
  "ReLU(x) = max(0, x)",
  "softmax(xᵢ) = e^xᵢ / ∑e^xⱼ",
  "○→○→○ [784]→[128]→[10]",
  "Epoch: 1000 Loss: 0.001↓",
  "Accuracy: 99.8%↑",
  "model.fit(X, y)",
  "[[θ₀, θ₁], [θ₂, θ₃]]"
];

export const SERVICES = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Specialized in building autonomous agents for automation and LLM-based intelligence systems.',
    icon: '🧠',
    tag: 'Available Service'
  },
  {
    id: 'ios-apps',
    title: 'iOS Apps',
    description: 'In-house SaaS product development only. Not available for client services.',
    icon: '📱',
    tag: 'In-House Product'
  },
  {
    id: 'android-apps',
    title: 'Android Apps',
    description: 'Cross-platform mobile application development using Flutter for broad reach and performance.',
    icon: '🤖',
    tag: 'Available Service'
  },
  {
    id: 'web-apps',
    title: 'Web Apps',
    description: 'Custom web technology solutions tailored specifically to customer needs and requirements.',
    icon: '🌐',
    tag: 'Available Service'
  },
  {
    id: 'enterprise-ai',
    title: 'Enterprise AI',
    description: 'Full-scale machine learning integration for enterprise-level automation and intelligence.',
    icon: '🏢',
    tag: 'Available Service'
  },
  {
    id: 'book-order',
    title: 'Book order',
    description: 'Initiate a new development project with our expert team.',
    icon: '📝',
    tag: 'Direct Service'
  }
];

export const COLORS = {
  royalBlue: '#002366',
  royalBlueHover: '#001a4d',
};
