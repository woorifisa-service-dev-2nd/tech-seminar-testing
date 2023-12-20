import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // @로 작성할 경우 /src로 대체되도록
      { find: "@", replacement: "/src" },
    ],
  },
  test: {
    // gobal import 같음
    globals: true,
    // dom 요소에 접근하기위해 jsdom 방식으로 테스트
    environment: "jsdom",
    setupFiles: "./src/utils/test/setup.js",
    coverage: {
      provider: "v8",
      include: ["src/constants", "src/components", "src/contexts"],
      // include: ["src/**"],
      exclude: ["src/App.jsx", "src/main.jsx"],
    },
    reporters: ["verbose"],
    include: ["./src/**/*{test,spec}.{jsx,js}"],
  },
});
