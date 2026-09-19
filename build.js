import { execSync } from "child_process";
import fs from "fs";

try {
  // 1. Ensure index.html has the source dev template pointing to /src/main.tsx
  if (fs.existsSync("index.dev.html")) {
    fs.copyFileSync("index.dev.html", "index.html");
  }

  // Clean dist before building
  if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true, force: true });
  }

  // 2. Run vite build
  console.log("Running Vite production build...");
  execSync("npx vite build", { stdio: "inherit" });

  // 3. Deploy compiled dist/index.html to root index.html so GitHub Pages serving from main root works
  if (fs.existsSync("dist/index.html")) {
    fs.copyFileSync("dist/index.html", "index.html");
    console.log("✓ Synchronized dist/index.html -> root index.html");
  }

  // 4. Clean and sync dist to docs
  if (fs.existsSync("docs")) {
    fs.rmSync("docs", { recursive: true, force: true });
  }
  fs.cpSync("dist", "docs", { recursive: true, force: true });
  console.log("✓ Clean synchronized dist/ -> docs/");

  // 5. Clean and sync dist/assets to assets
  if (fs.existsSync("assets")) {
    fs.rmSync("assets", { recursive: true, force: true });
  }
  fs.cpSync("dist/assets", "assets", { recursive: true, force: true });
  console.log("✓ Clean synchronized dist/assets -> assets/");

  // 6. Create .nojekyll markers
  fs.writeFileSync("dist/.nojekyll", "");
  fs.writeFileSync("docs/.nojekyll", "");
  fs.writeFileSync(".nojekyll", "");
  console.log("✓ Created .nojekyll markers");

  console.log("\n✨ Universal Build Succeeded!");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
}
