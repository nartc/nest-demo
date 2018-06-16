import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { TodoService } from '../todo/todo.service';

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer() server;

    constructor(private readonly _todoService: TodoService) {
    }

    @SubscribeMessage('reload')
    async onEvent(): Promise<WsResponse<any>> {
        const todos = await this._todoService.getAll();

        return this.server.emit('onReload', { todos });
    }
}
