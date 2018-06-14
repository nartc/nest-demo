import { UserVm } from './user-vm.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiModelProperty() token: string;

    @ApiModelProperty({ type: UserVm })
    user: UserVm;
}
