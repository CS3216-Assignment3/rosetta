import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "rosetta-white": "#fbfbfb",
                "rosetta-navy": "#09006d",
                "rosetta-orange": "#ff5e00",
                "rosetta-lime": "#b1e600",
            },
            fontFamily: {
                inter: ["var(--font-inter)"],
                titan: ["var(--font-titan)"],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;
