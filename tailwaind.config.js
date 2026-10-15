/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // 👈 هذا السطر هو المفتاح لتفعيل التبديل عبر الكلاس
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
