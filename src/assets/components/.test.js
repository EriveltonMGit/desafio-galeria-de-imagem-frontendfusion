import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Gallery from './Gallery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { favoritesReducer } from '../../Redux/favoritesSlice'; // Ajuste de acordo com o seu arquivo de reducers

// Cria uma store para o redux
const store = createStore(favoritesReducer);

describe('Componente Gallery', () => {
  
  // Teste para verificar se as imagens estão sendo renderizadas corretamente
  test('deve exibir as imagens da galeria', async () => {
    render(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );

    // Aguarda a imagem carregar
    await waitFor(() => screen.getByAltText(/Imagem de/));

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0); // Verifica se pelo menos uma imagem foi carregada
  });

  // Teste para verificar se a funcionalidade de adicionar aos favoritos funciona
  test('deve adicionar a imagem aos favoritos ao clicar no botão de salvar', () => {
    render(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );
    
    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    // Verifica se o botão de salvar foi alterado para "Salvo"
    expect(saveButton).toHaveTextContent('💾 Salvo');
  });

  // Teste para verificar o modal com as informações detalhadas da imagem
  test('deve exibir o modal com os detalhes da imagem ao clicar na imagem', async () => {
    render(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );
    
    const image = await screen.findByAltText(/Imagem de/); // Assumindo que todas as imagens têm esse formato no atributo alt
    fireEvent.click(image);

    const modalTitle = screen.getByText(/Detalhes da Imagem de/);
    expect(modalTitle).toBeInTheDocument(); // Verifica se o título do modal aparece corretamente
  });

  // Teste para verificar se a notificação de imagem salva funciona
  test('deve mostrar notificação ao salvar imagem nos favoritos', () => {
    render(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    // Verifica se a notificação aparece
    expect(screen.getByText(/Imagem Adicionada aos Favoritos/)).toBeInTheDocument();
  });

  // Teste para verificar se a notificação de imagem removida dos favoritos funciona
  test('deve mostrar notificação ao remover imagem dos favoritos', () => {
    render(
      <Provider store={store}>
        <Gallery />
      </Provider>
    );

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton); // Adiciona aos favoritos
    fireEvent.click(saveButton); // Remove dos favoritos novamente

    // Verifica se a notificação aparece
    expect(screen.getByText(/Imagem Removida dos Favoritos/)).toBeInTheDocument();
  });

});
