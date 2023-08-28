import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { Termo } from "./termo.js";

class TelaTermo {
  pnlConteudo: HTMLDivElement;
  pnlTeclado: HTMLDivElement;

  btnEnter: HTMLButtonElement;
  btnApagar: HTMLButtonElement;

  linhas: HTMLDivElement[];
  botoesClicados: HTMLButtonElement[];

  get linhaAtual(): HTMLDivElement {
    return this.linhas[this.jogo.obterQuantidadeTentativas()];
  }

  private jogo: Termo;
  private indiceAtual: number;

  constructor() {
    this.jogo = new Termo();
    this.linhas = [];
    this.botoesClicados = [];
    this.indiceAtual = 0;

    this.registrarElementos();
    this.registrarEventos();
  }

  registrarElementos() {
    this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
    this.btnApagar = document.getElementById('btnApagar') as HTMLButtonElement;

    this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
    this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement;

    this.linhas = Array.from(document.querySelectorAll('.linha'));
  }

  registrarEventos() {
    const botoesTeclado = this.pnlTeclado.children;

    for (let botao of botoesTeclado) {
      if (botao.id != 'btnEnter' && botao.id != 'btnApagar')
        botao.addEventListener('click', (sender: Event) => this.digitarLetra(sender))
    }

    this.btnEnter.addEventListener('click', () => this.avaliarLinha());
    this.btnApagar.addEventListener('click', () => this.apagarLetra());
  }

  digitarLetra(sender: Event) {
    if (this.indiceAtual == 5) return;

    const botao = sender.target as HTMLButtonElement;

    this.botoesClicados.push(botao);

    const letra = this.linhaAtual.children[this.indiceAtual];
    letra.textContent = botao.textContent;

    this.indiceAtual++;
  }

  apagarLetra() {
    if (this.indiceAtual <= 0) return;

    this.indiceAtual--;

    this.botoesClicados.pop();

    const letra = this.linhaAtual.children[this.indiceAtual];
    letra.textContent = '';
  }

  avaliarLinha(): void {
    if (this.indiceAtual != 5) return;

    // gerado pelo grid
    const palavraObtida: string = this.obterPalavraLinha();

    const avaliacoes: AvaliacaoLetra[] = this.jogo.avaliarPalavra(palavraObtida);

    this.colorirLabels(avaliacoes);
    this.colorirBotoes(avaliacoes);

    this.jogo.registrarTentativa();

    this.indiceAtual = 0;
  }

  obterPalavraLinha(): string {
    const labelsLetra = Array.from(this.linhaAtual.children);

    let palavraObtida = '';

    for (let letra of labelsLetra)
      palavraObtida += letra.textContent?.trim();

    return palavraObtida;
  }

  private colorirBotoes(avaliacoes: AvaliacaoLetra[]) {
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

  private colorirLabels(avaliacoes: AvaliacaoLetra[]) {
    for (let i = 0; i < avaliacoes.length; i++) {
      const letraSelecionada = this.linhaAtual.children[i] as HTMLDivElement;

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