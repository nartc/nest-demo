import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/config/config.service';
import { ConfigVar } from './shared/config/config.enum';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';
import { SocketModule } from './socket/socket.module';

@Module({
    imports: [
        SharedModule,
        AppRoutingModule,
        MongooseModule.forRoot(ConfigService.connectionString),
        AuthModule,
        UserModule,
        TodoModule,
        SocketModule,
    ],
    providers: [AppService],
})
export class AppModule {
    /**
     * * These variables are static because we are not going to be creating any instance of AppModule
     * * so making these static allows us to grab them later.
     */
    public static port: number | string;
    public static host: string;
    public static isDev: boolean;

    /**
     * Grab HOST and PORT from Config Variables
     * @param {ConfigService} _configService
     */
    constructor(private readonly _configService: ConfigService) {
        AppModule.port = AppModule.normalizePort(_configService.getConfigVariable(ConfigVar.PORT));
        AppModule.host = _configService.getConfigVariable(ConfigVar.HOST);
        AppModule.isDev = _configService.isDevelopment;
    }

    /**
     * Return the normalized port number
     * @param {number | string} param
     * @returns {number | string}
     */
    private static normalizePort(param: number | string): number | string {
        const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber)) return param;
        else if (portNumber >= 0) return portNumber;
    }
}
