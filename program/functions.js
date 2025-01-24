/**
 * createPJGlobalStat() : fonction qui crée le récapitulatif en haut de la page d'un JDR. Liste les personnages avec leur moyenne globale, médiane globale, nombre de dés lancés, nombre de critiques (réussites et échecs) réalisés dans la campagne.
 * @param {string} personnage nom du personnage sélectionné
 * @param {string} section id de la section recap
 * @param {string} game nom du JDR (pour le style et le DOM)
 * @param {int} globalAvg moyenne globale du personnage, générée préalablement par la fonction getAvg()
 * @param {array} globalAvgArray tableau contenant la liste des dés du personnages pour calculer le nombre de critiques
 * @param {int} globalMedian médiane globale du personnage calculée préalablement
 */
export function createPJGlobalStat(personnage, section, game, globalAvg, globalAvgArray, globalMedian) {
  let globalSuccess = 0;
  let globalFail = 0;

  globalAvgArray.forEach(element => {
    if (game === "aria" || game === "poudlard") {
      if (element <= 5) {
        globalSuccess ++;
      }
      else if (element >= 96) {
        globalFail ++;
      }
    }
    else if (game === "pathfinder") {
      if (element === 1) {
        globalFail ++;
      }
      else if (element === 20) {
        globalSuccess ++;
      }
    }
    
  })

  const pjArticle = document.createElement('article');
  pjArticle.id = personnage;
  pjArticle.className = game + "-color";
  section.append(pjArticle);

  const pjTitle = document.createElement('h3');
  pjTitle.textContent = personnage;

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
  if (game === "aria" || game === "poudlard") {
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
    if (game === "aria" || game === "poudlard") {
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

/**
 * Function createJDRPageContent() : permet de générer le contenu des pages de JDR en appelant les différentes fonctions qui créent l'en-tête et la liste des parties. Cette fonction est générique et s'appliquent à tous les JDR. On récupère en entrée le nom de la page visionnnée par l'utilisateur pour générer les données associées.
 * @param {object} data contenu du fichier JSON récupéré dans un objet
 * @param {string} jdr Nom du JDR concerné pour la partie style (minuscules)
 * @param {string} jdrName Nom du JDR affiché sur le site et dans le JSON 
 */
export function createJDRPageContent(data, jdr, jdrName) {
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
    const globalAvgArray = data[jdrName]["dicesList"][personnage];
    const globalMedian = data[jdrName]["globalMedian"][personnage];

    // calcul de la moyenne générale des dés
    const globalAvg = data[jdrName]["globalAvg"][personnage];

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
}