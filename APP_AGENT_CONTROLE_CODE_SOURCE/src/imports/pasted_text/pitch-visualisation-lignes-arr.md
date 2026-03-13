Pitch – Amélioration de la visualisation des lignes et arrêts

L’objectif de cette interface est de permettre aux agents de comprendre immédiatement où intervenir sur le réseau.
Aujourd’hui, le système fonctionne techniquement mais la lecture visuelle n’est pas assez intuitive.

Actuellement, l’utilisateur navigue à vue, sans indicateur clair lui montrant :

quelles lignes sont prioritaires

quelles zones nécessitent une intervention

où concentrer les contrôles.

Le système doit donc être repensé pour que les indicateurs guident l’action, et non simplement afficher de l’information.

1. Problème du visuel actuel

Dans l’écran des arrêts :

les couleurs sont visibles uniquement au niveau des arrêts

mais la ligne elle-même ne donne pas d’indication globale

Résultat :

l’agent doit analyser chaque arrêt un par un

il ne voit pas immédiatement si une ligne est prioritaire ou non.

Cela rend la navigation moins efficace sur le terrain.

2. Ajouter un indicateur global sur les lignes

Les lignes doivent elles aussi afficher un statut global, basé sur les arrêts.

Chaque ligne doit donc avoir un code couleur clair :

🟢 Ligne contrôlée
→ tous les arrêts sont contrôlés.

🟠 Ligne partiellement contrôlée
→ certains arrêts restent à contrôler.

🔴 Ligne prioritaire
→ plusieurs arrêts ne sont pas encore contrôlés.

Ainsi, avant même de voir les arrêts, l’agent peut savoir quelle ligne nécessite une intervention.

3. Améliorer la lisibilité des arrêts

Dans la vue actuelle, les arrêts sont listés verticalement.

Le visuel peut être amélioré pour être plus proche d’un plan de ligne de transport, comme dans les schémas métro.

L’idée serait de représenter :

une ligne horizontale

les arrêts positionnés dessus

avec leur statut couleur.

Exemple :

🟢 Renens — 🟢 UNIL Sorge — 🔴 UNIL Mouline — 🟢 EPFL — 🔴 Bassenges — 🟢 Flon

Cela permet de voir immédiatement :

où se situent les zones problématiques

si les arrêts non contrôlés sont concentrés dans un secteur.

4. Clarifier les indicateurs

Les indicateurs doivent guider l’agent vers l’action.

Aujourd’hui ils sont présents mais pas suffisamment hiérarchisés.

Il faudrait renforcer la logique suivante :

🔴 = priorité immédiate
🟠 = il reste quelques contrôles à faire
🟢 = zone contrôlée

Ces codes doivent être visibles à plusieurs niveaux :

zone

ligne

arrêt.

5. Améliorer la navigation

La navigation actuelle fonctionne bien mais peut être rendue plus claire.

Structure actuelle :

Grande zone
→ sous-zone
→ ligne
→ arrêts

Cette architecture est bonne mais il faut :

garder un bouton retour clair

supprimer les éléments de navigation trop lourds en haut

privilégier une navigation plus visuelle et plus simple.

6. Objectif final

L’objectif n’est pas seulement d’afficher des données.

L’interface doit permettre à l’agent de comprendre en quelques secondes :

quelles zones sont couvertes

quelles lignes sont prioritaires

quels arrêts nécessitent encore un contrôle.

En résumé :

L’utilisateur ne doit plus naviguer à vue,
mais être guidé visuellement vers les priorités du réseau.