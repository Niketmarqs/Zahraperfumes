const produtos = [
    { id: 1, nome: "Khanjar", preco: 450, cat: "M", imagem: "Khanjar.png" },
    { id: 2, nome: "A Confissão Dela", preco: 320, cat: "F", imagem: "A Confissão Dela.jfif" },
    { id: 3, nome: "Attar Al Wesal Al Wataniah", preco: 260, cat: "M", imagem: "Attar Al Wesal Al Wataniah.jpeg" },
    { id: 4, nome: "Lattafa Yara Rosa", preco: 260, cat: "F", imagem: "Lattafa Yara Rosa.jfif" },
    { id: 5, nome: "Lattafa Asad Preto Elixir", preco: 360, cat: "M", imagem: "LattafaAsadPretoElixir.jpg" },
    { id: 6, nome: "Lattafa Asad Azul", preco: 270, cat: "M", imagem: "Lattafa Asad Azul.jpeg" },
    { id: 7, nome: "Troféu dos Vencedores", preco: 370, cat: "M", imagem: "Troféu dos Vencedores.jfif" },
    { id: 8, nome: "Asad Preto Normal", preco: 260, cat: "M", imagem: "Asad Preto Normal.jpeg" },
    { id: 9, nome: "Sabah Al Ward Al Wataniah", preco: 250, cat: "F", imagem: "Sabah Al Ward Al Wataniah.jfif" },
    { id: 10, nome: "Clube de Noite Intensa", preco: 350, cat: "M", imagem: "Clube de Noite Intensa.jfif" },
    { id: 11, nome: "Lattafa Fakhar Rose", preco: 290, cat: "F", imagem: "Lattafa Fakhar Rose.png" },
    { id: 12, nome: "Asad Bourbon", preco: 300, cat: "M", imagem: "Asad Bourbon.jpeg" },
    { id: 13, nome: "Lattafa Dourado", preco: 265, cat: "M", imagem: "Lattafa Dourado.jfif" },
    { id: 14, nome: "Sua Confissão", preco: 350, cat: "M", imagem: "Sua Confissão.jfif" },
    { id: 15, nome: "O Reino", preco: 350, cat: "M", imagem: "O Reino.jfif" },
    { id: 16, nome: "Al Dana", preco: 400, cat: "M", imagem: "Al Dana.jpeg" },
    { id: 17, nome: "Manaal", preco: 330, cat: "M", imagem: "Manaal.jpg" },
    { id: 18, nome: "Vulcan Feu", preco: 410, cat: "M", imagem: "VulcanFeu.jfif" }
];
let carrinho = [];


// ================= PRODUTOS NA TELA =================
function carregarProdutos() {
    const lista = document.getElementById('lista-produtos');
    if (!lista) return;

    lista.innerHTML = "";

    produtos.forEach(p => {
        lista.innerHTML += `
            <div class="produto-card">
                <div class="img-box">
                    <img src="imagens/${p.imagem}" alt="${p.nome}" onerror="this.src='logopaulo.png'">
                </div>
                <div class="info">
                    <h3>${p.nome}</h3>
                    <span class="preco">R$ ${p.preco},00</span>
                    <button class="btn-add" onclick="add(${p.id})">COMPRAR</button>
                </div>
            </div>
        `;
    });
}


// ================= ADICIONAR AO CARRINHO =================
function add(id) {
    const p = produtos.find(x => x.id === id);
    if (p) {
        carrinho.push(p);
        atualizar();
        toggleCart();
    }
}


// ================= ATUALIZA CARRINHO =================
function atualizar() {
    const itens = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    let total = 0;

    if (itens) {
        itens.innerHTML = "";
        carrinho.forEach((p, i) => {
            total += p.preco;
            itens.innerHTML += `
                <div style="padding:10px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center;color:#000;">
                    <span style="font-size:12px;">${p.nome}</span>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <strong style="font-size:14px;">R$ ${p.preco}</strong>
                        <button onclick="remover(${i})" style="color:red;border:none;background:none;cursor:pointer;font-weight:bold;">X</button>
                    </div>
                </div>`;
        });
    }

    if (totalEl) totalEl.innerText = total.toFixed(2);
    if (countEl) countEl.innerText = carrinho.length;
}


// ================= REMOVER ITEM =================
function remover(i) {
    carrinho.splice(i, 1);
    atualizar();
}


// ================= ABRIR/FECHAR CARRINHO =================
function toggleCart() {
    const sidebar = document.getElementById('sidebar-cart');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}


// ================= IR PARA PAGAMENTO =================
function irParaPagamento() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce((a, b) => a + b.preco, 0);
    let resumo = "Olá! Gostaria de encomendar:\n\n";
    carrinho.forEach(p => resumo += `• ${p.nome} (R$ ${p.preco})\n`);

    localStorage.setItem('resumoPedido', resumo);
    localStorage.setItem('totalPedido', total.toFixed(2));

    window.location.href = "pagamento.html";
}


// BOTÃO DO HTML CHAMA ESSE NOME
function finalizarCompra() {
    irParaPagamento();
}


// ================= INICIALIZAÇÃO =================
document.addEventListener("DOMContentLoaded", carregarProdutos);


// DEIXAR FUNÇÕES GLOBAIS
window.add = add;
window.remover = remover;
window.toggleCart = toggleCart;
window.finalizarCompra = finalizarCompra;



