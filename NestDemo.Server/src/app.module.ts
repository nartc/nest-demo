import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/config/config.service';
import { ConfigVar } from 'shared/config/config.enum';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [SharedModule, MongooseModule.forRoot(ConfigService.connectionString), AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    /**
     * * These variables are static because we are not going to be creating any instance of AppModule
     * * so making these static allows us to grab them later.
     */
    public static port: number | string;
    public static host: string;

    /**
     * Grab HOST and PORT from Config Variables
     * @param {ConfigService} _configService
     */
    constructor(private readonly _configService: ConfigService) {
        AppModule.port = AppModule.normalizePort(this._configService.getConfigVariable(ConfigVar.PORT));
        AppModule.host = this._configService.getConfigVariable(ConfigVar.HOST);
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
