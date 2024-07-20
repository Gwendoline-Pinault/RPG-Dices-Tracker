# RPG Dices Tracker 

Programme de suivi des dés lancés dans des parties de jeux de rôle sous le système Aria

## Descriptif
Les dés lancés dans la partie sont notés manuellement dans le fichier dices.py.

A la fin de la partie, je lance manuellement le programme qui va prendre les dés saisis et effectuer les calculs pour générer les statistiques de la partie. Elles sont ensuite automatiquement sauvegardées dans un fichier JSON. 

Le site visuel prend les données de ce JSON pour afficher les statistiques de toutes les parties et calculer la moyenne globale des joueurs sur un jeu en particulier.

## Outils utilisés

Le programme est développé en Python (3.12). Il lit et modifie un fichier JSON qui stocke les données.
La partie visuelle est développée avec HTML, CSS et JavaScript (utilisation du DOM pour générer le contenu importé du JSON).

## Informations

Développement : Gwendoline PINAULT

Images : 
- Pour la page Poudlard : jackette du jeu Hogwards Legacy
- Pour la page Aria : Image du livre de jeu de rôle d'Aria