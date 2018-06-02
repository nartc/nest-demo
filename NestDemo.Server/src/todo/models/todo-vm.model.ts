import { SharedModelVm } from '../../shared/shared.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class TodoVm extends SharedModelVm {
    @ApiModelProperty() title: string;

    @ApiModelProperty() content: string;

    @ApiModelProperty() isCompleted: boolean;
}
