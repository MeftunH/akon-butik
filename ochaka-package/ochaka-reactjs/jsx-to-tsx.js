// rename-jsx-to-tsx.mjs (or use .js with "type": "module" in package.json)

import fs from "fs";
import path from "path";

function renameJSXtoTSX(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameJSXtoTSX(fullPath);
    } else if (file.endsWith(".jsx")) {
      const newFullPath = fullPath.replace(/\.jsx$/, ".tsx");
      fs.renameSync(fullPath, newFullPath);
      console.log(`✅ Renamed: ${fullPath} → ${newFullPath}`);
    }
  }
}

// Start from current working directory
renameJSXtoTSX(process.cwd());
