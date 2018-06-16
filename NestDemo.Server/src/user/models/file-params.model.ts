import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class FileParams {
    @ApiModelProperty()
    fieldname: string;

    @ApiModelProperty()
    originalname: string;

    @ApiModelPropertyOptional()
    encoding?: string;

    @ApiModelPropertyOptional()
    mimetype?: string;

    @ApiModelPropertyOptional()
    buffer?: any;

    @ApiModelPropertyOptional()
    size?: number;

    @ApiModelPropertyOptional()
    destination?: string;

    @ApiModelPropertyOptional()
    filename?: string;

    @ApiModelPropertyOptional()
    path?: string;
}