// Carrega os produtos salvos no localStorage ou, se não houver, carrega os produtos originais do código
let listaProdutos = JSON.parse(localStorage.getItem("cyberforge_produtos"));
if (!listaProdutos) {
    listaProdutos = [...produtos];
    localStorage.setItem("cyberforge_produtos", JSON.stringify(listaProdutos));
}

let carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

document.addEventListener("DOMContentLoaded", function () {
    atualizarContador();

    if (document.getElementById("lista-produtos-loja")) {
        mostrarProdutosLoja(listaProdutos);
    }

    if (document.getElementById("lista-produtos-admin")) {
        mostrarProdutosAdmin(listaProdutos);
    }

    if (document.getElementById("lista-carrinho")) {
        mostrarCarrinho();
    }
});

// Garante que o navegador sempre leia a versão mais recente ao voltar de página
window.addEventListener("pageshow", function () {
    listaProdutos = JSON.parse(localStorage.getItem("cyberforge_produtos")) || [...produtos];
    carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];
    atualizarContador();

    if (document.getElementById("lista-produtos-loja")) {
        mostrarProdutosLoja(listaProdutos);
    }
    if (document.getElementById("lista-produtos-admin")) {
        mostrarProdutosAdmin(listaProdutos);
    }
});

// Salva tudo no localStorage
function salvarDados() {
    localStorage.setItem("cyberforge_produtos", JSON.stringify(listaProdutos));
    localStorage.setItem("cyberforge_carrinho", JSON.stringify(carrinho));
    atualizarContador();
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


// 1. VITRINE DA LOJA (so do cliente)

function mostrarProdutosLoja(lista) {
    const container = document.getElementById("lista-produtos-loja");
    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    let html = "";
    lista.forEach(function (produto) {
        const valorFinal = produto.precoPromocional || produto.preco;

        html += `
            <div class="card">
                <div>
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <span class="categoria-tag">${produto.marca || ""} • ${produto.categoria}</span>
                    <h3>${produto.nome}</h3>
                </div>
                <div>
                    <p class="preco">${formatarMoeda(valorFinal)}</p>
                    <div class="botoes-card">
                        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}


// 2. PAINEL ADMIN (CRUD)

function mostrarProdutosAdmin(lista) {
    const container = document.getElementById("lista-produtos-admin");
    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    let html = "";
    lista.forEach(function (produto) {
        const valorFinal = produto.precoPromocional || produto.preco;

        html += `
            <div class="card">
                <div>
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <span class="categoria-tag">${produto.categoria}</span>
                    <h3>${produto.nome}</h3>
                </div>
                <div>
                    <p class="preco">${formatarMoeda(valorFinal)}</p>
                    <div class="botoes-card">
                        <button class="btn-perigo" onclick="removerProdutoPorId(${produto.id})">Excluir Produto</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("novo-nome").value;
    const marca = document.getElementById("nova-marca").value.toUpperCase();
    const categoria = document.getElementById("nova-categoria").value;
    const preco = parseFloat(document.getElementById("novo-preco").value);
    const imagem = document.getElementById("nova-imagem").value || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80";

    const novoItem = {
        id: Date.now(), // ID único maior (identifica que foi criado pelo Admin)
        nome: nome,
        marca: marca,
        categoria: categoria,
        preco: preco,
        precoPromocional: preco,
        imagem: imagem,
        criadoPeloAdmin: true
    };

    listaProdutos.unshift(novoItem);
    salvarDados();
    mostrarProdutosAdmin(listaProdutos);
    event.target.reset();
    alert("Produto adicionado com sucesso!");
}

// Exclui o produto certo quando o admin apagar um produto, mesmo que a lista esteja filtrada
function removerProdutoPorId(idProduto) {
    const index = listaProdutos.findIndex(item => item.id === idProduto);

    if (index !== -1) {
        const nomeProduto = listaProdutos[index].nome;
        if (confirm(`Deseja excluir "${nomeProduto}" do estoque?`)) {
            listaProdutos.splice(index, 1);
            salvarDados();
            
            // Manter o filtro atual se houver algo digitado na busca do admin
            const campoBusca = document.getElementById("campo-busca");
            if (campoBusca && campoBusca.value.trim() !== "") {
                buscarProdutosAdmin();
            } else {
                mostrarProdutosAdmin(listaProdutos);
            }
        }
    }
}

// Restaura os 35 originais mantendo os produtos que cadastra manualmente
function restaurarPadrao() {
    if (confirm("Deseja restaurar os 35 produtos originais (mantendo os novos que você cadastrou)?")) {
        // Separa apenas os produtos novos criados pelo admin
        const produtosNovos = listaProdutos.filter(item => item.criadoPeloAdmin === true || item.id > 35);
        
        // Junta os novos produtos + os 35 ja no codigo seram restaurados
        listaProdutos = [...produtosNovos, ...produtos];
        salvarDados();
        mostrarProdutosAdmin(listaProdutos);
        alert("Catálogo restaurado com sucesso!");
    }
}

// 3. PESQUISA E ORDENAÇÃO

function buscarProdutos() {
    const termo = document.getElementById("campo-busca").value.toLowerCase();
    const filtrados = listaProdutos.filter(function (item) {
        return item.nome.toLowerCase().includes(termo) || 
               item.categoria.toLowerCase().includes(termo) ||
               (item.marca && item.marca.toLowerCase().includes(termo));
    });
    mostrarProdutosLoja(filtrados);
}

function buscarProdutosAdmin() {
    const termo = document.getElementById("campo-busca").value.toLowerCase();
    const filtrados = listaProdutos.filter(function (item) {
        return item.nome.toLowerCase().includes(termo) || 
               item.categoria.toLowerCase().includes(termo);
    });
    mostrarProdutosAdmin(filtrados);
}

function ordenarPorPreco() {
    listaProdutos.sort(function (a, b) {
        const precoA = a.precoPromocional || a.preco;
        const precoB = b.precoPromocional || b.preco;
        return precoA - precoB;
    });
    mostrarProdutosLoja(listaProdutos);
}

function ordenarAlfabetico() {
    listaProdutos.sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
    });
    mostrarProdutosLoja(listaProdutos);
}

function inverterLista() {
    listaProdutos.reverse();
    mostrarProdutosLoja(listaProdutos);
}

// 4. CARRINHO DE COMPRAS

function adicionarAoCarrinho(idProduto) {
    const produto = listaProdutos.find(p => p.id === idProduto);
    if (!produto) return;

    const valorFinal = produto.precoPromocional || produto.preco;
    const itemNoCarrinho = carrinho.find(item => item.id === idProduto);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: valorFinal,
            quantidade: 1
        });
    }

    salvarDados();
    alert(`"${produto.nome}" foi adicionado ao carrinho!`);
}

function atualizarContador() {
    const contador = document.getElementById("contador-carrinho");
    if (contador) {
        let total = 0;
        carrinho.forEach(item => total += item.quantidade);
        contador.textContent = total;
    }
}

function mostrarCarrinho() {
    const container = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total-carrinho");
    if (!container) return;

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        if (totalEl) totalEl.textContent = "R$ 0,00";
        return;
    }

    let html = "";
    let valorTotal = 0;

    carrinho.forEach(function (item, index) {
        const subtotal = item.preco * item.quantidade;
        valorTotal += subtotal;

        html += `
            <div class="item-carrinho">
                <div>
                    <h3>${item.nome}</h3>
                    <p>Quantidade: ${item.quantidade} x ${formatarMoeda(item.preco)}</p>
                </div>
                <div>
                    <strong>${formatarMoeda(subtotal)}</strong>
                    <button class="btn-perigo" style="margin-left: 10px;" onclick="removerDoCarrinho(${index})">Remover</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if (totalEl) totalEl.textContent = formatarMoeda(valorTotal);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarDados();
    mostrarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }
    alert("Compra finalizada com sucesso! Obrigado pela preferência.");
    carrinho = [];
    salvarDados();
    mostrarCarrinho();
}