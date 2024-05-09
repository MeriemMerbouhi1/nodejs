# Utilisez une image de base avec Node.js
FROM node:20.7.0

# Créez et définissez le répertoire de travail de l'application
WORKDIR /src/app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3000

# Démarrez l'application
CMD ["node", "app.js"]
