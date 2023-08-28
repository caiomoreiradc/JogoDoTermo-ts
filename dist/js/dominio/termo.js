import { AvaliacaoLetra } from "../avaliacao-letra.js";
export class Termo {
    get historico() {
        return this._historico;
    }
    constructor(historico) {
        this.palavraSecreta = 'CAIXA';
        this.tentativas = 0;
        this._historico = historico;
        console.log(this.palavraSecreta);
    }
    avaliarPalavra(palavra) {
        const avaliacoes = new Array(palavra.length);
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
    jogadorAcertou(palavra) {
        const jogadorAcertou = palavra == this.palavraSecreta;
        if (jogadorAcertou)
            this.registrarVitoria();
        else if (this.jogadorPerdeu())
            this.registrarDerrota();
        return jogadorAcertou;
    }
    jogadorPerdeu() {
        return this.tentativas >= 5;
    }
    obterQuantidadeTentativas() {
        return this.tentativas;
    }
    obterPalavraAleatoria() {
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
        const indiceAletorio = Math.floor(Math.random() * palavras.length);
        return palavras[indiceAletorio];
    }
}
// type AvaliacaoLetra = 'PosicaoCorreta' | 'PosicaoIncorreta' | 'NaoExistente';
// const obj: AvaliacaoLetra = 'PosicaoIncorreta';
//# sourceMappingURL=termo.js.map