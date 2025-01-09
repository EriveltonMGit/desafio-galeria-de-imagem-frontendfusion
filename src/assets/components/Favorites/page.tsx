import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../../../Redux/favoritesSlice'; // Certifique-se de importar a ação correta
import { RootState } from '../../../Redux/types'; 
import './Favorites.css';
import { MdOutlineFavorite } from "react-icons/md";
import { notification } from 'antd';

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites); // Tipando o state

  // Função para remover a imagem dos favoritos
  const handleRemoveFavorite = (image) => {
    dispatch(removeFavorite(image)); // Despacha a ação de remoção do favorito

    // Exibir notificação de imagem removida dos favoritos
    notification.info({
      message: 'Imagem Removida dos Favoritos',
      description: `A imagem de ${image.author} foi removida dos seus favoritos.`,
      duration: 4, // Tempo de exibição da notificação
    });
  };

  return (
    <div className="favorites-container" >
      <h2>Favoritos<MdOutlineFavorite /></h2>
      <div className="gallery-grid_fav" >
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="gallery-item_img">
              <img src={fav.download_url} alt={fav.author} data-aos="zoom-out"/>
              <button onClick={() => handleRemoveFavorite(fav)}>Remover</button>
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
