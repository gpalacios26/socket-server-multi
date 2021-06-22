"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var socket_1 = require("../sockets/socket");
var grafica_1 = require("../classes/grafica");
var grafica2_1 = require("../classes/grafica2");
var router = express_1.Router();
/* Mapa */
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
