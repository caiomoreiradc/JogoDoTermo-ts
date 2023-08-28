import { AvaliacaoLetra } from "../avaliacao-letra.js";
import { HistoricoUsuario } from "./historico-usuario.js";

export class Termo {
  private palavraSecreta: string;
  private tentativas: number;

  private _historico: HistoricoUsuario;

  get historico(): HistoricoUsuario {
    return this._historico;
  }

  constructor(historico: HistoricoUsuario) {
    this.palavraSecreta = 'CAIXA';
    this.tentativas = 0;
    this._historico = historico;

    console.log(this.palavraSecreta);
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

  registrarTentativa() {
    this.tentativas++;
  }

  registrarVitoria() {
    this._historico.jogos++;
    this._historico.vitorias++;
    this._historico.sequencia++;

    this._historico.tentativas[this.tentativas - 1]++;
  }

  registrarDerrota() {
    this._historico.jogos++;
    this._historico.derrotas++;
    this._historico.sequencia = 0;
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
    return this.tentativas >= 5;
  }

  obterQuantidadeTentativas(): number {
    return this.tentativas;
  }

  private obterPalavraAleatoria(): string {
    const palavras = [
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

// type AvaliacaoLetra = 'PosicaoCorreta' | 'PosicaoIncorreta' | 'NaoExistente';

// const obj: AvaliacaoLetra = 'PosicaoIncorreta';

