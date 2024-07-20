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
      dicesArray = dices
    case "Efard" :
      dicesArray = JeanDices
    case "Artyom" :
      dicesArray = ArtyomDices
    case "Kelly" :
      dicesArray = dices
    case "Michael" :
      dicesArray = JeanDices
    case "Eva" :
      dicesArray = ManonDices

  # Calcul du nombre de critiques en fonction de la valeur des dés du personnage stockés dans le fichier dices.py
  for dice in dicesArray :
    if 1 <=dice <= 5 :
      crit += 1
    elif 96 <= dice <= 100 :
      fail += 1

  # Classe les dés dans l'ordre croissant
  game = sorted(dicesArray)

  # Calcule la moyenne des dés arrondi à l'entier
  moyenne = round(stat.mean(game))

  # Ajoute les données créées au JSON existant
  data_save_json = {"dés": [game], "moyenne": moyenne, "réussites": crit, "échecs": fail}

  # Met à jour la moyenne générale des joueurs
  for die in game:
    data[campagne]["globalAvg"][personnage].append(die)
  
  data[campagne]["parties"][date][personnage] = data_save_json
  

# Je détermine la campagne concernée pour aller chercher le nom des personnages pour la génération du récap
if (campagne == "Aria"):
  roleplayGame = AriaPersonnages
elif (campagne == "Poudlard"):
  roleplayGame = PoudlardPersonnages
else :
  print("Erreur dans la détermination de la campagne")
  campagne = input("Quel JDR ? ")

# Création de l'objet pour la partie du jour afin d'y insérer les données générées
data[campagne]["parties"][date] = {}

# On génère les stats pour chaque personnage de la campagne concernée
for personnage in roleplayGame :
  Stats(personnage)

# Remplacement des anciennes données par les nouvelles
with open("data.json", mode='w', encoding='utf-8') as newDataFile:
  json.dump(data, newDataFile)

# Message confirmant que le programme est terminé.
print("Récapitulatif terminé.")