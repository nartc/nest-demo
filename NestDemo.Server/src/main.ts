import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
    /**
     * Create Application instance from AppModule
     * @type {INestApplication & INestExpressApplication}
     */
    const app = await NestFactory.create(AppModule, { cors: true });
    // app = express();
    const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port.toString()}` : AppModule.host;

    app.use(helmet());

    /**
     * Create Swagger options
     * TODO: Add more tags
     */
    const swaggerOptions = new DocumentBuilder()
        .setTitle('NestJS Demo')
        .setDescription('API Documentation for NestJS Demo')
        .setVersion('1.0.0')
        .setHost(hostDomain.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath('/api')
        .addTag('User', 'User related API')
        .addTag('Todo', 'Todo related API')
        .addBearerAuth('Authorization', 'header')
        .build();

    /**
     * Create Swagger documentation
     */
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

    /**
     * Serve swagger.json on /api/docs/swagger.json
     */
    app.use('/api/docs/swagger.json', (req: Request, res: Response) => {
        res.send(swaggerDoc);
    });

    /**
     * Serve SwaggerUI on /api/docs
     */
    SwaggerModule.setup('/api/docs', app, null, {
        explorer: true,
        customSiteTitle: 'NestJS Demo API Documentation',
        swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });

    /**
     * *Filters, Pipes, Guards
     */
    app.useGlobalFilters(new HttpExceptionFilter());

    // app.listen()
    await app.listen(AppModule.port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
