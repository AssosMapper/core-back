### Procédure d'installation

*  Cloner le projet sur votre machine
* Mettre à jour le fichier .env avec les informations de votre base de données. Si c'est un environnement dev, le compose.yaml s'occupe de tout.
  ```sh
    cp .env.example .env
    ```
* Lancer le container docker. Il va vous permettre de lancer le projet complétement. Ne vous fiez pas aux erreurs de dépendances elles seront résolus par la suite.
    ```sh
        docker-compose up #-d si vous souhaitez le lancer en arrière plan
    ```
* Installer les dépendances du projet
    ```sh
        docker exec core-back npm install
    ```
* Lancer les seeders pour avoir des données de test
    ```sh
        docker exec core-back npm run seed
    ```
* Accéder à la documentation de l'api à l'adresse suivante
    ```
        http://localhost:3000/api
    ```
  
### Pour accéder au container docker de l'application
```sh
    docker exec -it core-back bash
```