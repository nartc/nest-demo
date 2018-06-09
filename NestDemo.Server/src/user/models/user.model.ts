import { SharedModel } from '../../shared/shared.model';
import { UserRole } from './user-role.enum';

export interface User extends SharedModel {
    username: string;
    password: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    avatar?: string;
}
