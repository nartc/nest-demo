import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { MapperService } from './mapping/mapper.service';

@Module({
    providers: [ConfigService, MapperService],
    exports: [ConfigService, MapperService],
})
export class SharedModule {}
