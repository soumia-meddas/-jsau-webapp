# jsau-webapp
[![pipeline status](https://gitlab.sorbonne-paris-nord.fr/11924788/jsau-webapp/badges/main/pipeline.svg)](https://gitlab.sorbonne-paris-nord.fr/11924788/jsau-webapp/-/pipelines)

[![Coverage](https://gitlab.sorbonne-paris-nord.fr/11924788/jsau-webapp/badges/main/coverage.svg)](https://gitlab.sorbonne-paris-nord.fr/11924788/jsau-jsau-webapp/-/commits/main)

# README - jsau-webapp

## Description
Application web développée avec Vue.js et intégrée avec jsau-apiserver pour la gestion des données dynamiques.

## Prérequis
- Nginx (pour le reverse proxy et la gestion du serveur web)
- Node.js (via NVM, version recommandée : `20.17`)
- Vue.js
- Vite (outil de build rapide)

## Installation
```sh
nvm install 20.17
nvm use 20.17
npm install
```

## Lancement de l'application
```sh
npm run dev
```

## CI/CD et Qualité
- `npm run lint` : Vérifie la qualité du code
- `npm run stylelint` : Vérifie les styles CSS
- `npm run test` : Tests unitaires avec Jest et couverture

## Auteur
- **Soumia Meddas**  
  Email : soumia.meddas@outlook.fr
