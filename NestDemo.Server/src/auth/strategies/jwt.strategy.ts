import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../shared/config/config.service';
import { ConfigVar } from '../../shared/config/config.enum';
import { JwtPayload } from '../jwt-payload.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly _authService: AuthService, private readonly _configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.getConfigVariable(ConfigVar.JWT_KEY),
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this._authService.validateUser(payload);
        if (!user) {
            return done(new HttpException('You do not have permission to access this resource', HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
