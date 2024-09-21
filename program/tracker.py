"""Programme permettant de calculer les statistiques des parties
de jeux de rôle sous le système de jeu Aria et de générer
un récapitulatif dans un fichier texte. """

import statistics as stat
import json
from dices import Melinda, Efard, Artyom
from dices import Kelly, Michael, Eva
from dices import Callum, Karl, Elora, Ulric

# # Lecture du fichier JSON et import des données
# with open("data.json", 'r+', encoding='utf-8') as dataFile:
#     data = json.load(dataFile)

# Liste des noms de personnages des campagnes
AriaPersonnages = ["Melinda", "Efard", "Artyom"]
PoudlardPersonnages = ["Kelly", "Michael", "Eva"]
PathfinderPersonnages = ["Callum", "Elora", "Karl", "Ulric"]

# Début du programme
date = input("Date de la partie : ")
campagne = input("Quel JDR ? ")

# Je détermine la campagne concernée
# Va chercher le nom des personnages pour la génération du récap
if (campagne == "Aria"):
    roleplayGame = AriaPersonnages
elif (campagne == "Poudlard"):
    roleplayGame = PoudlardPersonnages
elif (campagne == "Pathfinder"):
    roleplayGame = PathfinderPersonnages
else:
    print("Erreur dans la détermination de la campagne")
    campagne = input("Quel JDR ? ")

# Lecture du fichier JSON et import des données
match campagne:
    case "Aria":
        roleplayGame = AriaPersonnages
        with open("data/aria.json", 'r+', encoding='utf-8') as dataFile:
            data = json.load(dataFile)
    case "Pathfinder":
        roleplayGame = PathfinderPersonnages
        with open("data/pathfinder.json", 'r+', encoding='utf-8') as dataFile:
            data = json.load(dataFile)
    case "Poudlard":
        roleplayGame = PoudlardPersonnages
        with open("data.json", 'r+', encoding='utf-8') as dataFile:
            data = json.load(dataFile)

# Création de l'objet partie du jour pour insérer les données générées
data[campagne]["games"][date] = {}


# Fonction qui génère les statistiques
def Stats(personnage):
    # initialisation des critiques
    crit = 0
    fail = 0

    # Détermination du personnage sélectionné
    match personnage:
        case "Melinda":
            dicesArray = Melinda
        case "Efard":
            dicesArray = Efard
        case "Artyom":
            dicesArray = Artyom
        case "Kelly":
            dicesArray = Kelly
        case "Michael":
            dicesArray = Michael
        case "Eva":
            dicesArray = Eva
        case "Callum":
            dicesArray = Callum
        case "Elora":
            dicesArray = Elora
        case "Karl":
            dicesArray = Karl
        case "Ulric":
            dicesArray = Ulric

    # Calcul du nombre de critiques en fonction de la valeur des dés 
    # du personnage stockés dans le fichier dices.py
    for dice in dicesArray:
        if campagne == "Aria" or campagne == "Poudlard":
            if 1 <= dice <= 5:
                crit += 1
            elif 96 <= dice <= 100:
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
    data_save_json = {
        "dices": game,
        "average": moyenne,
        "median": median,
        "success": crit,
        "fail": fail
    }

    # Met à jour la moyenne générale des joueurs
    for die in game:
        data[campagne]["dicesList"][personnage].append(die)

    # Met à jour la médiane globale
    medianArray = data[campagne]["dicesList"][personnage]
    sortedMedianArray = sorted(medianArray)
    globalMedian = round(stat.median(sortedMedianArray))
    data[campagne]["globalMedian"][personnage] = globalMedian

    # Met à jour la moyenne globale
    globalAvg = round(stat.mean(sortedMedianArray))
    data[campagne]["globalAvg"][personnage] = globalAvg

    # Ajout des données créées au fichier
    data[campagne]["games"][date][personnage] = data_save_json


# On génère les stats pour chaque personnage de la campagne concernée
for personnage in roleplayGame:
    Stats(personnage)

# Remplacement des anciennes données par les nouvelles
match campagne:
    case "Aria":
        with open("data/aria.json", mode='w', encoding='utf-8') as nJson:
            json.dump(data, nJson)
    case "Pathfinder":
        with open("data/pathfinder.json", mode='w', encoding='utf-8') as nJson:
            json.dump(data, nJson)

# Message confirmant que le programme est terminé.
print("Récapitulatif terminé.")
