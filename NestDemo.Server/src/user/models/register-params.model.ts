import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterParams {
    @ApiModelProperty({ type: String, minLength: 6 })
    username: string;

    @ApiModelProperty({ type: String, minLength: 6, format: 'password' })
    password: string;
}
