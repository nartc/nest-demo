import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TodoModule } from '../todo/todo.module';

@Module({
    imports: [TodoModule],
    providers: [SocketGateway],
    exports: [SocketGateway],
})
export class SocketModule {
}
