export function getAvg(globalAvgArray) {
  let sum = 0;

    
  globalAvgArray.forEach(element => {
    sum += element
  });

  const globalAvg = Math.round(sum / globalAvgArray.length);
  return globalAvg;
}

export function createPJGlobalStat(personnage, section, game, globalAvg, globalAvgArray, globalMedian) {
  let globalSuccess = 0;
  let globalFail = 0;

  globalAvgArray.forEach(element => {
    if(element <= 5) {
      globalSuccess ++;
    }
    else if (96 <= element) {
      globalFail ++;
    }
  })

  const pjArticle = document.createElement('article');
  pjArticle.id = personnage;
  pjArticle.className = game + "-color";
  section.append(pjArticle);

  const pjTitle = document.createElement('h3');
  pjTitle.textContent = personnage;

/*   const pjGlobalStatDiv = document.createElement('div');
  pjGlobalStatDiv.className = "pj-recap-dice"; */

  const pjStat = document.createElement('p');
  pjStat.className = "round";

  const pjNbDices = document.createElement('p');
  pjNbDices.className = "dice-info";
  pjNbDices.textContent = globalAvgArray.length + " dés";

  const pjCritDiv = document.createElement('div');
  pjCritDiv.className = "pj-recap-crit";

  const pjSuccess = document.createElement('p');
  pjSuccess.textContent = "Réussites critiques : " + globalSuccess;
  pjSuccess.className = "dice-info";

  const pjFail = document.createElement('p');
  pjFail.textContent = "Echecs critiques : " + globalFail;
  pjFail.className = "dice-info";

  const pjMedian = document.createElement('p');
  pjMedian.textContent = "Médiane : " + globalMedian;
  pjMedian.className = "dice-info";

  const pjLink = document.createElement('a');
  pjLink.className = game + "-button link-button";
  pjLink.href = "/pages/stats-personnage.html";
  pjLink.textContent = "Plus d'infos";

  if (isNaN(globalAvg)) {
    pjStat.textContent = "-";
  }
  else {
    pjStat.textContent = globalAvg;
  }

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
  thisArticle.append(pjNbDices);
  /*thisArticle.append(pjGlobalStatDiv);
   pjGlobalStatDiv.append(pjStat);
  pjGlobalStatDiv.append(pjNbDices); */
  
  thisArticle.append(pjCritDiv);
  pjCritDiv.append(pjSuccess);
  pjCritDiv.append(pjFail);
  thisArticle.append(pjMedian);

  // Le button n'est pas encore implémenté
  /* thisArticle.append(pjLink); */
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
 * @param {object} jdrGame - Données de la partie sélectionnée
 */
export function createGameStatInfos(section, date, game, jdrGame) {
  const gameArticle = document.createElement('article');
  gameArticle.className = game + "-article";
  gameArticle.id = date;
  section.prepend(gameArticle);

  const gameTitle = document.createElement('h3');
  gameTitle.className = game + "-color-title";
  gameTitle.textContent = "Partie du " + date;

  const thisGameArticle = document.getElementById(`${date}`);
  thisGameArticle.append(gameTitle);

  for (let personnage in jdrGame[date]) {
    const div = document.createElement('div');
    thisGameArticle.append(div);

    const nameTitle = document.createElement('h4');
    nameTitle.textContent = personnage;

    const nbDices = document.createElement('p');
    nbDices.textContent = "Dés lancés : " + jdrGame[date][personnage]["dices"].length;

    const pjAvg = document.createElement('p');
    const span = document.createElement('span');

    const median = document.createElement('p');
    const medianSpan = document.createElement('span');
    medianSpan.textContent = jdrGame[date][personnage]["median"];

    // dés 100 sur le système Aria
    if (game === "aria" || game === "hogwards") {
      if (jdrGame[date][personnage]["average"] > 50) {
        span.className = "fail";
      }
      else if (jdrGame[date][personnage]["average"] < 50) {
        if (jdrGame[date][personnage]["average"] !== 0) {
          span.className = "success";
        }
      }

      if (jdrGame[date][personnage]["median"] > 50) {
        medianSpan.className = "fail";
      }
      else if (jdrGame[date][personnage]["median"] < 50) {
        medianSpan.className = "success";
      }
    }

    // Dés 20 sur le système Pathfinder
    else if (game === "pathfinder") {
      if (jdrGame[date][personnage]["average"] < 10) {
        span.className = "fail";
      }
      else if (jdrGame[date][personnage]["average"] > 10) {
        span.className = "success";
      }
      if (jdrGame[date][personnage]["median"] < 10) {
        medianSpan.className = "fail";
      }
      else if (jdrGame[date][personnage]["median"] > 10) {
        medianSpan.className = "success";
      }
    }
    
    if (jdrGame[date][personnage]["average"] == 0) {
      span.textContent = "-";
    } else {
      span.textContent = jdrGame[date][personnage]["average"];
    }
  
    pjAvg.textContent = "Moyenne : ";
    pjAvg.append(span);

    median.textContent = "Médiane : ";
    median.append(medianSpan);

    const pjCrit = document.createElement('p');
    pjCrit.textContent = "Echecs : " + jdrGame[date][personnage]["fail"];

    const pjSuccess = document.createElement('p');
    pjSuccess.textContent = "Réussites : " + jdrGame[date][personnage]["success"];

    div.append(nameTitle);
    div.append(nbDices);
    div.append(pjAvg);
    div.append(median);
    div.append(pjSuccess);
    div.append(pjCrit);
    
  }
}