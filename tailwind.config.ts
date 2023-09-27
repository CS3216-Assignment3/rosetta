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
                "rosetta-navy": "#09006d",
                "rosetta-orange": "#ff5e00",
                "rosetta-lime": "#b1e600",

                "rosetta-sienna": "#ee6c4d",
                "rosetta-coral": "#f38d68",
                "rosetta-purple": "#662c91",
                "rosetta-green": "#17a398",
                "rosetta-jet": "#33312e",

                "rosetta-cerulean": "#006e90",
                "rosetta-carrot": "#f18f01",
                "rosetta-columbia": "#adcad6",
                "rosetta-yelleen": "#99c24d",
                "rosetta-aero": "#41bbd9",
            },
            fontFamily: {
                baloo: ["var(--font-baloo)"],
            },
            boxShadow: {
                inset: "inset 0 -4px 0 0 rgba(0,0,0,0.2)",
                inset2: "inset 0 -6px 0 0 rgba(0,0,0,0.2)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;
