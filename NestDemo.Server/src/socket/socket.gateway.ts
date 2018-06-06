import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer() server;

    @SubscribeMessage('reload')
    async onEvent(): Promise<WsResponse<any>> {
        return;
    }
}
