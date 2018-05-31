import 'automapper-ts/dist/automapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
    mapper: AutoMapperJs.AutoMapper;

    constructor() {
        this.mapper = automapper;
        this.initMapper();
    }

    private initMapper(): void {
        this.mapper.initialize(MapperService.config);
    }

    private static config(config: AutoMapperJs.IConfiguration): void {}
}
