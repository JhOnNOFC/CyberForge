// Executa o carregamento inicial quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
    renderizarCategorias();
    renderizarProdutos(produtos);
    renderizarOfertas();
    atualizarContadorCarrinho();
    definirAnoRodape();

    // Filtro em tempo real na busca
    const campoBusca = document.getElementById("campo-busca");
    if (campoBusca) {
        campoBusca.addEventListener("input", function () {
            const termo = campoBusca.value.toLowerCase().trim();

            const resultado = produtos.filter(function (produto) {
                return produto.nome.toLowerCase().includes(termo) ||
                       produto.marca.toLowerCase().includes(termo) ||
                       produto.categoria.toLowerCase().includes(termo);
            });

            renderizarProdutos(resultado);
        });
    }
});

// Formata valores numéricos para a moeda brasileira (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Renderiza os cards de categorias
function renderizarCategorias() {
    const container = document.getElementById("lista-categorias");
    if (!container) return;

    let html = "";
    categorias.forEach(function (categoria) {
        html += `
            <a href="#produtos" class="card-categoria">
                <img src="${categoria.imagem}" alt="${categoria.nome}">
                <h3>${categoria.nome}</h3>
            </a>
        `;
    });
    container.innerHTML = html;
}

// Renderiza a lista principal de produtos no catálogo
function renderizarProdutos(lista) {
    const container = document.getElementById("lista-produtos");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    if (!container) return;

    let html = "";

    lista.forEach(function (produto) {
        const percentualDesconto = calcularDesconto(produto.preco, produto.precoPromocional);

        html += `
            <article class="card-produto">
                <div class="produto-imagem">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    ${percentualDesconto > 0 ? `<span class="desconto">-${percentualDesconto}%</span>` : ""}
                </div>

                <div class="produto-info">
                    <div class="produto-detalhe">
                        <strong>${produto.marca}</strong>
                        <span>${produto.categoria}</span>
                    </div>

                    <h3>${produto.nome}</h3>

                    <span class="preco-antigo">${formatarMoeda(produto.preco)}</span>
                    <span class="preco-atual">${formatarMoeda(produto.precoPromocional)}</span>
                    <span class="estoque">${produto.estoque} em estoque</span>

                    <button class="botao-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;

    if (mensagemVazia) {
        mensagemVazia.style.display = lista.length === 0 ? "block" : "none";
    }
}

// Calcula o percentual de desconto
function calcularDesconto(precoOriginal, precoComDesconto) {
    if (precoComDesconto >= precoOriginal) {
        return 0;
    }
    return Math.round(((precoOriginal - precoComDesconto) / precoOriginal) * 100);
}

// Renderiza as ofertas da semana
function renderizarOfertas() {
    const container = document.getElementById("lista-ofertas");
    if (!container) return;

    const ofertas = produtos.filter(function (produto) {
        return produto.precoPromocional < produto.preco;
    });

    let html = "";

    ofertas.slice(0, 4).forEach(function (produto) {
        const percentualDesconto = calcularDesconto(produto.preco, produto.precoPromocional);

        html += `
            <article class="card-produto">
                <div class="produto-imagem">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <span class="desconto">-${percentualDesconto}%</span>
                </div>

                <div class="produto-info">
                    <div class="produto-detalhe">
                        <strong>${produto.marca}</strong>
                        <span>${produto.categoria}</span>
                    </div>

                    <h3>${produto.nome}</h3>
                    <span class="preco-antigo">${formatarMoeda(produto.preco)}</span>
                    <span class="preco-atual">${formatarMoeda(produto.precoPromocional)}</span>
                    <span class="estoque">${produto.estoque} em estoque</span>

                    <button class="botao-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </article>
        `;
    });

    container.innerHTML = html;
}

// Adiciona produto ao array do localStorage salvando todos os campos necessários
function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(function (item) {
        return item.id === idProduto;
    });

    if (!produto) return;

    let carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

    const itemExistente = carrinho.find(function (item) {
        return item.id === idProduto;
    });

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            marca: produto.marca,
            preco: produto.precoPromocional,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    localStorage.setItem("cyberforge_carrinho", JSON.stringify(carrinho));

    atualizarContadorCarrinho();
    exibirNotificacao(produto.nome + " foi adicionado ao carrinho!");
}

// Atualiza a contagem dos itens no cabeçalho
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];
    let totalItens = 0;

    carrinho.forEach(function (item) {
        totalItens += item.quantidade;
    });

    const elementoContador = document.getElementById("contador-carrinho");
    if (elementoContador) {
        elementoContador.textContent = totalItens;
    }
}

// Notificação toast na tela
function exibirNotificacao(mensagem) {
    const toast = document.getElementById("aviso-toast");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("visivel");

    setTimeout(function () {
        toast.classList.remove("visivel");
    }, 2500);
}

// Define o ano atual no rodapé
function definirAnoRodape() {
    const elementoAno = document.getElementById("ano-atual");
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
}