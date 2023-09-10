import { Room, Client } from '@colyseus/core';
import { InputMessage, PlayerState, GameRoomState } from '@astrosmos/common';

export default class GameRoom extends Room<GameRoomState> {
    maxClients = 4;
    fixedTimeStep = 1000 / 60;

    onCreate(options: any) {
        this.setState(new GameRoomState());

        this.onMessage('input', (client: Client, input: InputMessage) => {
            const player = this.state.players.get(client.sessionId);

            player!.inputQueue.push(input);
        });

        let elapsedTime = 0;
        this.setSimulationInterval((deltaTime: number) => {
            elapsedTime += deltaTime;
            while (elapsedTime >= this.fixedTimeStep) {
                elapsedTime -= this.fixedTimeStep;
                this.fixedTick(this.fixedTimeStep);
            }
        });
    }

    update(deltaTime: number) {}

    fixedTick(deltaTime: number) {
        const velocity = 2;

        this.state.players.forEach((player: PlayerState) => {
            let input: InputMessage | undefined;

            while ((input = player.inputQueue.shift())) {
                if (input.left) {
                    player.x -= velocity;
                } else if (input.right) {
                    player.x += velocity;
                }

                if (input.up) {
                    player.y -= velocity;
                } else if (input.down) {
                    player.y += velocity;
                }
            }
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, 'joined!');

        const mapWidth = 800;
        const mapHeight = 600;

        const player = new PlayerState();

        player.x = Math.random() * mapWidth;
        player.y = Math.random() * mapHeight;

        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, 'left!');

        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
}
