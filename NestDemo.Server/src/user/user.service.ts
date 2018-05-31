import { SharedService } from 'shared/shared.service';
import { User } from './models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from './schema/user.schema';
import { Model } from 'mongoose';
import { MapperService } from 'shared/mapping/mapper.service';

@Injectable()
export class UserService extends SharedService<User> {
    constructor(
        @InjectModel(USER_MODEL) private readonly _userModel: Model<User>,
        private readonly _mapperService: MapperService,
    ) {
        super(_userModel);
    }
}
