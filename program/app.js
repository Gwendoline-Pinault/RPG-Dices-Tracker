import { createPJGlobalStat, getAvg, createGameStatInfos, createJDRPageContent } from './functions.js';

// Récupération des données stockées dans le JSON
const data = await fetch('/program/data.json')
  .then(response => response.json())
  .catch((e) => { });

// Détermination de la page du JDR pour attribuer les valeurs aux variables
const ariaPage = document.getElementById('aria-page');
const hogwardsPage = document.getElementById('hogwards-page');
const pathfinderPage = document.getElementById('pathfinder-page');
let jdrName = "";
let jdr = "";

// "null" quand la page ne correspond pas à celle courante 
if (ariaPage != null) {
  jdr = "aria";
  jdrName = "Aria";
}
else if (hogwardsPage != null) {
  jdr = "hogwards";
  jdrName = "Poudlard";
}
else if (pathfinderPage != null) {
  jdr = "pathfinder";
  jdrName = "Pathfinder";
}

createJDRPageContent(data, jdr, jdrName);