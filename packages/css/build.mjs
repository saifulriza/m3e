/**
 * Build script for @m3e/css
 * Concatenates CSS source files into distributable bundles.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "src");
const distDir = join(__dirname, "dist");
const componentsDistDir = join(distDir, "components");

mkdirSync(distDir, { recursive: true });
mkdirSync(componentsDistDir, { recursive: true });

const banner = `/*!\n * @m3e/css v1.1.11\n * Material 3 Expressive CSS Framework\n * MIT License\n */\n`;

// Build tokens.css
const tokensSrc = readFileSync(join(srcDir, "tokens.css"), "utf-8");
writeFileSync(join(distDir, "tokens.css"), banner + tokensSrc);

// Build individual component CSS files
const componentsDir = join(srcDir, "components");
const componentFiles = readdirSync(componentsDir).filter((f) => f.endsWith(".css"));
const componentCSS = [];

for (const file of componentFiles) {
  const content = readFileSync(join(componentsDir, file), "utf-8");
  writeFileSync(join(componentsDistDir, file), banner + content);
  componentCSS.push(content);
}

// Build combined m3e.css
const combined = banner + tokensSrc + "\n" + componentCSS.join("\n");
writeFileSync(join(distDir, "m3e.css"), combined);

console.log(`Built ${componentFiles.length} component CSS files + tokens.css + m3e.css`);
