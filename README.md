# HN 3D — aperçu interactif

Aperçu de l’application Heivoli Network 3D publié sur https://3ds.heivoli-network.fr/.
Il remplace l’ancien site léger destiné au navigateur de la console.
Le site principal https://heivoli-network.fr/ reste indépendant.

## Utilisation

Naviguer en cliquant sur l’écran inférieur : catalogue, recherche, filtres, fiches,
favoris et notes locales. Le téléchargement présenté est une simulation.
Le mode `/?embed=1` affiche uniquement la console pour une intégration par iframe.
L’aperçu utilise JavaScript moderne et vise les navigateurs actuels ;
la compatibilité avec le navigateur de la Nintendo 3DS n’est pas garantie.

## Publication

Chaque envoi sur `main` publie le site via `.github/workflows/pages.yml`.
L’ancienne actualisation planifiée des annonces a été retirée.
Conserver `CNAME` et le réglage GitHub Pages utilisant GitHub Actions.
Aucune modification DNS n’est nécessaire.

## Développement

Lancer `python3 -m http.server 8080` puis ouvrir http://localhost:8080/.
Fichiers statiques sans compilation ni dépendance npm.
Le catalogue et les visuels proviennent de l’aperçu du projet HN 3D.
