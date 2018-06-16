import { SharedService } from '../shared/shared.service';
import { User } from './models/user.model';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from './schema/user.schema';
import { Model } from 'mongoose';
import { MapperService } from '../shared/mapping/mapper.service';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from './models/login-response.model';
import { RegisterParams } from './models/register-params.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserVm } from './models/user-vm.model';
import { JwtPayload } from '../auth/jwt-payload.model';

@Injectable()
export class UserService extends SharedService<User> {
    constructor(
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
        @InjectModel(USER_MODEL) private readonly _userModel: Model<User>,
        private readonly _mapperService: MapperService,
    ) {
        super(_userModel);
    }

    async register(registerParams: RegisterParams): Promise<User> {
        const { username, password, firstName, lastName } = registerParams;

        const newUser: User = new this._userModel();
        newUser.username = username.toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return this.getById(result._id);
        } catch (e) { // MongoError
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(user: User): Promise<LoginResponse> {
        const fetchedUser: UserVm = this._mapperService.mapper.map(this.modelName, this.viewModelName, user.toJSON());
        const payload: JwtPayload = {
            username: fetchedUser.username,
            role: fetchedUser.role,
        };
        const token = await this._authService.signPayload(payload);

        return {
            token,
            user: fetchedUser,
        } as LoginResponse;
    }

    async comparePassword(password: string, input: string): Promise<boolean> {
        return compare(input, password);
    }
}
