import { SharedModelVm } from '../../shared/shared.model';
import { UserRole } from './user-role.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UserVm extends SharedModelVm {
    @ApiModelProperty() username: string;

    @ApiModelProperty({ enum: ['Admin', 'User'] })
    role: UserRole;

    @ApiModelPropertyOptional() firstName?: string;

    @ApiModelPropertyOptional() lastName?: string;

    @ApiModelPropertyOptional() fullName?: string;

    @ApiModelPropertyOptional() avatar?: string;
}
