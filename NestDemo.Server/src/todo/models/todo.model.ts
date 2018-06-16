import { SharedModel } from '../../shared/shared.model';

export interface Todo extends SharedModel {
    content: string;
    isCompleted: boolean;
}
