import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TODO_MODEL, TodoSchema } from './schema/todo.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: TODO_MODEL, schema: TodoSchema }])],
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService],
})
export class TodoModule {
}
