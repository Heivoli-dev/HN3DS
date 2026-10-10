# Heivoli Network — version 3DS

Version statique légère du site, sans JavaScript. Adresse prévue : http://3ds.heivoli-network.fr.

## Publication

Publier ce dépôt public sur GitHub sous le nom HN3DS. Dans Settings → Pages,
sélectionner GitHub Actions. Le domaine personnalisé
est 3ds.heivoli-network.fr. Ne pas modifier le domaine du dépôt HNfr.

Dans IONOS, remplacer les enregistrements A/AAAA du sous-domaine 3ds par un
CNAME : nom 3ds, destination Heivoli-dev.github.io. Configurer d'abord Pages
sur GitHub avant de modifier le DNS.

GitHub Actions récupère les six dernières annonces publiques de Firestore toutes
les cinq minutes, puis publie le HTML actualisé. Aucun script Firebase n'est chargé
sur la console et aucune clé privée n'est nécessaire. Les modifications et
suppression d'annonces sont aussi répercutées. Le planning peut être retardé par
GitHub : ce n'est pas une synchronisation instantanée.

En cas d'erreur réseau ou de réponse invalide, la publication s'arrête et le site
déjà en ligne reste disponible. Une mise à jour peut aussi être lancée depuis
Actions → Actualiser les annonces et publier → Run workflow. Les mises à jour
générées ne modifient pas le dépôt : elles sont incluses dans le site déployé.

GitHub désactive les tâches planifiées des dépôts publics sans activité pendant
60 jours. Si nécessaire, réactiver le workflow depuis Actions.

L'affichage a été vérifié sur navigateur moderne. Tester sur une vraie 3DS :
la compatibilité HTTPS dépend aussi du navigateur et des certificats.
Les comptes et commentaires restent accessibles sur le site complet.
