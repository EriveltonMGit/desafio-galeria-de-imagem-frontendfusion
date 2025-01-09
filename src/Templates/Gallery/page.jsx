import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoritesSlice';
import { notification } from 'antd'; 

import './Gallery.css';
import Favorites from '../../assets/components/Favorites/page'; 

function Gallery() {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Buscar imagens da API Picsum Photos
  useEffect(() => {
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=12')
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Erro ao carregar imagens:', error));
  }, []);

  // Adicionar ou remove dos favoritos
  const toggleFavorite = (image) => {
    const isFavorite = favorites.some((fav) => fav.id === image.id);
    if (isFavorite) {
      dispatch(removeFavorite(image));
      // Exibir notificação de imagem removida dos favoritos
      notification.info({
        message: 'Imagem Removida dos Favoritos',
        description: `A imagem de ${image.author} foi removida dos seus favoritos.`,
        duration: 4, // Tempo de exibição da notificação
      });
    } else {
      dispatch(addFavorite(image));
      // Exibir notificação de imagem adicionada aos favoritos
      notification.success({
        message: 'Imagem Adicionada aos Favoritos',
        description: `A imagem de ${image.author} foi adicionada aos seus favoritos.`,
        duration: 4, // Tempo de exibição da notificação
      });
    }
  };

  // Renderizar imagens
  const renderImages = () =>
    images.map((image) => (
      <div key={image.id} className="gallery-item">
        <img
          src={image.download_url}
          alt={image.author}
          onClick={() => console.log(`Imagem de ${image.author} clicada!`)}
        />
        <button
          className={`favorite-btn ${favorites.some((fav) => fav.id === image.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(image)}
        >
          {favorites.some((fav) => fav.id === image.id) ? '💾 Salvo' : 'Salvar'}
        </button>
      </div>
    ));

  return (
    <div className="gallery-container">
      <h1>Galeria de Imagens</h1>
      <div className="gallery-grid">{renderImages()}</div>

      {/* Passando a exibição dos favoritos para o componente Favorites */}
      <Favorites />
    </div>
  );
}

export default Gallery;
