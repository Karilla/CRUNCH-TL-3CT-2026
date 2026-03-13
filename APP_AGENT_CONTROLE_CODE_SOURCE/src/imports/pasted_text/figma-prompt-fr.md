Prompt Figma — Ajustements des indicateurs et alertes (version complète corrigée)

Merci d’apporter les modifications suivantes à l’interface existante.
L’objectif est d’améliorer la lisibilité opérationnelle et l’aide à la décision terrain, tout en conservant la structure actuelle de l’application.

Les modifications concernent uniquement certains blocs spécifiques.

1. Bloc Couverture réseau aujourd’hui

⚠️ Conserver exactement la structure actuelle du bloc.

Structure actuelle à garder :

Titre :

Couverture réseau aujourd’hui

Texte :

Encore 2 zones à couvrir

Puis :

Directions recommandées

Secteur Gare

Secteur Flon

Secteur Ouchy

Modification demandée

Ajouter une barre de progression visuelle.

Placement :

La barre doit être placée juste sous le texte :

Encore 2 zones à couvrir

et au-dessus de "Directions recommandées".

Exemple :

Couverture réseau aujourd’hui

Encore 2 zones à couvrir

██████████████░░░░░░░░

Directions recommandées

➡ Secteur Gare
➡ Secteur Flon
➡ Secteur Ouchy

Caractéristiques :

barre horizontale simple

pas de pourcentage affiché

style cohérent avec l’interface existante

Objectif :

donner une lecture rapide de la progression de la couverture réseau.

2. Bloc État des zones

Dans le bloc État des zones, lorsque plusieurs zones sont affichées :

permettre un défilement horizontal

les cartes doivent scroller vers la droite

fonctionnement type carrousel

Interaction lorsqu’on clique sur une zone

Lorsque l’utilisateur clique sur une zone, afficher le détail des lignes de transport présentes dans cette zone.

Exemples :

Bus 22

Bus 8

Métro M2

Métro M1

Train régional

Chaque ligne doit avoir un code couleur indiquant le respect ou non des contrôles.

Couleurs :

🟢 ligne conforme / contrôlée
🟠 ligne partiellement contrôlée
🔴 ligne non conforme / contrôle manquant

Objectif :

permettre aux agents de identifier rapidement quelles lignes du secteur nécessitent un contrôle.

3. Bloc Adhésion à la planification

Modifier l’indicateur pour qu’il soit plus lisible.

Structure :

Adhésion à la planification

Ajouter une barre de progression horizontale.

Afficher :

le pourcentage actuel par rapport à 100%.

Ajouter un marqueur discret à 20%.

Ce marqueur représente le seuil maximal de non-respect de la planification.

Comportement visuel

barre verte lorsque la situation est normale

barre devient orange lorsqu’on s’approche du seuil de 20%

barre devient rouge si ce seuil est dépassé

Important :

le marqueur 20% doit rester discret, simplement comme indicateur à ne pas dépasser.

4. Widget compteur de pas

Ajouter un petit widget simple.

Fonction :

afficher le nombre de pas effectués aujourd’hui

compteur remis à zéro chaque jour

pas d’historique nécessaire

Ajouter un toggle (curseur) permettant :

d’activer le comptage des pas

ou de le désactiver

Exemple :

🚶 Activité du jour

6 240 pas

[ toggle ] Activer le comptage

5. Bloc Alertes et urgences

Conserver la structure actuelle.

Titre :

Alertes et urgences

Sections :

Priorité élevée

Messages du gestionnaire

Autres alertes

Chaque carte doit rester visible dans la liste.

Les cartes doivent continuer à être scrollables verticalement.

6. Système de quittancement des alertes

Pour les alertes importantes, ajouter un système de quittancement basé sur le pop-up rouge existant.

Lorsqu’un utilisateur clique sur une alerte prioritaire :

➡ ouvrir une vue détaillée type pop-up.

Contenu :

titre de l’alerte

description

localisation

heure

niveau de priorité

Ajouter un bouton :

J’ai compris

Ce bouton permet d’accuser réception de l’alerte.

7. Design du pop-up d’alerte

Le pop-up doit conserver le design existant :

fond rouge en haut

icône alerte

hiérarchie claire

bouton rouge “J’ai compris”

Important :

fermer l’alerte ne doit pas la supprimer.

Elle doit simplement être :

marquée comme vue / quittancée.

8. Navigation et comportement des alertes

L’écran Alertes et urgences doit rester scrollable.

Structure :

Alertes et urgences

Priorité élevée
[cartes alertes]

Messages gestionnaire
[cartes messages]

Autres alertes
[cartes]

Les nouvelles alertes doivent apparaître en haut de la liste.

9. Indication visuelle des alertes quittancées

Après avoir cliqué sur “J’ai compris” :

la carte d’alerte doit rester visible mais :

devenir moins contrastée

ou afficher :

✓ Alerte prise en compte

10. Code couleur des alertes

Conserver le code couleur :

🔴 Priorité élevée
🟠 Alerte opérationnelle
🔵 Information