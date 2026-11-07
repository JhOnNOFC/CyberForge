let valorFreteCalculado = 0;
let percentualDescontoCupom = 0;

document.addEventListener("DOMContentLoaded", function () {
    renderizarCarrinho();
    atualizarContadorCarrinho();
    definirAnoRodape();
});

// Formata moedas em R$
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Renderiza a lista de itens do carrinho do localStorage
function renderizarCarrinho() {
    const container = document.getElementById("container-itens-carrinho");
    const carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

    if (!container) return;

    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="carrinho-vazio">
                <p>Seu carrinho está vazio.</p>
                <a href="index.html#produtos" class="botao botao-roxo">Explorar produtos</a>
            </div>
        `;
        atualizarTotais(0);
        return;
    }

    let html = "";
    let subtotalGeral = 0;

    carrinho.forEach(function (item, index) {
        const totalItem = item.preco * item.quantidade;
        subtotalGeral += totalItem;

        html += `
            <div class="card-item-carrinho">
                <div class="info-item-esquerda">
                    <img src="${item.imagem}" alt="${item.nome}" class="imagem-item-carrinho">
                    <div class="detalhes-produto-carrinho">
                        <h3>${item.nome}</h3>
                        <span class="preco-unitario">${formatarMoeda(item.preco)} / unidade</span>
                        <div class="controles-quantidade">
                            <button type="button" class="btn-qtd" onclick="alterarQuantidade(${index}, -1)">-</button>
                            <span class="qtd-valor">${item.quantidade}</span>
                            <button type="button" class="btn-qtd" onclick="alterarQuantidade(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
                <div class="info-item-direita">
                    <button type="button" class="btn-remover" onclick="removerItemCarrinho(${index})">Remover</button>
                    <strong class="subtotal-item">${formatarMoeda(totalItem)}</strong>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    atualizarTotais(subtotalGeral);
}

// Altera quantidade no array e salva no localStorage
function alterarQuantidade(index, mudanca) {
    let carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

    if (carrinho[index]) {
        carrinho[index].quantidade += mudanca;

        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }

        localStorage.setItem("cyberforge_carrinho", JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarContadorCarrinho();
    }
}

// Remove item do array com confirm() (padrão ensinado pelo seu professor)
function removerItemCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

    if (carrinho[index]) {
        const nomeItem = carrinho[index].nome;
        if (confirm(`Deseja remover "${nomeItem}" do carrinho?`)) {
            carrinho.splice(index, 1);
            localStorage.setItem("cyberforge_carrinho", JSON.stringify(carrinho));
            renderizarCarrinho();
            atualizarContadorCarrinho();
            exibirNotificacao(`${nomeItem} removido do carrinho.`);
        }
    }
}

// Aplicação de cupom de desconto
function aplicarCupom() {
    const inputCupom = document.getElementById("input-cupom");
    const codigo = inputCupom.value.trim().toUpperCase();

    if (codigo === "CYBER10") {
        percentualDescontoCupom = 0.10;
        exibirNotificacao("Cupom CYBER10 aplicado com sucesso! (10% OFF)");
    } else if (codigo === "") {
        percentualDescontoCupom = 0;
        exibirNotificacao("Informe um cupom de desconto.");
    } else {
        percentualDescontoCupom = 0;
        exibirNotificacao("Cupom inválido.");
    }

    renderizarCarrinho();
}

// Cálculo simulado de frete
function calcularFrete() {
    const inputCep = document.getElementById("input-cep");
    const cep = inputCep.value.replace(/\D/g, "");

    if (cep.length === 8) {
        const carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];
        let subtotal = 0;
        carrinho.forEach(item => subtotal += item.preco * item.quantidade);

        if (subtotal >= 1000) {
            valorFreteCalculado = 0;
            exibirNotificacao("Parabéns! Você ganhou Frete Grátis.");
        } else {
            valorFreteCalculado = 29.90;
            exibirNotificacao("Frete calculado: R$ 29,90");
        }
    } else {
        exibirNotificacao("Digite um CEP válido com 8 dígitos.");
    }

    renderizarCarrinho();
}

// Sincroniza subtotal, frete, desconto e total final
function atualizarTotais(subtotal) {
    const elSubtotal = document.getElementById("valor-subtotal");
    const elFrete = document.getElementById("valor-frete");
    const elTotal = document.getElementById("valor-total");
    const elLinhaDesconto = document.getElementById("linha-desconto");
    const elValorDesconto = document.getElementById("valor-desconto");

    const valorDesconto = subtotal * percentualDescontoCupom;
    const totalGeral = Math.max(0, subtotal - valorDesconto + valorFreteCalculado);

    if (elSubtotal) elSubtotal.textContent = formatarMoeda(subtotal);

    if (elFrete) {
        if (valorFreteCalculado === 0 && subtotal >= 1000) {
            elFrete.textContent = "Grátis";
        } else if (valorFreteCalculado > 0) {
            elFrete.textContent = formatarMoeda(valorFreteCalculado);
        } else {
            elFrete.textContent = "Informe o CEP";
        }
    }

    if (elLinhaDesconto && elValorDesconto) {
        if (valorDesconto > 0) {
            elLinhaDesconto.style.display = "flex";
            elValorDesconto.textContent = `- ${formatarMoeda(valorDesconto)}`;
        } else {
            elLinhaDesconto.style.display = "none";
        }
    }

    if (elTotal) elTotal.textContent = formatarMoeda(totalGeral);
}

// Atualiza o contador de itens no cabeçalho
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

// Mensagem flutuante (Toast)
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

// Finaliza a compra e limpa o localStorage
function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem("cyberforge_carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    if (confirm("Deseja confirmar e finalizar a sua compra simulada?")) {
        localStorage.removeItem("cyberforge_carrinho");
        alert("Compra realizada com sucesso! Obrigado por comprar na CyberForge Hardware.");
        window.location.href = "index.html";
    }
}