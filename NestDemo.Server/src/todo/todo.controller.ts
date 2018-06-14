import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { MapperService } from '../shared/mapping/mapper.service';
import { TodoVm } from './models/todo-vm.model';
import { Todo } from './models/todo.model';
import { ApiException } from '../shared/shared.model';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from '../user/models/user-role.enum';
import { TodoParams } from './models/todo-params.model';

@Controller('todos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiUseTags('Todo')
@ApiBearerAuth()
export class TodoController {
    constructor(private readonly _todoService: TodoService,
                private readonly _mapperService: MapperService) {
    }

    @Post('create')
    @HttpCode(200)
    @Roles(UserRole.Admin)
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'Todo_CreateTodo' })
    async createTodo(@Body() todoParams: TodoParams): Promise<TodoVm> {
        let todo: Todo;
        try {
            todo = await this._todoService.createFromRequestBody(todoParams);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return this._mapperService.mapper.map(
            this._todoService.modelName,
            this._todoService.viewModelName,
            todo.toJSON(),
        );
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'Todo_GetTodos' })
    async getAllTodos(@Req() request: Request): Promise<TodoVm[]> {
        let todos: Todo[];
        try {
            todos = await this._todoService.getAll();
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this._mapperService.mapper.map(
            `${this._todoService.modelName}[]`,
            `${this._todoService.viewModelName}[]`,
            todos.map(todo => todo.toJSON()),
        );
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard)
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'Todo_DeleteTodo' })
    async deleteTodo(@Param('id') id: string): Promise<TodoVm> {
        try {
            const todo: Todo = await this._todoService.delete(id);
            return this._mapperService.mapper.map(
                this._todoService.modelName,
                this._todoService.viewModelName,
                todo.toJSON(),
            );
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'Todo_GetTodoById' })
    async getTodoById(@Param('id') id: string): Promise<TodoVm> {
        try {
            const todo: Todo = await this._todoService.getById(id);
            return this._mapperService.mapper.map(
                this._todoService.modelName,
                this._todoService.viewModelName,
                todo.toJSON(),
            );
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @HttpCode(200)
    @ApiResponse({ status: HttpStatus.OK, type: TodoVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'Todo_UpdateTodo' })
    async updateTodo(@Body() todo: TodoVm): Promise<TodoVm> {
        const existed: Todo = await this._todoService.getById(todo.id);
        if (!existed) throw new HttpException(`Not found ${todo.id}`, HttpStatus.NOT_FOUND);
        if (existed.isCompleted) throw new HttpException('Todo already completed', HttpStatus.BAD_REQUEST);

        try {
            const updated: Todo = await this._todoService.updateFromRequestBody(todo);
            return this._mapperService.mapper.map(
                this._todoService.modelName,
                this._todoService.viewModelName,
                updated.toJSON(),
            );
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
