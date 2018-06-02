import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
