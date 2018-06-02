import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        res.status(error.getStatus()).json({
            statusCode: error.getStatus(),
            error: error.response.name ? error.response.name : error.name,
            message: error.response.message ? error.response.message : error.message,
            errors: error.response.errors ? error.response.errors : null,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null,
        });
    }
}
