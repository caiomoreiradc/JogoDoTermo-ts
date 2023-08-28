import { AvaliacaoLetra } from "./avaliacao-letra.js";

export class Termo {
  private palavraSecreta: string;
  private tentativas: number;

  constructor() {
    this.palavraSecreta = 'CAIXA';
    this.tentativas = 0;

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
  
  jogadorAcertou(palavra: string): boolean {
    const jogadorAcertou: boolean = palavra == this.palavraSecreta;

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

