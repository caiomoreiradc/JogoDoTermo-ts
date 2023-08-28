import { AvaliacaoLetra } from "./avaliacao-letra.js";
import { HistoricoUsuario } from "./historico-usuario.js";

export class Termo {
  private palavraSecreta: string;
  
  private _historico: HistoricoUsuario;
  private _tentativas: number;

  get historico(): HistoricoUsuario {
    return this._historico;
  }

  set historico(novo: HistoricoUsuario) {
    this._historico = novo;
  }

  get tentativas(): number {
    return this._tentativas;
  }

  constructor(historico: HistoricoUsuario) {
    this.palavraSecreta = this.obterPalavraAleatoria();

    this._tentativas = 0;
    this._historico = historico;
  }

  avaliarPalavra(palavra: string): AvaliacaoLetra[] {
    const avaliacoes: AvaliacaoLetra[] = new Array(palavra.length);

    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] == this.palavraSecreta[i])
        avaliacoes[i] = AvaliacaoLetra.PosicaoCorreta;

      else if (this.palavraSecreta.includes(palavra[i]))
        avaliacoes[i] = AvaliacaoLetra.PosicaoIncorreta;
        
      else
        avaliacoes[i] = AvaliacaoLetra.NaoExistente;
    }

    return avaliacoes;
  }
  
  jogadorAcertou(palavra: string): boolean {
    const jogadorAcertou: boolean = palavra == this.palavraSecreta;

    if (jogadorAcertou)
      this.registrarVitoria();

    else if (this.jogadorPerdeu())
      this.registrarDerrota();
    
    return jogadorAcertou;
  }

  jogadorPerdeu(): boolean {
    return this._tentativas >= 5;
  }

  registrarTentativa(): void {
    this._tentativas++;
  }

  private registrarVitoria(): void {
    this._historico.jogos++;
    this._historico.vitorias++;
    this._historico.sequencia++;

    this._historico.tentativas[this._tentativas - 1]++;
  }

  private registrarDerrota(): void {
    this._historico.jogos++;
    this._historico.derrotas++;
    this._historico.sequencia = 0;
  }

  private obterPalavraAleatoria(): string {
    const palavras: string[] = [
      'ABRIR',
      'AMIGO',
      'BEBER',
      'BOLDO',
      'CAIXA',
      'CASAL',
      'CORPO',
      'DEDOS',
      'DENTE',
      'DIZER',
      'ERROS',
      'FALAR',
      'FESTA',
      'FOGAO',
      'GANHO',
      'GIRAR',
      'GRITO',
      'HORAS',
      'JOGOS',
      'JULHO',
      'LIMAO',
      'LOUCO',
      'MACAS',
      'MAIOR',
      'MELAO',
      'MOLHO'
    ];

    const indiceAletorio: number = Math.floor(Math.random() * palavras.length);

    return palavras[indiceAletorio];
  }
}