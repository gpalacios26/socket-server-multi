"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapa2 = void 0;
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var socket_1 = require("../sockets/socket");
var grafica_1 = require("../classes/grafica");
var grafica2_1 = require("../classes/grafica2");
var mapa2_1 = require("../classes/mapa2");
var router = express_1.Router();
/* Mapa Google */
exports.mapa2 = new mapa2_1.Mapa2();
var lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];
(_a = exports.mapa2.marcadores).push.apply(_a, lugares);
router.get('/mapa2', function (req, res) {
    res.json(exports.mapa2.getMarcadores());
});
/* Mapa Mapbox */
router.get('/mapa', function (req, res) {
    res.json(socket_1.mapa.getMarcadores());
});
/* Gráfica 1 */
var grafica = new grafica_1.GraficaData();
router.get('/grafica', function (req, res) {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', function (req, res) {
    var mes = req.body.mes;
    var unidades = Number(req.body.unidades);
    grafica.incrementarValor(mes, unidades);
    var server = server_1.default.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
/* Gráfica 2 */
var grafica2 = new grafica2_1.Grafica2Data();
router.get('/grafica2', function (req, res) {
    res.json(grafica2.getDataGrafica2());
});
router.post('/grafica2', function (req, res) {
    var pregunta = req.body.pregunta;
    var unidades = Number(req.body.unidades);
    grafica2.incrementarValor2(pregunta, unidades);
    var server = server_1.default.instance;
    server.io.emit('cambio-grafica2', grafica2.getDataGrafica2());
    res.json(grafica2.getDataGrafica2());
});
/* Simple Chat */
router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var payload = { cuerpo: cuerpo, de: de };
    var server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });
});
router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    var payload = { de: de, cuerpo: cuerpo };
    var server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
router.get('/usuarios', function (req, res) {
    var server = server_1.default.instance;
    server.io.clients(function (err, clientes) {
        if (err) {
            return res.json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            clientes: clientes
        });
    });
});
router.get('/usuarios/detalle', function (req, res) {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
exports.default = router;
