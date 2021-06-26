import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { mapa2 } from '../routes/router';

export const googleMapsSockets = (cliente: Socket) => {
    cliente.on('marcador-nuevo2', (marcador) => {
        mapa2.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo2', marcador);
    });

    cliente.on('marcador-borrar2', (id: string) => {
        mapa2.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar2', id);
    });

    cliente.on('marcador-mover2', (marcador) => {
        mapa2.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover2', marcador);
    });
}

export const mapa = new Mapa();

export const mapaSockets = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });

    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
}

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    console.log('Cliente conectado');
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        io.emit('mensaje-nuevo', payload);
    });
}

export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}