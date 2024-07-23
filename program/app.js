import {createPJGlobalStat, getAvg, createGameStatInfos} from './functions.js';

const data = await fetch('/program/data.json')
  .then(response => response.json())
  .catch((e) => {});

// CONSTANTES
const AriaPersonnages = ["Melinda", "Efard", "Artyom"];
const HogwardsPersonnages = ["Kelly", "Michael", "Eva"];
const PathfinderPersonnages = ["Callum", "Elora", "Karl", "Ulric"];
const AriaDates = [];
const HogwardsDates = [];
const PathfinderDates = [];

// liste des dates des parties
for (let dates in data["Aria"]["games"]) {
  AriaDates.push(dates);
}

for (let dates in data["Poudlard"]["games"]) {
  HogwardsDates.push(dates);
}

for (let dates in data["Pathfinder"]["games"]) {
  PathfinderDates.push(dates);
}

/* ------------------------------------------------------
                      PAGE ARIA
---------------------------------------------------------
*/

// Récupération des éléments container pour la page Aria
const ariaPage = document.getElementById('aria-page');

if (ariaPage != null) {
  const ariaRecapSection = document.getElementById('aria-recap-section');
  const ariaStatSection = document.getElementById('aria-stats-section');

  for (let personnage of AriaPersonnages) {
    // récupération du tableau contenant les dés du personnage
    const globalAvgArray = data["Aria"]["globalAvg"][`${personnage}`];

    // calcule de la moyenne générale des dés
    const globalAvg = getAvg(globalAvgArray);
    
    // création du récap du personnage avec la moyenne générale
    const game = "aria";
    createPJGlobalStat(personnage, ariaRecapSection, game, globalAvg);
  }

  // Création de la liste des récap de chaque partie par personnage
  AriaDates.forEach(date => {
    const game = "aria";
    const AriaGames = data["Aria"]["games"];
    createGameStatInfos(ariaStatSection, date, game, AriaGames);
  });
}

/* ------------------------------------------------------
                      PAGE POUDLARD
---------------------------------------------------------
*/

// Création de la liste recap personnages sur la page Poudlard
const HogwardsPage = document.getElementById('hogwards-page');

if (HogwardsPage != null) {
  const hogwardsRecapSection = document.getElementById('hogwards-recap-section');
  const hogwardsStatSection = document.getElementById('hogwards-stats-section');

  for (let personnage of HogwardsPersonnages) {
    // récupération du tableau contenant les dés du personnage
    const globalAvgArray = data["Poudlard"]["globalAvg"][`${personnage}`];

    // calcule de la moyenne générale des dés
    const globalAvg = getAvg(globalAvgArray);
    
    // création du récap du personnage avec la moyenne générale
    const game = "hogwards";
    createPJGlobalStat(personnage, hogwardsRecapSection, game, globalAvg);
  }

  // Création de la liste des récap de chaque partie par personnage
  HogwardsDates.forEach(date => {
    const game = "hogwards";
    const HogwardsGames = data["Poudlard"]["games"];
    createGameStatInfos(hogwardsStatSection, date, game, HogwardsGames);
  });
}

/* ------------------------------------------------------
                      PAGE PATHFINDER
---------------------------------------------------------
*/

// Création de la liste recap personnages sur la page Pathfinder
const PathfinderPage = document.getElementById('pathfinder-page');

if (PathfinderPage != null) {
  const pathfinderRecapSection = document.getElementById('pathfinder-recap-section');
  const pathfinderStatSection = document.getElementById('pathfinder-stats-section');

  for (let personnage of PathfinderPersonnages) {
    // récupération du tableau contenant les dés du personnage
    const globalAvgArray = data["Pathfinder"]["globalAvg"][`${personnage}`];

    // calcule de la moyenne générale des dés
    const globalAvg = getAvg(globalAvgArray);
    
    // création du récap du personnage avec la moyenne générale
    const game = "pathfinder";
    createPJGlobalStat(personnage, pathfinderRecapSection, game, globalAvg);
  }

  // Création de la liste des récap de chaque partie par personnage
  if (PathfinderDates.length === 0 ) {
    const pathSection = document.getElementById('pathfinder-stats-section');
    const title = document.createElement('h3');

    title.textContent = "Pas encore de parties à ce jour.";
    title.className = "info-title";
    pathSection.append(title);

  } else {
    PathfinderDates.forEach(date => {
      const game = "pathfinder";
      const PathfinderGames = data["Pathfinder"]["games"];
      createGameStatInfos(pathfinderStatSection, date, game, PathfinderGames);
    });
  }
}