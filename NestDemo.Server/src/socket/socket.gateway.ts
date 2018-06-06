import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { TodoVm } from '../todo/models/todo-vm.model';

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer() server;

    constructor() {
    }

    @SubscribeMessage('reload')
    async onEvent(): Promise<WsResponse<TodoVm[]>> {
        return;
    }
}
