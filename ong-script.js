document.addEventListener('DOMContentLoaded', () => {
    const availableProductList = document.getElementById('availableProductList');
    const noAvailableProductsMessage = document.getElementById('noAvailableProductsMessage');

    // Tenta carregar os produtos do Local Storage
    // Se não houver nada, 'products' será um array vazio
    const products = JSON.parse(localStorage.getItem('products')) || [];

    function renderAvailableProducts() {
        availableProductList.innerHTML = ''; // Limpa a lista antes de renderizar

        if (products.length === 0) {
            noAvailableProductsMessage.style.display = 'block';
        } else {
            noAvailableProductsMessage.style.display = 'none';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.setAttribute('data-product-id', product.id);

                productCard.innerHTML = `
                    <div class="product-details">
                        <img src="${product.imagem}" alt="${product.nome}">
                        <h3>${product.nome}</h3>
                        <p><strong>Quantidade:</strong> ${product.quantidade}</p>
                        <p><strong>Detalhes:</strong> ${product.detalhes || 'N/A'}</p>
                    </div>
                    <div class="button-group">
                        <button class="btn btn-show-interest" data-id="${product.id}" title="Manifestar interesse nesta doação">
                            <i class="fas fa-hand-holding-heart"></i>
                        </button>
                    </div>
                `;
                availableProductList.appendChild(productCard);
            });

            addEventListenersToOngButtons();
        }
    }

    function addEventListenersToOngButtons() {
        document.querySelectorAll('.btn-show-interest').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.id;
                alert(`ONG manifestou interesse no produto: ${productId}`);
                // Aqui você implementaria a lógica para registrar o interesse da ONG
                // Isso provavelmente envolveria enviar essa informação para o Local Storage (se for um teste simples)
                // ou para um servidor real, associando o ID da ONG ao ID do produto.
            });
        });

        document.querySelectorAll('.btn-contact-donor').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.id;
                alert(`ONG quer entrar em contato com o doador do produto: ${productId}`);
                // Aqui você implementaria a lógica para mostrar informações de contato
                // ou um formulário de contato.
            });
        });
    }

    // Renderiza os produtos disponíveis ao carregar a página da ONG
    renderAvailableProducts();
});