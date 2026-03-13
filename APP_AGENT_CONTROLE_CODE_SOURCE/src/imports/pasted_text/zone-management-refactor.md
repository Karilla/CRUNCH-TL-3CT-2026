L’objectif est de rendre la gestion des zones plus logique géographiquement, plus simple à lire pour les agents et plus cohérente avec l’organisation réelle du réseau TL.

Aujourd’hui la section État des zones est trop plate et ne reflète pas la structure du terrain.
Nous voulons donc introduire une navigation en plusieurs niveaux.

1. Remplacer les zones actuelles

Actuellement la section affiche des zones comme :

Gare

Centre

Ouchy

Ces zones doivent être supprimées.

Le bouton “Voir tout” doit également être supprimé.

2. Créer 3 grandes zones principales

La section État des zones doit commencer par 3 grands carrés avec photos, représentant les grandes zones géographiques du réseau.

Les trois zones principales sont :

1️⃣ Renens / Crissier
2️⃣ Flon / Hypercentre
3️⃣ Pully / Lutry

Ces trois zones deviennent le premier niveau de navigation.

Chaque zone est représentée par :

une photo

un titre

un indicateur de statut global (couleur).

3. Statut des zones

Le statut des zones doit être simplifié en 3 états uniquement :

🟢 Zone contrôlée
→ la zone a été entièrement contrôlée.

🟠 Zone partiellement contrôlée
→ certains endroits de la zone sont contrôlés, mais il manque encore quelques contrôles.

🔴 Zone non contrôlée
→ aucun contrôle n’a encore été effectué dans cette zone.

L’orange signifie donc :

→ il reste encore quelques endroits à contrôler.

4. Navigation vers les sous-zones

Lorsque l’utilisateur clique sur une grande zone, il doit accéder à des sous-zones plus précises, correspondant à la géographie réelle de Lausanne.

Exemple :

Flon / Hypercentre

Flon

Montbenon

Saint-François

Chauderon

Renens / Crissier

Renens Gare

Malley

Prilly

Pully / Lutry

Pully Centre

Lutry Gare

La Conversion

Chaque sous-zone garde également un code couleur de statut.

5. Navigation vers les lignes

Lorsque l’utilisateur clique sur une sous-zone, il doit voir apparaître les lignes de transport présentes dans cette zone.

Exemples :

Bus 22

Bus 8

Métro M1

Métro M2

Train régional

Chaque ligne doit également afficher un statut avec code couleur.

6. Navigation vers les arrêts

Lorsque l’utilisateur clique sur une ligne, il doit voir apparaître les arrêts de la ligne.

Les arrêts doivent être affichés sous forme de ligne de transport avec stations, similaire à un plan de métro.

Chaque arrêt doit avoir un statut :

🟢 arrêt contrôlé
🟠 arrêt partiellement contrôlé
🔴 arrêt non contrôlé

Cela permet d’identifier les arrêts qui nécessitent encore un contrôle.

7. Architecture finale

La navigation doit fonctionner ainsi :

Grandes zones (photos)
↓
Sous-zones
↓
Lignes de transport
↓
Arrêts

Objectif produit

Cette nouvelle structure permettra :

une meilleure compréhension géographique du réseau

une navigation plus logique pour les agents

une identification rapide des zones ou arrêts non contrôlés

une vision claire de la couverture réelle du réseau.