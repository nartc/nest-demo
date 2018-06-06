import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TODO_MODEL, TodoSchema } from './schema/todo.schema';
import { SocketModule } from '../socket/socket.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: TODO_MODEL, schema: TodoSchema }]), SocketModule],
    providers: [TodoService],
    controllers: [TodoController],
})
export class TodoModule {
}
