const apiKey = '2b670f1bd2da4ffda8bf7a35e30fd6c0';
const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`;

// Seleciona o container onde as notícias serão exibidas
const newsContainer = document.getElementById('news-container');

// Função para buscar notícias da API
function fetchNews() {
    fetch(url)
        .then(response => {
            console.log('Resposta da API:', response); // Adicione este log
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Adicione este log
            displayNews(data.articles); // Passa os artigos recebidos para a função que exibe as notícias
        })
        .catch(error => console.error('Erro ao buscar notícias:', error));
}

// Função para exibir as notícias no HTML
function displayNews(articles) {
    // Limpa o container antes de inserir as notícias
    newsContainer.innerHTML = '';

    // Verifica se há artigos
    if (!articles || articles.length === 0) {
        const noNewsMessage = document.createElement('p');
        noNewsMessage.textContent = 'Nenhuma notícia disponível no momento.';
        newsContainer.appendChild(noNewsMessage);
        return;
    }

    // Itera sobre cada artigo recebido
    articles.forEach(article => {
        // Cria um elemento para cada notícia
        const newsItem = document.createElement('article');
        newsItem.classList.add('news-item');

        // Adiciona imagem da notícia
        if (article.urlToImage) {
            const newsImage = document.createElement('img');
            newsImage.src = article.urlToImage;
            newsItem.appendChild(newsImage);
        }

        // Adiciona o título da notícia
        const newsTitle = document.createElement('h2');
        newsTitle.textContent = article.title;
        newsItem.appendChild(newsTitle);

        // Adiciona a descrição da notícia
        const newsDescription = document.createElement('p');
        newsDescription.textContent = article.description || 'Descrição não disponível.';
        newsItem.appendChild(newsDescription);

        // Adiciona um link para a notícia completa
        const newsLink = document.createElement('a');
        newsLink.href = article.url;
        newsLink.textContent = 'Leia mais';
        newsLink.target = '_blank'; // Abre em uma nova aba
        newsItem.appendChild(newsLink);

        // Adiciona a notícia ao container
        newsContainer.appendChild(newsItem);
    });
}

// Chama a função para buscar e exibir as notícias quando a página carregar
window.onload = fetchNews;
