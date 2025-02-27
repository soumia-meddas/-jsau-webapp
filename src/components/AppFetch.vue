<template>
  <div class="app-container">
    <h1 class="app-title">Application de gestion de fichiers</h1>

    <!-- Rechercher un fichier -->
    <section class="section">
      <h2 class="section-title">Rechercher un fichier</h2>
      <form @submit.prevent="searchFile" class="form">
        <input v-model="query" placeholder="Nom du fichier" class="input" />
        <button type="submit" class="button">Rechercher</button>
      </form>
      <p v-if="loading" class="status">Recherche en cours...</p>
      <p v-else class="status">{{ searchResult }}</p>
    </section>

    <!-- Télécharger un fichier -->
    <section class="section">
      <h2 class="section-title">Télécharger un fichier</h2>
      <form @submit.prevent="downloadFile" class="form">
        <input v-model="downloadFilename" placeholder="Nom du fichier (ex. example.html)" class="input" />
        <button type="submit" class="button">Télécharger</button>
      </form>
      <p class="status">{{ downloadMessage }}</p>
    </section>

    <!-- Gérer les favoris -->
    <section class="section">
      <h2 class="section-title">Favoris</h2>
      <form @submit.prevent="addFavorite" class="form">
        <input v-model="newFavorite" placeholder="Nom du fichier à ajouter" class="input" />
        <button type="submit" class="button">Ajouter aux favoris</button>
      </form>
      <p class="status">{{ favoriteMessage }}</p>
      <ul class="favorites-list">
        <li v-for="fav in favorites" :key="fav.id" class="favorite-item">
          {{ fav.filename }}
          <button @click="removeFavorite(fav.id)" class="delete-button">Supprimer</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      searchResult: '',
      loading: false,
      downloadFilename: '',
      downloadMessage: '',
      newFavorite: '',
      favorites: [],
      favoriteMessage: '',
    };
  },
  methods: {
    async searchFile() {
      if (!this.query.trim()) {
        this.searchResult = 'Veuillez entrer un nom de fichier.';
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(`/api/search?text=${this.query}`);
        if (response.ok) {
          this.searchResult = `Le fichier "${this.query}" a été trouvé.`;
        } else if (response.status === 404) {
          this.searchResult = `Le fichier "${this.query}" est introuvable.`;
        } else {
          this.searchResult = 'Une erreur est survenue.';
        }
      } catch (error) {
        this.searchResult = 'Erreur réseau ou serveur.';
      } finally {
        this.loading = false;
      }
    },
    async downloadFile() {
        
      if (!this.downloadFilename.trim()) {
        this.downloadMessage = 'Veuillez entrer un nom de fichier.';
        return;
      }
      try {
        const response = await fetch(`/api/documents/${this.downloadFilename}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.downloadFilename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.downloadMessage = `Le fichier "${this.downloadFilename}" a été téléchargé.`;
        } else if (response.status === 404) {
          this.downloadMessage = `Le fichier "${this.downloadFilename}" est introuvable.`;
        } else {
          this.downloadMessage = 'Erreur lors du téléchargement.';
        }
      } catch (error) {
        this.downloadMessage = 'Erreur réseau ou serveur.';
      }
    },
    // Charger les favoris
    async fetchFavorites() {
      try {
        const response = await fetch('/api/favorites');  
        if (response.ok) {
          this.favorites = await response.json();
        } else {
          this.favoriteMessage = 'Erreur lors du chargement des favoris.';
        }
      } catch (error) {
        this.favoriteMessage = 'Erreur réseau ou serveur.';
      }
    },
    async addFavorite() {
      if (!this.newFavorite.trim()) {
        this.favoriteMessage = 'Veuillez entrer un nom de fichier.';
        return;
      }
      try {
        const response = await fetch(`/api/favorites/${this.newFavorite}`, {
          method: 'POST',
        });
        const result = await response.json();
        if (response.ok) {
          this.favorites = result.favorites;
          this.newFavorite = '';
          this.favoriteMessage = result.message;
        } else {
          this.favoriteMessage = result.message || 'Erreur lors de l\'ajout.';
        }
      } catch (error) {
        this.favoriteMessage = 'Erreur réseau ou serveur.';
      }
    },
    async removeFavorite(id) {
      try {
        const response = await fetch(`/api/favorites/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.favorites = this.favorites.filter((fav) => fav.id !== id);
          this.favoriteMessage = 'Favori supprimé.';
        } else {
          this.favoriteMessage = 'Erreur lors de la suppression.';
        }
      } catch (error) {
        this.favoriteMessage = 'Erreur réseau ou serveur.';
      }
    },
  },
  mounted() {
    this.fetchFavorites();
  },
};
</script>

<style scoped>
 
/* Conteneur principal */
.app-container {
  background: rgba(255, 255, 255, 0.9);  
  padding: 30px;
  border-radius: 10px; 
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); 
  width: 400px; 
  text-align: center; 
  margin: 0; 
  position: relative;  
  left: +200px;  
}

/* Titre principal */
.app-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Sections */
.section {
  margin-bottom: 30px;
}

/* Titres des sections */
.section-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

/* Formulaires */
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Inputs */
.input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

/* Boutons */
.button {
  background-color:  #0b2846;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #0056b3;
}

/* Statuts */
.status {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

/* Liste des favoris */
.favorites-list {
  list-style: none;
  padding: 0;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: #f1f1f1;
  margin: 5px 0;
  border-radius: 5px;
}

/* Bouton supprimer */
.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

</style>
