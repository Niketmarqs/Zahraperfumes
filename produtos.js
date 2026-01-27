/* ===================== PRODUTOS ===================== */
const produtos = [
    { id: 1, nome: "Khanjar", preco: 450, imagem: "Khanjar.png" },
    { id: 2, nome: "Her Confession", preco: 320, imagem: "her_confession.jpg" },
    { id: 3, nome: "Attar Al Wesal Al Wataniah", preco: 260, imagem: "Attar Al Wesal Al Wataniah.jpeg" },
    { id: 4, nome: "Lattafa Yara Rosa", preco: 260, imagem: "yara_rosa.jfif" },
    { id: 5, nome: "Lattafa Asad Preto Elixir", preco: 360, imagem: "asad_elixir.jpg" },
    { id: 6, nome: "Lattafa Asad Azul", preco: 270, imagem: "asad_azul.jpg" },
    { id: 7, nome: "Winners Trophy", preco: 370, imagem: "winners.jpg" },
    { id: 8, nome: "Asad Preto Normal", preco: 260, imagem: "LattafaAsadPretoElixir.jpg" },
    { id: 9, nome: "Sabah Al Ward Al Wataniah", preco: 250, imagem: "sabah.jpg" },
    { id: 10, nome: "Club de Nuit Intense", preco: 350, imagem: "club_nuit.jpg" },
    { id: 11, nome: "Lattafa Fakhar Rose", preco: 290, imagem: "fakhar.jpg" },
    { id: 12, nome: "Asad Bourbon", preco: 300, imagem: "asad_bourbon.jpg" },
    { id: 13, nome: "Lattafa Dourado", preco: 265, imagem: "lattafa_dourado.jpg" },
    { id: 14, nome: "His Confession", preco: 350, imagem: "his_confession.jpg" },
    { id: 15, nome: "The Kingdom", preco: 350, imagem: "kingdom.jpg" },
    { id: 16, nome: "Al Dana", preco: 400, imagem: "al_dana.jpg" },
    { id: 17, nome: "Manaal", preco: 330, imagem: "manaal.jpg" },
    { id: 18, nome: "Vulcan Feu", preco: 410, imagem: "vulcan.jpg" }
];

/* ===================== ESTADO ===================== */
let carrinho = [];
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
                    <img src="imagens/${p.imagem}" 
                         alt="${p.nome}"
                         onerror="this.src='imagens/logo.png'">
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
}

/* ===================== CARRINHO ===================== */
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    carrinho.push(produto);
    atualizarCarrinho();
    abrirCarrinho();
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
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
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span>${p.nome}</span>
                <div style="display:flex;gap:10px;align-items:center;">
                    <strong>R$ ${p.preco}</strong>
                    <button onclick="removerCarrinho(${i})"
                        style="border:none;background:none;color:red;font-weight:700;cursor:pointer;">
                        ✕
                    </button>
                </div>
            </div>
        `;
    });

    totalEl.innerText = total.toFixed(2);
    countEl.innerText = carrinho.length;
}

/* ===================== CARRINHO ABRIR / FECHAR ===================== */
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

/* ===================== FINALIZAR ===================== */
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "Pagamento_conclusão.html";
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
});




