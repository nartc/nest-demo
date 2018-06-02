import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RegisterParams {
    @ApiModelProperty({ type: String, minLength: 6 })
    username: string;

    @ApiModelProperty({ type: String, minLength: 6, format: 'password' })
    password: string;

    @ApiModelPropertyOptional() firstName?: string;

    @ApiModelPropertyOptional() lastName?: string;
}
