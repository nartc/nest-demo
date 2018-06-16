import { SchemaDefinition } from 'mongoose';
import { SharedDefinition } from '../../shared/shared.model';

export const TodoDefinition: SchemaDefinition = {
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
