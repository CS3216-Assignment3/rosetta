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
                "rosetta-lime": "#b1e600",

                "rosetta-orange": "#ff5e00",
                "rosetta-sienna": "#ee6c4d",
                "rosetta-coral": "#f38d68",
                "rosetta-jet": "#33312e",

                "blaze-orange": {
                    "50": "#fff7ec",
                    "100": "#ffeed3",
                    "200": "#ffd9a5",
                    "300": "#ffbe6d",
                    "400": "#ff9632",
                    "500": "#ff770a",
                    "600": "#ff5e00",
                    "700": "#cc4202",
                    "800": "#a1340b",
                    "900": "#822d0c",
                    "950": "#461404",
                },
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
    plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
export default config;
