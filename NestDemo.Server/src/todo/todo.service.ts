import { Injectable } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { Todo } from './models/todo.model';
import { TODO_MODEL } from './schema/todo.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MapperService } from '../shared/mapping/mapper.service';

@Injectable()
export class TodoService extends SharedService<Todo> {
    constructor(
        @InjectModel(TODO_MODEL) private readonly _todoModel: Model<Todo>,
        private readonly _mapperService: MapperService,
    ) {
        super(_todoModel);
    }
}
