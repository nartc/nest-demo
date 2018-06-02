import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from '../../user/models/user-role.enum';

export const Roles = (role: UserRole) => ReflectMetadata('role', role.toString());
