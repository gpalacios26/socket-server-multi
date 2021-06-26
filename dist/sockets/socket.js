"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = exports.mapaSockets = exports.mapa = exports.googleMapsSockets = void 0;
var usuarios_lista_1 = require("../classes/usuarios-lista");
var usuario_1 = require("../classes/usuario");
var mapa_1 = require("../classes/mapa");
var router_1 = require("../routes/router");
var googleMapsSockets = function (cliente) {
    cliente.on('marcador-nuevo2', function (marcador) {
        router_1.mapa2.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo2', marcador);
    });
    cliente.on('marcador-borrar2', function (id) {
        router_1.mapa2.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar2', id);
    });
    cliente.on('marcador-mover2', function (marcador) {
        router_1.mapa2.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover2', marcador);
    });
};
exports.googleMapsSockets = googleMapsSockets;
exports.mapa = new mapa_1.Mapa();
var mapaSockets = function (cliente, io) {
    cliente.on('marcador-nuevo', function (marcador) {
        exports.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', function (id) {
        exports.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', function (marcador) {
        exports.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.mapaSockets = mapaSockets;
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
var conectarCliente = function (cliente, io) {
    console.log('Cliente conectado');
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
var desconectar = function (cliente, io) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
var configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: "Usuario " + payload.nombre + ", configurado"
        });
    });
};
exports.configurarUsuario = configurarUsuario;
var obtenerUsuarios = function (cliente, io) {
    cliente.on('obtener-usuarios', function () {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
