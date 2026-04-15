import { main } from './main.js';
import { analyzeDirectory } from './Analyse.js';
import { writy } from './write_filo.js';




await main("./example.txt");
analyzeDirectory("./meinOrdner", [".js", ".json"], true);
writy();