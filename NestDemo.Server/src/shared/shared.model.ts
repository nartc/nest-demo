import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Document, SchemaDefinition, SchemaOptions } from 'mongoose';

// schema = new Schema
// model<T>('User', UserSchema)// Model<T>

export interface SharedModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}
// new Schema(definition, options);
export const SharedDefinition: SchemaDefinition = {
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
};

export const schemaOptions: SchemaOptions = {
    toJSON: {
        getters: true,
        virtuals: true,
    },
};

export class SharedModelVm {
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time',
    })
    createdAt?: Date;

    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time',
    })
    updatedAt?: Date;

    @ApiModelPropertyOptional() id?: string;
}

export class ApiException {
    @ApiModelPropertyOptional() statusCode?: number;
    @ApiModelPropertyOptional() message?: string;
    @ApiModelPropertyOptional() status?: string;
    @ApiModelPropertyOptional() error?: string;
    @ApiModelPropertyOptional() errors?: any;
    @ApiModelPropertyOptional() timestamp?: string;
    @ApiModelPropertyOptional() path?: string;
}
