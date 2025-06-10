function setupProductForm() {

    const produtoForm = document.getElementById('produtoForm');
    if (!produtoForm) return; // Sai se não estiver na pagina de cadastro de produto

    const idNomeProd = document.getElementById('idNomeProd');
    const idQtde = document.getElementById('idQtde');
    const idDetalhes = document.getElementById('idDetalhes');
    const imageUpload = document.getElementById('imageUpload');
    const previewImage = document.getElementById('previewImage');

    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = 'https://via.placeholder.com/100?text=No+Photo';
        }
    });

    produtoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newProduct = {
            nome: idNomeProd.value,
            quantidade: idQtde.value,
            detalhes: idDetalhes.value,
            imagem: previewImage.src
        };

        // Carrega lista de produtos ou cria uma nova
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Add novo produto
        products.push(newProduct);

        // Salva novos produtos no array
        localStorage.setItem('products', JSON.stringify(products));

        alert('Produto adicionado com sucesso!');

        // Limpa o forms depois de enviado
        produtoForm.reset();
        previewImage.src = 'https://via.placeholder.com/100?text=No+Photo'; // Reseta a imagem
        
        // Redireciona para a homepage
        window.location.href = 'home-empresa.html';
    });
}

// Mostrar produtos na homepage
function loadProductsDisplay() {
    const productListDiv = document.getElementById('productList');
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (!productListDiv || !noProductsMessage) return; // Sai se não estiver na pagina home

    // Recupera os produtos cadastrados no arquivo
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length > 0) {
        productListDiv.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <div class="product-details">
                    <img src="${product.imagem}" alt="${product.nome}">
                    <h3>${product.nome}</h3>
                    <p><strong>Quantidade:</strong> ${product.quantidade}</p>
                    <p><strong>Detalhes:</strong> ${product.detalhes || 'N/A'}</p>
                </div>
                <div class="button-group">
                    <button class="btn btn-view-interests" data-id="${product.id}" title="Ver ONGs interessadas">
                        <i class="fas fa-handshake"></i>
                    </button>
                    <button class="btn btn-delProd" data-id="${product.id}" title="Editar informações do produto">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            productListDiv.appendChild(productCard);
        });
        addEventListenersToProductButtons();

    function addEventListenersToProductButtons() {
        document.querySelectorAll('.btn-delProd').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.id;
                alert(`Excluir produto: ${productId}`);
            });
        });

        document.querySelectorAll('.btn-view-interests').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.id;
                alert(`Ver ONGs interessadas no produto: ${productId}`);
            });
        });
    }

        noProductsMessage.style.display = 'none';
    } else {
        noProductsMessage.style.display = 'block';
    }
}

//Inicializa a função com base na pagina carregada
document.addEventListener('DOMContentLoaded', () => {
    //Checa se a pagina carregou e chama a devida funcao
    if (document.getElementById('produtoForm')) { //ID da pagina produto.html
        setupProductForm();
    } else if (document.getElementById('productList')) { //ID da pagina home-empresa.html
        loadProductsDisplay();
    }
});