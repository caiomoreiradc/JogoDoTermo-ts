import { Termo } from "./termo.js";
class TelaTermo {
    get linhaAtual() {
        return this.linhas[0];
    }
    constructor() {
        this.jogo = new Termo();
        this.linhas = [];
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
        this.btnApagar.addEventListener('click', () => this.apagarLetra());
    }
    digitarLetra(sender) {
        if (this.indiceAtual == 5)
            return;
        const botao = sender.target;
        const letra = this.linhaAtual.children[this.indiceAtual];
        letra.textContent = botao.textContent;
        this.indiceAtual++;
    }
    apagarLetra() {
        if (this.indiceAtual <= 0)
            return;
        this.indiceAtual--;
        const letra = this.linhaAtual.children[this.indiceAtual];
        letra.textContent = '';
    }
}
window.addEventListener('load', () => new TelaTermo());
//# sourceMappingURL=tela-termo.js.map