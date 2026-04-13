// datei-stats.js
import { readFile, stat } from "fs/promises";

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Bitte einen Dateipfad angeben.");
    process.exit(1);
  }

  try {
    const fileStats = await stat(filePath);

    const content = await readFile(filePath,"utf-8"); //maybe utf-8

    const lines = content.split("\n").length;
    const words = content.trim().split(/\s+/).filter(Boolean).length; 
    const characters = content.length;
    const size = fileStats.size;
    const lastModified = fileStats.mtime;

    // Ausgabe
    console.log(`Datei: ${filePath}`);
    console.log(`Zeilen: ${lines}`);
    console.log(`Wörter: ${words}`);
    console.log(`Zeichen: ${characters}`);
    console.log(`Größe (Bytes): ${size}`);
    console.log(`Letzte Änderung: ${lastModified}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Datei nicht gefunden.");
    } else {
      console.error("Fehler beim Verarbeiten:");
      console.error(err.message);
    }
    process.exit(1);
  }
}

main();

// to test: node main.js example.txt