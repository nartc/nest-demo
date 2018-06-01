import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from 'shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]), forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
