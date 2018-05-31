import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
declare const module: any;

async function bootstrap() {
    /**
     * Get HostDomain from NODE_ENV
     */
    const isDev = process.env.NODE_ENV ? 'production' : 'development';

    /**
     * Create Application instance from AppModule
     * @type {INestApplication & INestExpressApplication}
     */
    const app = await NestFactory.create(AppModule, { cors: true });
    const hostDomain = isDev === 'development' ? `${AppModule.host}:${AppModule.port.toString()}` : AppModule.host;

    app.use(helmet());
    await app.listen(AppModule.port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
