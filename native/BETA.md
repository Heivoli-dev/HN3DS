# Heivoli Network 3D — bêta publique 0.3.1

Application non officielle pour Nintendo 3DS, 2DS et modèles New équipés d’un firmware personnalisé. La distribution est une préversion destinée aux testeurs.

## Installation et mise à jour

1. Télécharger le CIA de cette release. Comparer son SHA-256 à `SHA256SUMS.txt` si souhaité.
2. Copier le CIA sur la carte SD, puis l’installer avec FBI ou 3dsDL. L’installation par QR doit utiliser le QR PUBLIC joint à la release ; il ne dépend pas du Mac du développeur.
3. Une mise à jour remplace HN3D, sans demander de supprimer les jeux déjà installés. Les préférences sont dans `/3ds/HeivoliNetwork3D/`.
4. Lancer HN3D depuis HOME, activer le Wi-Fi, ouvrir Options pour choisir la région et la langue. Par défaut : toutes les régions et langue de la console.
5. Sélectionner un jeu, vérifier son édition et lancer le téléchargement. Le fichier reste sur SD après vérification ; prévoir de la place pour le fichier et l’installation.
6. Attendre la fin de la préparation du lancement, puis quitter HN3D pour revenir à HOME. En cas de seed manquante : fiche du jeu installé → Réparer la seed. Aucun retéléchargement du jeu n’est nécessaire pour cette réparation.

## Contenu de la bêta

- 1 212 fiches / 1 853 éditions avec sources référencées ; 1 173 autres fiches masquées.
- Recherche, genres, franchises, favoris, notes communautaires, sélection quotidienne, icônes et bannières.
- Priorité aux langues déclarées dans les métadonnées et choix de région. Ce choix ne traduit pas les jeux et ne garantit pas l’exactitude des métadonnées.
- File de téléchargement, reprise, empreinte vérifiée, import de seed et page d’erreur dédiée.
- Sources complètes et licences jointes. Aucun fichier de jeu inclus dans ces archives.

## Limites connues

- Les nouveaux jeux n’ont pas tous été téléchargés ou lancés sur matériel. Les en-têtes CIA et leurs identifiants ont été examinés ; cela ne prouve pas leur bon fonctionnement complet.
- Le développeur a reçu confirmation du lancement de 1001 Spikes EU après import manuel de sa seed. L’import automatique, la caméra, le débit et le mode capot fermé demandent davantage d’essais sur différents modèles.
- Un serveur externe peut être lent, refuser temporairement une connexion ou retirer un fichier. « Source référencée » ne garantit pas une disponibilité permanente.
- Le capot fermé maintient l’application et le réseau actifs : ce n’est pas une véritable veille basse consommation. Ne pas éteindre la console ni retirer la SD pendant une écriture.
- Les notes nécessitent Firebase et un accès réseau. Une identité invitée n’est pas un compte personnel récupérable ; supprimer la session locale fait perdre l’accès à ses anciens votes.
- Certains jeux et visuels ne sont disponibles que dans certaines régions. Une région sans correspondance affiche un catalogue vide ; choisir Toutes pour retrouver les autres jeux.
- Le QR de secours importe des liens hShop ; les sources Archive sont utilisées normalement.

## Signaler un problème

Utiliser les Issues du dépôt de distribution. Fournir version HN3D, modèle de console, version Luma, titre et région du jeu, étape du blocage et message/code exact. Préciser les étapes pour reproduire.

Pour un crash Luma : recopier Process, Exception type, PC, LR et le code d’erreur affiché, ou joindre une photo de l’écran. Le fichier `last-error.txt` peut aider ; le relire avant de le partager. Ne pas publier `firebase-session.json`, un dossier SD complet ou des identifiants.

Sauvegarder les données importantes avant les essais. Une installation interrompue doit être diagnostiquée avant de recommencer ; ne pas supprimer une sauvegarde de jeu pour tenter de réparer une seed.
