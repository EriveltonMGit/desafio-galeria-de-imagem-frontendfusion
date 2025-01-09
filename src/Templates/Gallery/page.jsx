import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoritesSlice';
import { notification, Modal } from 'antd'; // Importar o Modal do Ant Design
import { GrGallery } from "react-icons/gr";
import './Gallery.css';
import Favorites from '../../assets/components/Favorites/page';

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para controlar a imagem selecionada
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Buscar imagens da API Picsum Photos
  useEffect(() => {
    axios
      .get('https://picsum.photos/v2/list?page=1&limit=12')
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Erro ao carregar imagens:', error));
  }, []);

  // Adicionar ou remover dos favoritos
  const toggleFavorite = (image) => {
    const isFavorite = favorites.some((fav) => fav.id === image.id);
    if (isFavorite) {
      dispatch(removeFavorite(image));
      notification.info({
        message: 'Imagem Removida dos Favoritos',
        description: `A imagem de ${image.author} foi removida dos seus favoritos.`,
        duration: 4,
      });
    } else {
      dispatch(addFavorite(image));
      notification.success({
        message: 'Imagem Adicionada aos Favoritos',
        description: `A imagem de ${image.author} foi adicionada aos seus favoritos.`,
        duration: 4,
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
          onClick={() => setSelectedImage(image)} // Abre o modal com a imagem selecionada
        />
        <button
          className={`favorite-btn ${favorites.some((fav) => fav.id === image.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(image)}
        >
          {favorites.some((fav) => fav.id === image.id) ? '💾 Salvo' : 'Salvar'}
        </button>
      </div>
    ));

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h1>Galeria de Imagens <GrGallery /></h1>
      <div className="gallery-grid">{renderImages()}</div>

      {/* Passando a exibição dos favoritos para o componente Favorites */}
      <Favorites />

      {/* Modal para exibir as informações detalhadas da imagem */}
      {selectedImage && (
        <Modal
          title={`Detalhes da Imagem de ${selectedImage.author}`}
          visible={!!selectedImage}
          onCancel={handleCloseModal}
          footer={null} // Retirando os botões padrão do Ant Design
        >
          <div className="image-details">
            <img
              src={selectedImage.download_url}
              alt={selectedImage.author}
              style={{ width: '100%', height: 'auto', }}
            />
            <p><strong>Autor:</strong> {selectedImage.author}</p>
            <p><strong>Altura:</strong> {selectedImage.height}px</p>
            <p><strong>Largura:</strong> {selectedImage.width}px</p>
            <p><strong>ID:</strong> {selectedImage.id}</p>
            <p><strong>URL para download:</strong> <a href={selectedImage.download_url} target="_blank" rel="noopener noreferrer">{selectedImage.download_url}</a></p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Gallery;
