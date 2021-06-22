"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapa = void 0;
var Mapa = /** @class */ (function () {
    function Mapa() {
        this.marcadores = {
            '1': {
                id: '1',
                nombre: 'Fernando',
                lng: -75.75512993582937,
                lat: 45.349977429009954,
                color: '#dd8fee'
            },
            '2': {
                id: '2',
                nombre: 'Amy',
                lng: -75.75195645527508,
                lat: 45.351584045823756,
                color: '#790af0'
            },
            '3': {
                id: '3',
                nombre: 'Orlando',
                lng: -75.75900589557777,
                lat: 45.34794635758547,
                color: '#19884b'
            }
        };
    }
    Mapa.prototype.getMarcadores = function () {
        return this.marcadores;
    };
    Mapa.prototype.agregarMarcador = function (marcador) {
        this.marcadores[marcador.id] = marcador;
    };
    Mapa.prototype.borrarMarcador = function (id) {
        delete this.marcadores[id];
        return this.getMarcadores();
    };
    Mapa.prototype.moverMarcador = function (marcador) {
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    };
    return Mapa;
}());
exports.Mapa = Mapa;
