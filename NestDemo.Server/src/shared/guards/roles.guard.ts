import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get<string>('role', context.getHandler());
        if (!role) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const hasRole = () => role === user.role.toString();
        if (user && user.role && hasRole()) {
            return true;
        } else {
            throw new HttpException('You do not have permission to access this resource (Roles)', HttpStatus.UNAUTHORIZED);
        }
    }
}
