<p align="center">
  <img src="assets/hn3d-banner.gif" width="640" alt="Heivoli Network 3DS — bannière animée">
</p>

# Heivoli Network 3D

Application CIA non officielle pour Nintendo 3DS et 2DS. **Bêta publique 0.3.1**, destinée aux testeurs.

[**Télécharger le CIA**](https://github.com/Heivoli-dev/HN3DS/releases/download/v0.3.1-beta/Heivoli-Network-3D-v0.3.1-beta.cia) · [Toutes les pièces jointes et notes de version](https://github.com/Heivoli-dev/HN3DS/releases/tag/v0.3.1-beta) · [Signaler un bug](https://github.com/Heivoli-dev/HN3DS/issues/new?template=hn3d-bug.yml)

## Installer avec le QR public

Scannez ce QR dans FBI sur une console équipée d’un firmware personnalisé. Il pointe vers le CIA public et ne nécessite pas le Mac du développeur. Cliquez sur l’image pour l’agrandir.

<p align="center">
  <a href="https://github.com/Heivoli-dev/HN3DS/blob/main/assets/hn3d-install-qr.png">
    <img src="assets/hn3d-install-qr.png" width="240" alt="QR FBI pour installer Heivoli Network 3D 0.3.1">
  </a>
</p>

[Notice d’installation et limites de la bêta](native/BETA.md) · [Données et confidentialité](native/PRIVACY.md)

## Dans l’application

- 1 212 fiches / 1 853 éditions référencées ; les fiches sans source sont masquées.
- Région sélectionnable et priorité aux éditions déclarant la langue choisie.
- Recherche, genres, franchises, favoris, notes communautaires et sélection quotidienne.
- File de transfert, reprise, vérification d’empreinte et préparation des seeds.

Les identifiants et en-têtes des fichiers ont été examinés ; la majorité des jeux n’a pas été lancée sur console. Les essais matériels restent nécessaires. Aucun fichier de jeu n’est inclus dans les pièces jointes de la release.

Les **sources complètes de l’application native** et les licences se trouvent dans [l’archive source de la bêta](https://github.com/Heivoli-dev/HN3DS/releases/download/v0.3.1-beta/Heivoli-Network-3D-v0.3.1-sources.zip). Le code à la racine de ce dépôt correspond au site d’aperçu.

---

## Aperçu interactif et GitHub Pages

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

