import { Schema, type } from '@colyseus/schema';
import type { InputMessage } from '@messages/GameMessages';

// export class Player extends Schema implements PlayerType {
export default class PlayerState extends Schema {
    @type('number') x: number;
    @type('number') y: number;
    inputQueue: InputMessage[] = [];
}
