export function getAvg(globalAvgArray) {
  let sum = 0;
    
  globalAvgArray.forEach(element => {
    sum += element
  });

  const globalAvg = Math.round(sum / globalAvgArray.length);
  return globalAvg;
}

export function createPJGlobalStat(personnage, section, game, globalAvg) {
  const pjArticle = document.createElement('article');
  pjArticle.id = personnage;
  pjArticle.className = `${game}-color`;
  section.append(pjArticle);

  const pjTitle = document.createElement('h3');
  pjTitle.textContent = personnage;

  const pjStat = document.createElement('p');
  pjStat.className = "round";
  pjStat.textContent = globalAvg;

  // dés 100 sur le système Aria
  if (game === "aria" || game === "hogwards") {
    if (globalAvg > 50) {
      pjStat.classList.add("fail");
    }
    else if (globalAvg < 50) {
      pjStat.classList.add("success");
    }
  }
  // Dés 20 sur le système Pathfinder
  else if (game === "pathfinder") {
    if (globalAvg < 10) {
      pjStat.classList.add("fail");
    }
    else if (globalAvg > 10) {
      pjStat.classList.add("success");
    }
  }

  // Récupération de l'id de l'article créé pour ajouter le titre et les stats
  const thisArticle = document.getElementById(`${personnage}`);
  thisArticle.append(pjTitle);
  thisArticle.append(pjStat);
}
/**
 * La fonction createGameStatInfos() sert à générer la liste des parties en récupérant les données du fichier JSON.
 * Chaque partie affcihée comprend pour chaque joueur les statistiques suivantes : la moyenne de la partie, le nombre de réussites critiques, le nombre d'échecs critiques.
 * Le programme tient compte du système de dés (100 sur Aria, 20 sur Pathfinder).
 * 
 * @param {string} section - id de la section contenant la liste des parties
 * @param {string} date - Date de la partie
 * @param {string} game - Nom du JDR pour le style (en minuscules)
 * @param {array} personnages - Tableau de la liste des personnages de la partie
 * @param {string} jdrGame - Nom du JDR du fichier JSON
 */
export function createGameStatInfos(section, date, game, personnages, jdrGame) {
  const gameArticle = document.createElement('article');
  gameArticle.className = game + "-article";
  gameArticle.id = date;
  section.append(gameArticle);

  const gameTitle = document.createElement('h3');
  gameTitle.className = game + "-color-title";
  gameTitle.textContent = "Partie du " + date;

  const thisGameArticle = document.getElementById(`${date}`);
  thisGameArticle.append(gameTitle);

  for (let personnage of personnages) {
    const div = document.createElement('div');
    thisGameArticle.append(div);

    const nameTitle = document.createElement('h4');
    nameTitle.textContent = personnage;

    const pjAvg = document.createElement('p');
    const span = document.createElement('span');

    // dés 100 sur le système Aria
    if (game === "aria" || game === "hogwards") {
      if (jdrGame[date][personnage]["moyenne"] > 50) {
        span.className = "fail";
      }
      else if (jdrGame[date][personnage]["moyenne"] < 50) {
        span.className = "success";
      }
    }
    // Dés 20 sur le système Pathfinder
    else if (game === "pathfinder") {
      if (jdrGame[date][personnage]["moyenne"] < 10) {
        span.className = "fail";
      }
      else if (jdrGame[date][personnage]["moyenne"] > 10) {
        span.className = "success";
      }
    }
    
    span.textContent = jdrGame[date][personnage]["moyenne"];

    pjAvg.textContent = "Moyenne : ";
    pjAvg.append(span);

    const pjCrit = document.createElement('p');
    pjCrit.textContent = "Echecs : " + jdrGame[date][personnage]["échecs"];

    const pjSuccess = document.createElement('p');
    pjSuccess.textContent = "Réussites : " + jdrGame[date][personnage]["réussites"];

    div.append(nameTitle);
    div.append(pjAvg);
    div.append(pjSuccess);
    div.append(pjCrit);
  }
}