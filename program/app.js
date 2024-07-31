import { createPJGlobalStat, getAvg, createGameStatInfos } from './functions.js';

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

// Création du tableau de la liste des dates pour le calcul du nombre de parties
const jdrDates = [];
const jdrGames = data[jdrName]["games"];

for (let dates in jdrGames) {
  jdrDates.push(dates);
}

// Récupération des personnages et des sections du DOM pour la génération des parties et du récap
const recapSection = document.getElementById(`${jdr}-recap-section`);
const statsSection = document.getElementById(`${jdr}-stats-section`);

// Création d'un tableau contenant La liste des noms de personnages à partir de la liste présente dans "globalMedian" du JSON
const jdrCharacters = Object.keys(data[jdrName]["globalMedian"]); 

for (let personnage of jdrCharacters) {
  // récupération du tableau contenant les dés du personnage
  const globalAvgArray = data[jdrName]["globalAvg"][personnage];
  const globalMedian = data[jdrName]["globalMedian"][personnage];

  // calcul de la moyenne générale des dés
  const globalAvg = getAvg(globalAvgArray);

  // création du récap du personnage avec la moyenne générale
  createPJGlobalStat(personnage, recapSection, jdr, globalAvg, globalAvgArray, globalMedian);
}

// Décompte du nombre de parties
const NbGamesTitle = document.getElementById('nb-games');
const NbGamesTitleSpan = document.createElement('span');
NbGamesTitleSpan.textContent = jdrDates.length;
NbGamesTitle.append(NbGamesTitleSpan);

// Création de la liste des récap de chaque partie par personnage (du plus récent au plus ancien)
jdrDates.forEach(date => {
  createGameStatInfos(statsSection, date, jdr, jdrGames);
});