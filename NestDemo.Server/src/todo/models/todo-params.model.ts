import { ApiModelProperty } from '@nestjs/swagger';

export class TodoParams {
    @ApiModelProperty()
    content: string;
}