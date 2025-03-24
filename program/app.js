import { createPJGlobalStat, createGameStatInfos, createJDRPageContent } from './functions.js';

// Détermination de la page du JDR pour attribuer les valeurs aux variables
const ariaPage = document.getElementById('aria-page');
const poudlardPage = document.getElementById('poudlard-page');
const pathfinderPage = document.getElementById('pathfinder-page');
let jdrName = "";
let jdr = "";

// "null" quand la page ne correspond pas à celle courante 
if (ariaPage != null) {
    jdr = "aria";
    jdrName = "Aria";
}
else if (poudlardPage != null) {
    jdr = "poudlard";
    jdrName = "Poudlard";
}
else if (pathfinderPage != null) {
    jdr = "pathfinder";
    jdrName = "Pathfinder";
}

// Récupération des données stockées dans le JSON

const data = await fetch(`/program/data/${jdr}.json`)
  .then(response => response.json())
  .catch((e) => { });

createJDRPageContent(data, jdr, jdrName);