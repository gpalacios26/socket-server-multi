export class Grafica2Data {

    private preguntas: string[] = ['p1', 'p2', 'p3', 'p4'];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    getDataGrafica2() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }

    incrementarValor2(pregunta: string, valor: number) {
        pregunta = pregunta.toLowerCase().trim();
        for (let i in this.preguntas) {
            if (this.preguntas[i] === pregunta) {
                this.valores[i] += valor;
            }
        }

        return this.getDataGrafica2();
    }

}