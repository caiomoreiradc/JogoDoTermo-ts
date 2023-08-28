import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { Termo } from "./termo.js";

class TelaTermo {
  pnlConteudo: HTMLDivElement;
  pnlTeclado: HTMLDivElement;
  pnlNotificacao: HTMLDivElement;

  btnEnter: HTMLButtonElement;
  btnApagar: HTMLButtonElement;

  linhas: HTMLDivElement[];
  letrasClicadas: HTMLButtonElement[];

  get linhaAtual(): HTMLDivElement {
    return this.linhas[this.jogo.obterQuantidadeTentativas()];
  }

  private jogo: Termo;
  private indiceAtual: number;

  constructor() {
    this.jogo = new Termo();
    this.linhas = [];
    this.letrasClicadas = [];
    this.indiceAtual = 0;

    this.registrarElementos();
    this.registrarEventos();
  }

  registrarElementos() {
    this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
    this.btnApagar = document.getElementById('btnApagar') as HTMLButtonElement;

    this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
    this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement;
    this.pnlNotificacao = document.getElementById('pnlNotificacao') as HTMLDivElement;

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

    this.letrasClicadas.push(botao);

    const letra = this.linhaAtual.children[this.indiceAtual];
    letra.textContent = botao.textContent;

    this.indiceAtual++;
  }

  apagarLetra() {
    if (this.indiceAtual <= 0) return;

    this.indiceAtual--;

    this.letrasClicadas.pop();

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

    this.letrasClicadas = [];

    const jogadorAcertou: boolean = this.jogo.jogadorAcertou(palavraObtida);

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

  exibirNotificacao(jogadorAcertou: boolean) {
    const lblNotificacao: HTMLParagraphElement =
      document.createElement('p');

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

  exibirBotaoReiniciar(): void {
    const btnReiniciar: HTMLButtonElement = document.createElement('button');
    
    btnReiniciar.innerHTML =
      `<span class="material-symbols-outlined">refresh</span>Reiniciar`;

    btnReiniciar.classList.add('btn-reiniciar');

    btnReiniciar.addEventListener('click', () => this.reiniciarJogo());

    this.pnlNotificacao.appendChild(btnReiniciar);
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

  private colorirLabels(avaliacoes: AvaliacaoLetra[]) {
    for (let i = 0; i < avaliacoes.length; i++) {
      const letraSelecionada = this.linhaAtual.children[i] as HTMLDivElement;

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

  limparGrid(): void {
    const classesParaRemover: string[] = [
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

  limparTeclado(): void {
    const classesParaRemover: string[] = [
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