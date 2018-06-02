import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { MapperService } from './mapping/mapper.service';

/**
 * *Global decorator allows us to provide SharedModule on a global scope with only importing it in AppModule
 */
@Global()
@Module({
    providers: [ConfigService, MapperService],
    exports: [ConfigService, MapperService],
})
export class SharedModule {
}
