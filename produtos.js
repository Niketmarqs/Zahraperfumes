const produtos = [
    // Perfumes Femininos e Masculinos conforme sua lista
    { id: 1, nome: "Khanjar", preco: 450, cat: "M", imagem: "Khanjar.png" },
    { id: 2, nome: "Her Confession", preco: 320, cat: "F", imagem: "her_confession.jpg" },
    { id: 3, nome: "Attar Al Wesal Al Wataniah", preco: 260, cat: "M", imagem: "Attar Al Wesal Al Wataniah.jpeg" },
    { id: 4, nome: "Lattafa Yara Rosa", preco: 260, cat: "F", imagem: "yara_rosa.jpg" },
    { id: 5, nome: "Lattafa Asad Preto Elixir", preco: 360, cat: "M", imagem: "asad_elixir.jpg" },
    { id: 6, nome: "Lattafa Asad Azul", preco: 270, cat: "M", imagem: "asad_azul.jpg" },
    { id: 7, nome: "Winners Trophy", preco: 370, cat: "M", imagem: "winners.jpg" },
    { id: 8, nome: "Asad Preto Normal", preco: 260, cat: "M", imagem: "asad_preto.jpg" },
    { id: 9, nome: "Sabah Al Ward Al Wataniah", preco: 250, cat: "F", imagem: "sabah.jpg" },
    { id: 10, nome: "Club de Nuit Intense", preco: 350, cat: "M", imagem: "club_nuit.jpg" },
    { id: 11, nome: "Lattafa Fakhar Rose", preco: 290, cat: "F", imagem: "fakhar.jpg" },
    { id: 12, nome: "Asad Bourbon", preco: 300, cat: "M", imagem: "asad_bourbon.jpg" },
    { id: 13, nome: "Lattafa Dourado", preco: 265, cat: "M", imagem: "lattafa_dourado.jpg" },
    { id: 14, nome: "His Confession", preco: 350, cat: "M", imagem: "his_confession.jpg" },
    { id: 15, nome: "The Kingdom", preco: 350, cat: "M", imagem: "kingdom.jpg" },
    { id: 16, nome: "Al Dana", preco: 400, cat: "M", imagem: "al_dana.jpg" },
    { id: 17, nome: "Manaal", preco: 330, cat: "M", imagem: "manaal.jpg" },
    { id: 18, nome: "Vulcan Feu", preco: 410, cat: "M", imagem: "vulcan.jpg" }
];

let carrinho = [];

const lista = document.getElementById("lista-produtos");

produtos.forEach(p => {
    lista.innerHTML += `
        <div class="produto-card">
            <div class="img-produto">
                <img src="imagens/${p.imagem}" onerror="this.src='imagens/logo.png'">
            </div>

            <h3 class="nome-produto">${p.nome}</h3>

            <span class="preco-atual">R$ ${p.preco},00</span>
            <div class="parcelamento">
                ou 2x de R$ ${(p.preco / 2).toFixed(2)} sem juros
            </div>

            <button class="btn-comprar" onclick="addCarrinho(${p.id})">
                COMPRAR
            </button>
        </div>
    `;
});

function addCarrinho(id) {
    carrinho.push(produtos.find(p => p.id === id));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itens = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");

    let total = 0;
    itens.innerHTML = "";

    carrinho.forEach((p, i) => {
        total += p.preco;
        itens.innerHTML += `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span>${p.nome}</span>
                <strong>R$ ${p.preco}</strong>
            </div>
        `;
    });

    totalEl.innerText = total.toFixed(2);
    countEl.innerText = carrinho.length;
}

function toggleCart() {
    const cart = document.getElementById("sidebar-cart");
    const overlay = document.getElementById("overlay");

    cart.classList.toggle("active");
    overlay.style.display = cart.classList.contains("active") ? "block" : "none";
}

function finalizarCompra() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "pagamento.html";
}
