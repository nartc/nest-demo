import { SchemaDefinition } from 'mongoose';
import { SharedDefinition } from '../../shared/shared.model';

export const UserDefinition: SchemaDefinition = {
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, '{VALUE} must be at least 6 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, '{VALUE} must be at least 6 characters'],
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    ...SharedDefinition,
};
