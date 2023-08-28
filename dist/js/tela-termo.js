import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { LocalStorageService } from "./services/local-storage.service.js";
import { Termo } from "./dominio/termo.js";
class TelaTermo {
    get linhaAtual() {
        return this.linhas[this.jogo.obterQuantidadeTentativas()];
    }
    constructor() {
        this.localStorageService = new LocalStorageService();
        this.jogo = new Termo(this.localStorageService.carregarDados());
        this.linhas = [];
        this.letrasClicadas = [];
        this.indiceAtual = 0;
        this.registrarElementos();
        this.registrarEventos();
        this.popularEstatisticas();
        this.desenharGridTentativas();
    }
    registrarElementos() {
        this.btnEnter = document.getElementById('btnEnter');
        this.btnApagar = document.getElementById('btnApagar');
        this.btnExibirHistorico = document.getElementById('btnExibirHistorico');
        this.pnlConteudo = document.getElementById('pnlConteudo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
        this.pnlNotificacao = document.getElementById('pnlNotificacao');
        this.pnlHistorico = document.getElementById('pnlHistorico');
        this.linhas = Array.from(document.querySelectorAll('.linha'));
    }
    registrarEventos() {
        const botoesTeclado = this.pnlTeclado.children;
        this.btnExibirHistorico.addEventListener('click', () => {
            this.pnlHistorico.style.display = 'grid';
        });
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (!this.pnlHistorico.contains(target) && event.target !== this.btnExibirHistorico)
                this.pnlHistorico.style.display = 'none';
        });
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
            this.localStorageService.salvarDados(this.jogo.historico);
        }
    }
    reiniciarJogo() {
        this.limparGrid();
        this.limparTeclado();
        this.pnlNotificacao.replaceChildren();
        this.btnEnter.disabled = false;
        this.jogo = new Termo(this.localStorageService.carregarDados());
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
    popularEstatisticas() {
        const lblJogos = document.getElementById('lblJogos');
        const lblVitorias = document.getElementById('lblVitorias');
        const lblDerrotas = document.getElementById('lblDerrotas');
        const lblSequencia = document.getElementById('lblSequencia');
        lblJogos.textContent = this.jogo.historico.jogos.toString();
        lblVitorias.textContent = this.jogo.historico.vitorias.toString();
        lblDerrotas.textContent = this.jogo.historico.derrotas.toString();
        lblSequencia.textContent = this.jogo.historico.sequencia.toString();
    }
    desenharGridTentativas() {
        const elementos = Array.from(document.querySelectorAll('.valor-tentativa'));
        const tentativas = this.jogo.historico.tentativas;
        for (let i = 0; i < tentativas.length; i++) {
            const label = elementos[i];
            const qtdTentativas = tentativas[i];
            label.style.width = `${qtdTentativas * 10}%`;
            label.textContent = qtdTentativas.toString();
            if (parseInt(label.style.width) < 5)
                label.style.width = '5%';
            if (parseInt(label.style.width) > 100)
                label.style.width = '100%';
        }
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map