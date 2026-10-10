# Heivoli Network — version 3DS

Version statique légère du site, sans JavaScript. Adresse prévue : http://3ds.heivoli-network.fr.

## Publication

Publier ce dépôt public sur GitHub sous le nom HN3DS. Dans Settings → Pages,
sélectionner Deploy from a branch, main, / (root). Le domaine personnalisé
est 3ds.heivoli-network.fr. Ne pas modifier le domaine du dépôt HNfr.

Dans IONOS, remplacer les enregistrements A/AAAA du sous-domaine 3ds par un
CNAME : nom 3ds, destination Heivoli-dev.github.io. Configurer d'abord Pages
sur GitHub avant de modifier le DNS.

Les annonces sont un instantané. Pour les actualiser, lancer dans le dépôt HNfr
`node scripts/update-3ds-announcements.mjs`, copier 3ds/index.html dans ce dépôt,
puis publier la modification.

L'affichage a été vérifié sur navigateur moderne. Tester sur une vraie 3DS :
la compatibilité HTTPS dépend aussi du navigateur et des certificats.
Les comptes et commentaires restent accessibles sur le site complet.
