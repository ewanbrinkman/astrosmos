import 'dotenv/config';
import config from '@colyseus/tools';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import basicAuth from 'express-basic-auth';
import GameRoom from '@rooms/GameRoom';

export default config({
    initializeGameServer: (gameServer) => {
        gameServer.define('game_room', GameRoom);
        gameServer.simulateLatency(200);
    },

    initializeExpress: (app) => {
        if (process.env.NODE_ENV !== 'production') {
            app.use('/', playground);
        }

        // Require a username and password to access the Colyseus monitoring
        // panel.
        const basicAuthMiddleware = basicAuth({
            // List users and their passwords.
            users: {
                [process.env.MONITOR_USERNAME!]: process.env.MONITOR_PASSWORD!,
            },
            challenge: true,
        });
        app.use('/colyseus', basicAuthMiddleware, monitor());
    },

    beforeListen: () => {},
});
