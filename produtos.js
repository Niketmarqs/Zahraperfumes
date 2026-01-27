const produtos = [
    { id: 1, nome: "Khanjar", preco: 450, imagem: "Khanjar.png" },
    { id: 2, nome: "Her Confession", preco: 320, imagem: "sua_confissão.jpg" },
    { id: 3, nome: "Attar Al Wesal Al Wataniah", preco: 260, imagem: "Attar Al Wesal Al Wataniah.jpeg" },
    { id: 4, nome: "Lattafa Yara Rosa", preco: 260, imagem: "Lattafa Yara Rosa.jfif" },
    { id: 5, nome: "Lattafa Asad Elixir", preco: 360, imagem: "LattafaAsadPretoElixir.jpg" },
    { id: 6, nome: "Lattafa Asad Azul", preco: 270, imagem: "Lattafa Asad Azul.jpeg" },
    { id: 7, nome: "Winners Trophy", preco: 370, imagem: "Troféu dos Vencedores.jpeg" },
    { id: 8, nome: "Asad Preto Normal", preco: 260, imagem: "Asad Preto Normal.jpeg" },
    { id: 9, nome: "Sabah Al Ward Al Wataniah", preco: 250, imagem: "Sabah al Ward Al Wataniah.png" },
    { id: 10, nome: "Club de Nuit Intense", preco: 350, imagem: "Clube de Noite Intensa.jpeg" },
    { id: 11, nome: "Lattafa Fakhar Rose", preco: 290, imagem: "Lattafa Fakhar Rose.png" },
    { id: 12, nome: "Asad Bourbon", preco: 300, imagem: "Asad Bourbon.jpeg" }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtosAtuais = [...produtos];

/* RENDER */
function renderProdutos(lista) {
    const container = document.getElementById("lista-produtos");
    if (!container) return;
    container.innerHTML = "";

    lista.forEach(p => {
        container.innerHTML += `
            <div class="produto-card">
                <div class="img-produto">
                    <img src="${p.imagem}" alt="${p.nome}">
                </div>
                <h3>${p.nome}</h3>
                <span>R$ ${p.preco.toFixed(2)}</span>
                <button onclick="addCarrinho(${p.id})">COMPRAR</button>
            </div>
        `;
    });
}

/* CARRINHO */
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
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
            <div>
                ${p.nome} - R$ ${p.preco.toFixed(2)}
                <button onclick="removerCarrinho(${i})">✕</button>
            </div>
        `;
    });

    totalEl.innerText = total.toFixed(2);
    countEl.innerText = carrinho.length;
}

/* UI */
function abrirCarrinho() {
    document.getElementById("sidebar-cart").classList.add("active");
    document.getElementById("overlay").style.display = "block";
}

function toggleCart() {
    const cart = document.getElementById("sidebar-cart");
    const overlay = document.getElementById("overlay");
    cart.classList.toggle("active");
    overlay.style.display = cart.classList.contains("active") ? "block" : "none";
}

/* FINALIZAR */
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "pagamento_conclusao.html";
}

/* FILTRO */
function aplicarFiltro(tipo) {
    if (tipo === "caros") produtosAtuais.sort((a,b)=>b.preco-a.preco);
    else if (tipo === "az") produtosAtuais.sort((a,b)=>a.nome.localeCompare(b.nome));
    else produtosAtuais = [...produtos];
    renderProdutos(produtosAtuais);
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    renderProdutos(produtos);
    atualizarCarrinho();
});
