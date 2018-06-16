import { Schema } from 'mongoose';
import { UserDefinition } from './user.definition';
import { schemaOptions } from '../../shared/shared.model';

export const UserSchema = new Schema(UserDefinition, schemaOptions);
export const USER_MODEL = 'User';

/**
 * *Virtuals
 */
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});
