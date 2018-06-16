import {
    Body,
    Controller,
    FileInterceptor,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { MapperService } from '../shared/mapping/mapper.service';
import { UserVm } from './models/user-vm.model';
import { LoginResponse } from './models/login-response.model';
import { RegisterParams } from './models/register-params.model';
import { ApiException } from '../shared/shared.model';
import { User } from './models/user.model';
import { LoginParams } from './models/login-params.model';
import { FileParams } from './models/file-params.model';

@Controller('users')
@ApiUseTags('User')
export class UserController {
    constructor(private readonly _userService: UserService, private readonly _mapperService: MapperService) {
    }

    @Post('register')
    @HttpCode(200)
    @ApiResponse({ status: HttpStatus.OK, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'User_Register' })
    async register(@Body() registerParams: RegisterParams): Promise<UserVm> {
        const { username, password } = registerParams;
        if (!username || !password) throw new HttpException('Username/Password is required', HttpStatus.BAD_REQUEST);

        let user: User;

        try {
            user = await this._userService.getOne(username.toLowerCase(), 'username');
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (user) throw new HttpException(`${username} is already existed`, HttpStatus.BAD_REQUEST);

        const newUser: User = await this._userService.register(registerParams);
        return this._mapperService.mapper.map(
            this._userService.modelName, // User
            this._userService.viewModelName, // UserVm
            newUser.toJSON(),
        );
    }

    @Post('login')
    @HttpCode(200)
    @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'User_Login' })
    async login(@Body() loginParams: LoginParams): Promise<LoginResponse> {
        const { username, password } = loginParams;

        if (!username || !password) throw new HttpException('Username/Password is required', HttpStatus.BAD_REQUEST);

        let user: User;

        try {
            user = await this._userService.getOne(username.toLowerCase(), 'username');
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!user) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

        const isMatched: boolean = await this._userService.comparePassword(user.password, password);

        if (!isMatched) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

        return this._userService.login(user);
    }

    @Post('upload')
    @HttpCode(200)
    @ApiResponse({ status: HttpStatus.OK, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
    @ApiOperation({ title: '', operationId: 'User_Upload' })
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: FileParams): Promise<UserVm> {
        console.log(file);
        return;
    }
}
