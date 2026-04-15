const fs = require("fs").promises;
const path = require("path");

/**
 * Analysiert ein Verzeichnis (asynchron)
 * @param {string} dir - Startverzeichnis
 * @param {string[]} extensions - z.B. ['.js', '.json']
 * @param {boolean} recursive - rekursiv durchsuchen
 */
async function analyzeDirectory(dir, extensions = [], recursive) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        console.log(`📁 Verzeichnis: ${fullPath}`);

        if (recursive) {
          await analyzeDirectory(fullPath, extensions, recursive);
        }

      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);

        if (extensions.length === 0 || extensions.includes(ext)) {
          console.log(`📄 Datei: ${fullPath}`);
        }
      }
    }

  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`❌ Verzeichnis existiert nicht: ${dir}`);
    } else if (err.code === "EACCES") {
      console.error(`❌ Keine Berechtigung: ${dir}`);
    } else {
      console.error(`❌ Fehler bei ${dir}: ${err.message}`);
    }
  }
}

analyzeDirectory("./meinOrdner", [".js", ".json"], true);