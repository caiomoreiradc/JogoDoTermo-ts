import {Termo} from "./termo.js";

class TelaTermo{
    pnlConteudo: HTMLDivElement;
    pnlTeclado: HTMLDivElement;

    btnEnter: HTMLButtonElement;
    btnApagar: HTMLButtonElement

    linhas: HTMLDivElement[];

    get linhaAtual(): HTMLDivElement{
      return this.linhas[0]
    }


    private jogo: Termo;
    private indiceAtual: number;

    constructor(){
      this.jogo = new Termo();
      this.linhas = [];
      this.indiceAtual = 0;

      this.registrarElementos();
      this.registrarEventos();
    }

    registrarElementos(){
      this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
      this.btnApagar = document.getElementById('btnApagar') as HTMLButtonElement;

      this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLDivElement;
      this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLDivElement;
    
      this.linhas = Array.from(document.querySelectorAll('.linha'));
    }

    registrarEventos(){
      const botoesTeclado = this.pnlTeclado.children;

      for(let botao of botoesTeclado){
        if (botao.id != 'btnEnter' && botao.id != 'btnApagar')
          botao.addEventListener('click', (sender) => this.digitarLetra(sender))
      }

      this.btnApagar.addEventListener('click', () => this.apagarLetra());
    }

    digitarLetra(sender: Event){
      if(this.indiceAtual == 5) return;
      
      const botao =  sender.target as HTMLButtonElement;

      const letra = this.linhaAtual.children[this.indiceAtual];
      letra.textContent = botao.textContent;

      this.indiceAtual++;
    }


    apagarLetra(){
      if(this.indiceAtual<= 0 ) return;
      this.indiceAtual--;

      const letra = this.linhaAtual.children[this.indiceAtual];
      letra.textContent = '';
    }
}



window.addEventListener('load', () => new TelaTermo());