import { Injectable, Inject, forwardRef, PayloadTooLargeException } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { ConfigService } from 'shared/config/config.service';
import { SignOptions, sign } from 'jsonwebtoken';
import { ConfigVar } from 'shared/config/config.enum';
import { User } from 'user/models/user.model';
import { JwtPayload } from './jwt-payload.model';
import { UserVm } from 'user/models/user-vm.model';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly _userService: UserService,
        private readonly _configService: ConfigService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = _configService.getConfigVariable(ConfigVar.JWT_KEY);
    }

    async signPayload(payload: { user: UserVm }): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validateUser(validatePayload: JwtPayload): Promise<User> {
        return this._userService.getOne(validatePayload.username.toLowerCase(), 'username');
    }
}
