import { SchemaDefinition } from 'mongoose';
import { SharedDefinition } from 'shared/shared.model';

export const TodoDefinition: SchemaDefinition = {
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [6, '{VALUE} must be at least 6 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [6, '{VALUE} must be at least 6 characters'],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    ...SharedDefinition,
};
