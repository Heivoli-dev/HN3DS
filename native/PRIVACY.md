# Données de la bêta

Favoris, préférences, historique, fichiers téléchargés et journaux restent sur la carte SD. HN3D n’intègre pas de SDK Analytics et n’envoie pas automatiquement de rapport de crash.

Les notes communautaires utilisent Firebase Authentication avec une identité anonyme et Firestore dans le projet Heivoli Network 3D. Le service reçoit un identifiant invité, l’identifiant de la fiche, la note (1 à 5) et sa date de mise à jour. La moyenne et le nombre de votes sont publics ; les règles limitent la lecture et la modification d’un vote individuel à son identité. Le service et les hébergeurs contactés traitent aussi les informations techniques nécessaires aux requêtes réseau, selon leurs propres politiques.

La session Firebase et ses jetons sont conservés localement dans `firebase-session.json`. Ne pas les partager. Effacer ce fichier après avoir quitté l’application empêche cette installation de réutiliser l’identité, sans effacer les votes déjà enregistrés sur le serveur. La bêta n’a pas encore de fonction de suppression distante de compte ou de vote.

Le catalogue de sources externes est embarqué ; télécharger un jeu contacte son hébergeur. L’import automatique de seed peut contacter le service Nintendo avec l’identifiant du titre et la région de l’édition. La configuration Web Firebase distribuée est publique ; aucun compte de service ni clé d’administration n’est inclus.
