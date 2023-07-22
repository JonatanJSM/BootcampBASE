import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});

// Proyectos vanilla de react se crean con vite

// archivo de barril, nos ayuda a los import 