import { SharedModel } from '../../shared/shared.model';

export interface Todo extends SharedModel {
    title: string;
    content: string;
    isCompleted: boolean;
}
