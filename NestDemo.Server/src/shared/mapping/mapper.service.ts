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

    private static config(config: AutoMapperJs.IConfiguration): void {
        config
            .createMap('User', 'UserVm')
            .forSourceMember('_id', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => opts.ignore())
            .forSourceMember('password', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => opts.ignore());

        config
            .createMap('Todo', 'TodoVm')
            .forSourceMember('_id', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => opts.ignore());

        config
            .createMap('Todo[]', 'TodoVm[]')
            .forSourceMember('_id', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => opts.ignore());
    }
}
