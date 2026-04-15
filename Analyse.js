import { promises as fs } from "fs";
import path from "path";

export async function analyzeDirectory(dir, extensions = [], recursive = false) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        console.log(`Verzeichnis: ${fullPath}`);

        if (recursive) {
          await analyzeDirectory(fullPath, extensions, recursive);
        }

      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);

        if (extensions.length === 0 || extensions.includes(ext)) {
          console.log(`Datei: ${fullPath}`);
        }
      }
    }

  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Verzeichnis existiert nicht: ${dir}`);
    } else if (err.code === "EACCES") {
      console.error(`Keine Berechtigung: ${dir}`);
    } else {
      console.error(`Fehler bei ${dir}: ${err.message}`);
    }
  }
}

// Beispiel-Aufruf:
//analyzeDirectory("./meinOrdner", [".js", ".json"], true);