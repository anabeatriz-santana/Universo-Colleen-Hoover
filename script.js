// Garante que o script só vai rodar depois que o HTML da página for completamente carregado.
document.addEventListener('DOMContentLoaded', inicializarPagina);

function inicializarPagina() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 1. Separa a autora dos livros
            const autora = data.find(item => item.genero === 'Autora');
            const livros = data.filter(item => item.genero !== 'Autora');

            // 2. Renderiza a autora e os livros
            renderizarAutora(autora);
            renderizarCards(livros);

            // 3. Inicia a funcionalidade de busca, passando apenas a lista de livros.
            iniciarBusca(livros);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

// Função para renderizar as informações da autora no rodapé
function renderizarAutora(autora) {
    const footer = document.getElementById('autora-footer');
    if (autora && footer) {
        footer.innerHTML = `
            <div class="autora-info">
                <div>
                    <h2>Sobre ${autora.nome} (${autora.ano})</h2>
                    <p>${autora.descrição}</p>
                    <ul class="footer-links">
                        <li><a href="${autora.link}" target="_blank">Site Oficial</a></li>
                        <li><a href="https://www.instagram.com/colleenhoover" target="_blank">Instagram</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Função para configurar o evento de busca nos livros.
function iniciarBusca(livros) {
    const caixaBusca = document.querySelector('#caixa-busca');
    caixaBusca.addEventListener('input', () => {
        const termoBuscado = caixaBusca.value.toLowerCase();
        const livrosFiltrados = livros.filter(livro =>
            livro.nome.toLowerCase().includes(termoBuscado) ||
            livro.descrição.toLowerCase().includes(termoBuscado)
        );
        renderizarCards(livrosFiltrados);
    });
}

// Função para criar e exibir os cards dos livros na tela.
function renderizarCards(listaDeLivros) {
    const cardContainer = document.querySelector('.card-container');
    // Limpa o container para não duplicar resultados em buscas futuras.
    cardContainer.innerHTML = '';

    for (let livro of listaDeLivros) {
        cardContainer.innerHTML += `
            <article class="card">
                <div class="card-content">
                    <h2>${livro.nome} (${livro.ano})</h2>
                    <p class="genero">${livro.genero}</p>
                    <p>${livro.descrição}</p>
                    <a href="${livro.link}" target="_blank">Ver na Goodreads</a>
                </div>
            </article>   
        `;
    }
}