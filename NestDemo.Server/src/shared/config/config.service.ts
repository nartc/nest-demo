import { Injectable } from '@nestjs/common';
import { get } from 'config';
import { ConfigVar } from './config.enum';

@Injectable()
export class ConfigService {
    /**
     * MongoConnectionString is made static to pass to MongooseModule.forRoot() dynamically
     * @type {string}
     */
    static connectionString: string = process.env[ConfigVar.MONGO_URI] || get(ConfigVar.MONGO_URI);

    constructor() {
        ConfigService.connectionString = this.getConfigVariable(ConfigVar.MONGO_URI);
    }

    /**
     * Method to return specific config variable using the constants from config.constant.ts.
     * Using this will help us get rid of: process.env.<VAR_NAME> || config.get('<var_name_path>') all over our code.
     * @param {string} name
     * @returns {string | number}
     */
    getConfigVariable(name: string): string {
        return process.env[name] || get(name);
    }
}
