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

  if (globalAvg > 50) {
    pjStat.classList.add("fail");
  }
  else if (globalAvg < 50) {
    pjStat.classList.add("success");
  }

  // Récupération de l'id de l'article créé pour ajouter le titre et les stats
  const thisArticle = document.getElementById(`${personnage}`);
  thisArticle.append(pjTitle);
  thisArticle.append(pjStat);
}

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
    
    if (jdrGame[date][personnage]["moyenne"] > 50) {
      span.className = "fail";
    }
    else if (jdrGame[date][personnage]["moyenne"] < 50) {
      span.className = "success";
    }
    span.textContent = jdrGame[date][personnage]["moyenne"];

    pjAvg.textContent = "Moyenne : ";
    pjAvg.append(span);

    const pjCrit = document.createElement('p');
    pjCrit.textContent = "Echecs : " + jdrGame[date][personnage]["échecs"];
    //pjCrit.className = "fail";

    const pjSuccess = document.createElement('p');
    pjSuccess.textContent = "Réussites : " + jdrGame[date][personnage]["réussites"];
    //pjSuccess.className = "success";

    div.append(nameTitle);
    div.append(pjAvg);
    div.append(pjSuccess);
    div.append(pjCrit);
  }
}