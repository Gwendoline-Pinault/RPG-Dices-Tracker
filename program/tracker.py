"""Programme permettant de calculer les statistiques des parties de jeux de rôle sous le système de jeu Aria et de générer un récapitulatif dans un fichier texte. """

import statistics as stat
import json
from dices import *

# Lecture du fichier JSON et import des données
with open("data.json", 'r+', encoding='utf-8') as dataFile:
  data = json.load(dataFile)

# Liste des noms de personnages des campagnes
AriaPersonnages = ["Melinda", "Efard", "Artyom"]
PoudlardPersonnages = ["Kelly", "Michael", "Eva"]
PathfinderPersonnages = ["Callum", "Elora", "Karl", "Ulric"]

# Début du programme
date = input("Date de la partie : ")
campagne = input("Quel JDR ? ")

# Fonction qui génère les statistiques et écrit le résumé dans le récap dans le fichier txt
def Stats(personnage) :
  # initialisation des critiques
  crit = 0
  fail = 0

  # Détermination du personnage sélectionné
  match personnage :
    case "Melinda" :
      dicesArray = Gwen
    case "Efard" :
      dicesArray = Jean
    case "Artyom" :
      dicesArray = Artyom
    case "Kelly" :
      dicesArray = Gwen
    case "Michael" :
      dicesArray = Jean
    case "Eva" :
      dicesArray = Manon
    case "Callum":
      dicesArray = Gwen
    case "Elora":
      dicesArray = Elora
    case "Karl":
      dicesArray = Jean
    case "Ulric":
      dicesArray = Ulric

  # Calcul du nombre de critiques en fonction de la valeur des dés du personnage stockés dans le fichier dices.py
  for dice in dicesArray :
    if campagne == "Aria" or campagne == "Poudlard":
      if 1 <=dice <= 5 :
        crit += 1
      elif 96 <= dice <= 100 :
        fail += 1
    elif campagne == "Pathfinder":
      if dice == 1:
        fail += 1
      elif dice == 20:
        crit += 1

  # Classe les dés dans l'ordre croissant
  game = sorted(dicesArray)

  # Calcule la médiane des dés
  median = round(stat.median(game))

  # Calcule la moyenne des dés arrondi à l'entier
  moyenne = round(stat.mean(game))

  # Ajoute les données créées au JSON existant
  data_save_json = {"dices": game, "average": moyenne, "median": median, "success": crit, "fail": fail}

  # Met à jour la moyenne générale des joueurs
  for die in game:
    data[campagne]["globalAvg"][personnage].append(die)

  # Met à jour la médiane globale
  medianArray = data[campagne]["globalAvg"][personnage]
  sortedMedianArray = sorted(medianArray)
  globalMedian = round(stat.median(sortedMedianArray))
  data[campagne]["globalMedian"][personnage] = globalMedian
  
  data[campagne]["games"][date][personnage] = data_save_json


# Je détermine la campagne concernée pour aller chercher le nom des personnages pour la génération du récap
if (campagne == "Aria"):
  roleplayGame = AriaPersonnages
elif (campagne == "Poudlard"):
  roleplayGame = PoudlardPersonnages
elif (campagne == "Pathfinder"):
  roleplayGame = PathfinderPersonnages
else :
  print("Erreur dans la détermination de la campagne")
  campagne = input("Quel JDR ? ")

# Création de l'objet pour la partie du jour afin d'y insérer les données générées
data[campagne]["games"][date] = {}

# On génère les stats pour chaque personnage de la campagne concernée
for personnage in roleplayGame :
  Stats(personnage)

# Remplacement des anciennes données par les nouvelles
with open("data.json", mode='w', encoding='utf-8') as newDataFile:
  json.dump(data, newDataFile)

# Message confirmant que le programme est terminé.
print("Récapitulatif terminé.")