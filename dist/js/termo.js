import { AvaliacaoLetra } from "./avaliacao-letra.js";
export class Termo {
    constructor() {
        this.palavraSecreta = 'CAIXA';
        this.tentativas = 0;
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
    jogadorAcertou(palavra) {
        const jogadorAcertou = palavra == this.palavraSecreta;
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