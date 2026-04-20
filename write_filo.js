import { writeFile, rename } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";

export async function writeFileSafe(filePath, data) {
  const dir = path.dirname(filePath);
  const tempFile = path.join(dir, `.tmp-${randomUUID()}`);

  try {
    await writeFile(tempFile, data, "utf-8");

    await new Promise(r => setTimeout(r, 5000));

    await rename(tempFile, filePath);

    console.log("Datei sicher geschrieben");
  } catch (err) {
    console.error("Fehler beim Schreiben:", err.message);
    throw err;
  }
}

export async function writy() {
 await writeFileSafe("./example.txt", "hallo");
 console.log("Datei geschrieben");
}
//writy();