- React
    - Presence d’un linter / prettier
    - Utilisez les dernières norme ES6
  TODO:  - Utilisez des techniques avancé de performance (UseMemo, useCallBack)
  TODO:  - avoir un système de retour utilisateur, notifier les succes/erreurs, faire un affichage en cas de non reponse de l’api, faire un loader durant les call API etc.
  TODO:  - avoir un système d'authentification (Jwt)
- le Backoffice comprendra:
    - une vue globale avec des statistique:
        - nombre de morceau sur la plateforme
        - nombre d’album
        - nombre d’écoute
    - Une vue pour gerer les sons
        - ajouts
        - suppression
    TODO:    - modifications des données
    - une vue pour gérer les albums
        - creation (Selection de sons a mettre dans l’album)
            - ajout d’une jaquette
        TODO:    - L’ordre des sons peux etre changer via un drag and drop
        - suppression
    TODO:    - modification
            - titre et autre infos
            - jaquette
    - une vue pour gerer les artiste :
        - lier des albums a un artiste (supprimer, ajouter un album)
    - une barre de recherche pour chercher :
        - artistes
        - sons
        - albums