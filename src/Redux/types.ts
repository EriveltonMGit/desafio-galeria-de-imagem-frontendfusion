// Defina o tipo do estado de favoritos
export interface Favorite {
    id: string;
    author: string;
    download_url: string;
  }
  
  export interface RootState {
    favorites: {
      favorites: Favorite[];
    };
  }
  