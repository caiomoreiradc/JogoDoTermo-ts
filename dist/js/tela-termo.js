import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { Termo } from "./termo.js";
class TelaTermo {
    get linhaAtual() {
        return this.linhas[this.jogo.obterQuantidadeTentativas()];
    }
    constructor() {
        this.jogo = new Termo();
        this.linhas = [];
        this.botoesClicados = [];
        this.indiceAtual = 0;
        this.registrarElementos();
        this.registrarEventos();
    }
    registrarElementos() {
        this.btnEnter = document.getElementById('btnEnter');
        this.btnApagar = document.getElementById('btnApagar');
        this.pnlConteudo = document.getElementById('pnlConteudo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
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
        this.botoesClicados.push(botao);
        const letra = this.linhaAtual.children[this.indiceAtual];
        letra.textContent = botao.textContent;
        this.indiceAtual++;
    }
    apagarLetra() {
        if (this.indiceAtual <= 0)
            return;
        this.indiceAtual--;
        this.botoesClicados.pop();
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
            const botao = this.botoesClicados[i];
            switch (avaliacoes[i]) {
                case AvaliacaoLetra.PosicaoCorreta:
                    botao.style.backgroundColor = "#7cfc00";
                    break;
                case AvaliacaoLetra.PosicaoIncorreta:
                    botao.style.backgroundColor = "#dba827";
                    break;
                case AvaliacaoLetra.NaoExistente:
                    botao.style.backgroundColor = "#2c2323";
                    break;
            }
        }
    }
    colorirLabels(avaliacoes) {
        for (let i = 0; i < avaliacoes.length; i++) {
            const letraSelecionada = this.linhaAtual.children[i];
            switch (avaliacoes[i]) {
                case AvaliacaoLetra.PosicaoCorreta:
                    letraSelecionada.style.backgroundColor = "#7cfc00";
                    break;
                case AvaliacaoLetra.PosicaoIncorreta:
                    letraSelecionada.style.backgroundColor = "#dba827";
                    break;
                case AvaliacaoLetra.NaoExistente:
                    letraSelecionada.style.backgroundColor = "#2c2323";
                    break;
            }
        }
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map