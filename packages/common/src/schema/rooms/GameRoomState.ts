import { MapSchema, Schema, type } from '@colyseus/schema';
import PlayerState from '@schema/entities/PlayerState';

export default class GameRoomState extends Schema {
    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}
