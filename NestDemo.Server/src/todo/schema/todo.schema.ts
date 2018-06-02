import { Schema } from 'mongoose';
import { TodoDefinition } from './todo.definition';
import { schemaOptions } from '../../shared/shared.model';

export const TodoSchema = new Schema(TodoDefinition, schemaOptions);
export const TODO_MODEL = 'Todo';
