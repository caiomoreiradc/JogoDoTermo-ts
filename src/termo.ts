export class Termo{
  private palavraSecreta: string;
  private tentativas: number;


  constructor(){

    this.palavraSecreta = 'CAIXA';
    this.tentativas = 0;

    console.log(this.palavraSecreta);
  }

  avaliarPalavra(palavra: string): any {
    return "abcde"
  }

  obterQuantidadeTentativas(): number {

  }
    
}

