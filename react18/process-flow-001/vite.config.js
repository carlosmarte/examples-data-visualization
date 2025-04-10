import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remove the tailwindcss import as it's not needed here
// Tailwind is handled through PostCSS

export default defineConfig({
  plugins: [react()],
});
