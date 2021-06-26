"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapa2 = void 0;
var Mapa2 = /** @class */ (function () {
    function Mapa2() {
        this.marcadores = [];
    }
    Mapa2.prototype.getMarcadores = function () {
        return this.marcadores;
    };
    Mapa2.prototype.agregarMarcador = function (marcador) {
        this.marcadores.push(marcador);
    };
    Mapa2.prototype.borrarMarcador = function (id) {
        this.marcadores = this.marcadores.filter(function (mark) { return mark.id !== id; });
        return this.marcadores;
    };
    Mapa2.prototype.moverMarcador = function (marcador) {
        for (var i in this.marcadores) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    };
    return Mapa2;
}());
exports.Mapa2 = Mapa2;
