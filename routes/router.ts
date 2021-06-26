import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados, mapa } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';
import { Grafica2Data } from '../classes/grafica2';
import { Mapa2 } from '../classes/mapa2';

const router = Router();

/* Mapa Google */

export const mapa2 = new Mapa2();
const lugares = [
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

mapa2.marcadores.push(...lugares);

router.get('/mapa2', (req: Request, res: Response) => {
    res.json(mapa2.getMarcadores());
});

/* Mapa Mapbox */

router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.getMarcadores());
});

/* Gráfica 1 */

const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {

    res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response) => {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incrementarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica());
});

/* Gráfica 2 */

const grafica2 = new Grafica2Data();

router.get('/grafica2', (req: Request, res: Response) => {

    res.json(grafica2.getDataGrafica2());
});

router.post('/grafica2', (req: Request, res: Response) => {

    const pregunta = req.body.pregunta;
    const unidades = Number(req.body.unidades);

    grafica2.incrementarValor2(pregunta, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica2', grafica2.getDataGrafica2());

    res.json(grafica2.getDataGrafica2());
});

/* Simple Chat */

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = { de, cuerpo };

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    server.io.clients((err: any, clientes: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});

export default router;