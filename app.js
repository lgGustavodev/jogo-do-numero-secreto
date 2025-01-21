// const title = document.querySelector(".title");
// title.innerHTML = "Jogo do Numero Secreto";

// const paragrafo = document.querySelector(".texto__paragrafo");
// paragrafo.innerHTML = "Escolha um numero entre 1 e 10";
let listaDeNumeroSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirtextoNaTela(tag, texto) {
    let compo = document.querySelector(tag);
    compo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.1 });
}

function mensageminicial() {
    exibirtextoNaTela("h1", "Jogo do Numero Secreto");
    exibirtextoNaTela("p", "Escolha um numero entre 1 e 10");
}
mensageminicial();

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirtextoNaTela("h1", "Acertou!");

        let paralavratentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentavias = `Voce Descobriu o numero secreto com ${tentativas} ${paralavratentativa}`;

        exibirtextoNaTela("p", mensagemTentavias);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirtextoNaTela("p", "Numero secreto é menor");
        } else {
            exibirtextoNaTela("p", "Numero secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == 3) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);

        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensageminicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
