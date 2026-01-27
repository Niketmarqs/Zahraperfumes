/* ===================== PRODUTOS ===================== */
const produtos = [
    { id: 1, nome: "Khanjar", preco: 450, imagem: "khanjar.png" },
    { id: 2, nome: "Her Confession", preco: 320, imagem: "her_confession.jpg" },
    { id: 3, nome: "Attar Al Wesal", preco: 260, imagem: "attar_wesal.jpg" },
    { id: 4, nome: "Lattafa Yara Rosa", preco: 260, imagem: "yara_rosa.jpg" },
    { id: 5, nome: "Asad Elixir", preco: 360, imagem: "asad_elixir.jpg" },
    { id: 6, nome: "Asad Azul", preco: 270, imagem: "asad_azul.jpg" },
    { id: 7, nome: "Winners Trophy", preco: 370, imagem: "winners.jpg" },
    { id: 8, nome: "Asad Preto", preco: 260, imagem: "asad_preto.jpg" },
    { id: 9, nome: "Sabah Al Ward", preco: 250, imagem: "sabah.jpg" },
    { id: 10, nome: "Club de Nuit", preco: 350, imagem: "club_nuit.jpg" },
    { id: 11, nome: "Fakhar Rose", preco: 290, imagem: "fakhar.jpg" },
    { id: 12, nome: "Asad Bourbon", preco: 300, imagem: "asad_bourbon.jpg" }
];

/* ===================== ESTADO ===================== */
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtosAtuais = [...produtos];

/* ===================== RENDER PRODUTOS ===================== */
function renderProdutos(lista) {
    const container = document.getElementById("lista-produtos");
    if (!container) return;

    container.innerHTML = "";

    lista.forEach(p => {
        container.innerHTML += `
            <div class="produto-card">
                <div class="img-produto">
                    <img src="imagens/${p.imagem}" alt="${p.nome}">
                </div>

                <h3 class="nome-produto">${p.nome}</h3>

                <span class="preco-atual">R$ ${p.preco.toFixed(2)}</span>
                <div class="parcelamento">
                    ou 2x de R$ ${(p.preco / 2).toFixed(2)} sem juros
                </div>

                <button class="btn-comprar" onclick="addCarrinho(${p.id})">
                    COMPRAR
                </button>
            </div>
        `;
    });
}

/* ===================== CARRINHO ===================== */
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

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

    if (!itens) return;

    let total = 0;
    itens.innerHTML = "";

    carrinho.forEach((p, i) => {
        total += p.preco;
        itens.innerHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <span>${p.nome}</span>
                <div style="display:flex;gap:10px;align-items:center;">
                    <strong>R$ ${p.preco.toFixed(2)}</strong>
                    <button onclick="removerCarrinho(${i})"
                        style="border:none;background:none;color:red;font-weight:700;cursor:pointer;">
                        ✕
                    </button>
                </div>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = total.toFixed(2);
    if (countEl) countEl.innerText = carrinho.length;
}

/* ===================== CARRINHO ABRIR / FECHAR ===================== */
function abrirCarrinho() {
    const cart = document.getElementById("sidebar-cart");
    const overlay = document.getElementById("overlay");
    if (cart) cart.classList.add("active");
    if (overlay) overlay.style.display = "block";
}

function toggleCart() {
    const cart = document.getElementById("sidebar-cart");
    const overlay = document.getElementById("overlay");

    if (!cart || !overlay) return;

    cart.classList.toggle("active");
    overlay.style.display = cart.classList.contains("active") ? "block" : "none";
}

/* ===================== FINALIZAR COMPRA ===================== */
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "pagamento_conclusao.html";
}

/* ===================== FILTROS ===================== */
function aplicarFiltro(tipo) {
    if (tipo === "caros") {
        produtosAtuais.sort((a, b) => b.preco - a.preco);
    } else if (tipo === "az") {
        produtosAtuais.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
        produtosAtuais = [...produtos];
    }

    renderProdutos(produtosAtuais);
}

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {
    renderProdutos(produtos);
    atualizarCarrinho();
});
