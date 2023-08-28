import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { Termo } from "./termo.js";
class TelaTermo {
    get linhaAtual() {
        return this.linhas[this.jogo.obterQuantidadeTentativas()];
    }
    constructor() {
        this.jogo = new Termo();
        this.linhas = [];
        this.letrasClicadas = [];
        this.indiceAtual = 0;
        this.registrarElementos();
        this.registrarEventos();
    }
    registrarElementos() {
        this.btnEnter = document.getElementById('btnEnter');
        this.btnApagar = document.getElementById('btnApagar');
        this.pnlConteudo = document.getElementById('pnlConteudo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
        this.pnlNotificacao = document.getElementById('pnlNotificacao');
        this.linhas = Array.from(document.querySelectorAll('.linha'));
    }
    registrarEventos() {
        const botoesTeclado = this.pnlTeclado.children;
        for (let botao of botoesTeclado) {
            if (botao.id != 'btnEnter' && botao.id != 'btnApagar')
                botao.addEventListener('click', (sender) => this.digitarLetra(sender));
        }
        this.btnEnter.addEventListener('click', () => this.avaliarLinha());
        this.btnApagar.addEventListener('click', () => this.apagarLetra());
    }
    digitarLetra(sender) {
        if (this.indiceAtual == 5)
            return;
        const botao = sender.target;
        this.letrasClicadas.push(botao);
        const letra = this.linhaAtual.children[this.indiceAtual];
        letra.textContent = botao.textContent;
        this.indiceAtual++;
    }
    apagarLetra() {
        if (this.indiceAtual <= 0)
            return;
        this.indiceAtual--;
        this.letrasClicadas.pop();
        const letra = this.linhaAtual.children[this.indiceAtual];
        letra.textContent = '';
    }
    avaliarLinha() {
        if (this.indiceAtual != 5)
            return;
        // gerado pelo grid
        const palavraObtida = this.obterPalavraLinha();
        const avaliacoes = this.jogo.avaliarPalavra(palavraObtida);
        this.colorirLabels(avaliacoes);
        this.colorirBotoes(avaliacoes);
        this.jogo.registrarTentativa();
        this.indiceAtual = 0;
        this.letrasClicadas = [];
        const jogadorAcertou = this.jogo.jogadorAcertou(palavraObtida);
        if (jogadorAcertou || this.jogo.jogadorPerdeu()) {
            this.exibirNotificacao(jogadorAcertou);
            this.exibirBotaoReiniciar();
            this.btnEnter.disabled = true;
        }
    }
    reiniciarJogo() {
        this.limparGrid();
        this.limparTeclado();
        this.pnlNotificacao.replaceChildren();
        this.btnEnter.disabled = false;
        this.jogo = new Termo();
    }
    exibirNotificacao(jogadorAcertou) {
        const lblNotificacao = document.createElement('p');
        let mensagemNotificacao = '';
        if (jogadorAcertou) {
            mensagemNotificacao = 'Você acertou a palavra secreta, parabéns!';
            lblNotificacao.classList.add('notificacao-acerto');
        }
        else {
            mensagemNotificacao = 'Você não conseguiu! Tente novamente.';
            lblNotificacao.classList.add('notificacao-erro');
        }
        lblNotificacao.textContent = mensagemNotificacao;
        this.pnlNotificacao.appendChild(lblNotificacao);
    }
    exibirBotaoReiniciar() {
        const btnReiniciar = document.createElement('button');
        btnReiniciar.innerHTML =
            `<span class="material-symbols-outlined">refresh</span>Reiniciar`;
        btnReiniciar.classList.add('btn-reiniciar');
        btnReiniciar.addEventListener('click', () => this.reiniciarJogo());
        this.pnlNotificacao.appendChild(btnReiniciar);
    }
    obterPalavraLinha() {
        var _a;
        const labelsLetra = Array.from(this.linhaAtual.children);
        let palavraObtida = '';
        for (let letra of labelsLetra)
            palavraObtida += (_a = letra.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        return palavraObtida;
    }
    colorirBotoes(avaliacoes) {
        for (let i = 0; i < avaliacoes.length; i++) {
            const botao = this.letrasClicadas[i];
            switch (avaliacoes[i]) {
                case AvaliacaoLetra.PosicaoCorreta:
                    botao.classList.add('letra-posicao-correta');
                    break;
                case AvaliacaoLetra.PosicaoIncorreta:
                    botao.classList.add('letra-posicao-incorreta');
                    break;
                case AvaliacaoLetra.NaoExistente:
                    botao.classList.add('letra-nao-existente');
                    break;
            }
        }
    }
    colorirLabels(avaliacoes) {
        for (let i = 0; i < avaliacoes.length; i++) {
            const letraSelecionada = this.linhaAtual.children[i];
            switch (avaliacoes[i]) {
                case AvaliacaoLetra.PosicaoCorreta:
                    letraSelecionada.classList.add('letra-posicao-correta');
                    break;
                case AvaliacaoLetra.PosicaoIncorreta:
                    letraSelecionada.classList.add('letra-posicao-incorreta');
                    break;
                case AvaliacaoLetra.NaoExistente:
                    letraSelecionada.classList.add('letra-nao-existente');
                    break;
            }
        }
    }
    limparGrid() {
        const classesParaRemover = [
            'letra-posicao-correta',
            'letra-posicao-incorreta',
            'letra-nao-existente'
        ];
        for (let linha of this.linhas) {
            for (let letra of linha.children) {
                letra.textContent = '';
                letra.classList.remove(...classesParaRemover);
            }
        }
    }
    limparTeclado() {
        const classesParaRemover = [
            'letra-posicao-correta',
            'letra-posicao-incorreta',
            'letra-nao-existente'
        ];
        for (let botao of this.pnlTeclado.children) {
            botao.classList.remove(...classesParaRemover);
        }
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map