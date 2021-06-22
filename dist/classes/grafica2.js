"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafica2Data = void 0;
var Grafica2Data = /** @class */ (function () {
    function Grafica2Data() {
        this.preguntas = ['p1', 'p2', 'p3', 'p4'];
        this.valores = [0, 0, 0, 0];
    }
    Grafica2Data.prototype.getDataGrafica2 = function () {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    };
    Grafica2Data.prototype.incrementarValor2 = function (pregunta, valor) {
        pregunta = pregunta.toLowerCase().trim();
        for (var i in this.preguntas) {
            if (this.preguntas[i] === pregunta) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica2();
    };
    return Grafica2Data;
}());
exports.Grafica2Data = Grafica2Data;
