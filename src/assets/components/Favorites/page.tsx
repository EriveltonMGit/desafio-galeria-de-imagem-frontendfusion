// src/components/Favorites.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/types'; 
import './Favorites.css';
import { MdOutlineFavorite } from "react-icons/md";
function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites); // Tipando o state

  return (
    <div className="favorites-container">
      <h2>Favoritos<MdOutlineFavorite /></h2>
      <div className="gallery-grid_fav">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="gallery-item_img">
              <img src={fav.download_url} alt={fav.author} />
            </div>
          ))
        ) : (
          <p>Nenhum favorito encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
