import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {},
    plugins: [typography],
}

export default config
