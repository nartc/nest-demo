import { ApiModelProperty } from '@nestjs/swagger';

export class TodoParams {
    @ApiModelProperty() title: string;
    @ApiModelProperty() content: string;
}
