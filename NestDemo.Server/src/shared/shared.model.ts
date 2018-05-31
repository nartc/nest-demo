import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Document, SchemaDefinition, SchemaOptions } from 'mongoose';

export interface SharedModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}

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

    @ApiModelPropertyOptional() _id?: string;
}

export class ApiException {
    @ApiModelPropertyOptional() statusCode?: number;
    @ApiModelPropertyOptional() message?: string;
}
