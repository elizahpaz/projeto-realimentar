// script.js

// --- Logic for produto.html (Form Page) ---
function setupProductForm() {
    // Only run this code if the form elements exist on the current page
    const produtoForm = document.getElementById('produtoForm');
    if (!produtoForm) return; // Exit if not on the form page

    const idNomeProd = document.getElementById('idNomeProd');
    const idQtde = document.getElementById('idQtde');
    const idDetalhes = document.getElementById('idDetalhes');
    const imageUpload = document.getElementById('imageUpload');
    const previewImage = document.getElementById('previewImage');

    // Image preview functionality
    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = 'https://via.placeholder.com/100?text=No+Photo'; // Reset if no file selected
        }
    });

    produtoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const newProduct = {
            nome: idNomeProd.value,
            quantidade: idQtde.value,
            detalhes: idDetalhes.value,
            imagem: previewImage.src // Store the base64 string of the image
        };

        // Get existing products from local storage, or initialize an empty array
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Add the new product
        products.push(newProduct);

        // Save updated products array back to local storage
        localStorage.setItem('products', JSON.stringify(products));

        alert('Produto adicionado com sucesso!');

        // Optionally, clear the form after submission
        produtoForm.reset();
        previewImage.src = 'https://via.placeholder.com/100?text=No+Photo'; // Reset image preview
        
        // Redirect to the products display page
        window.location.href = 'home-empresa.html'; // Changed to home-empresa.html
    });
}

// --- Logic for home-empresa.html (Display Page) ---
function loadProductsDisplay() {
    // Only run this code if the product list elements exist on the current page
    const productListDiv = document.getElementById('productList');
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (!productListDiv || !noProductsMessage) return; // Exit if not on the products display page

    // Retrieve products from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length > 0) {
        productListDiv.innerHTML = ''; // Clear any existing content
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.imagem}" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p><strong>Quantidade:</strong> ${product.quantidade}</p>
                <p><strong>Detalhes:</strong> ${product.detalhes || 'N/A'}</p>
            `;
            productListDiv.appendChild(productCard);
        });
        noProductsMessage.style.display = 'none'; // Hide message if products are found
    } else {
        noProductsMessage.style.display = 'block'; // Show message if no products
    }
}

// --- Initialize functions based on the current page ---
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on and call the relevant function
    // We'll check for specific IDs unique to each page
    if (document.getElementById('produtoForm')) { // This ID is specific to produto.html
        setupProductForm();
    } else if (document.getElementById('productList')) { // This ID is specific to home-empresa.html
        loadProductsDisplay();
    }
});