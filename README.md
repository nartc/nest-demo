# Modern MEAN with NestJS

# Server

Server is written using NestJS. The following technologies are included in the demo:
1. Typescript
2. Swagger/OpenAPI
3. JWT/Passport
4. `config` package for Configuration
5. `lodash`
6. Mongoose with `@nestjs/mongoose`
7. Socket.IO with `@nestjs/websockets`
8. AutoMapper with `automapper-ts`

- ####Architecture:
NestJS uses Angular's approach on **Module-Components**. Hence, NestJS application is comprised of multiple `modules` and manage communication between `modules` through **Dependencies Injection**

- ###Structure:
This specific demo uses `Repository Pattern` approach to abstract the logic with `Persistence Model (Database)` out to a separate **Services** layer. This could be done by naming `Repositories` but for small applications such as this demo, additional `Repositories` layer is skipped and utilizes `Services` instead.
```markdown
// Application Folder Structure
-root
|-- NestDemo.Client // Angular Frontend
    |-- ..regular Angular frontend structures here // As this demo purpose is to showcase NestJS, I simplify the frontend for the sake of simplification.
|-- NestDemo.Server // NestJS Backend
    |-- config
        |-- default-example.ts // Specific to this demo, please replace with your own default.ts
        |-- default.ts // Read up "config" package documentations to have more understanding about the uses of this package. This file contains our configuration variables/API keys/Mongo ConnectionString for the application, hence is included in .gitignore
  |-- dist // compiled folder from src
  |-- src // Backend sources
        |-- auth // AuthModule
            |-- strategies // Our Auth strategies
                |-- jwt.strategy.ts // JWT Strategy
            |-- auth.module.ts
            |-- auth.service.ts
            |-- jwt-payload.model.ts // Payload interface for jwt.sign() method
        |-- shared // SharedModule
            |-- config // This directory houses actual ConfigService that will deal with our Application's Keys/Variables
                |-- config.enum.ts // Prevent magic-string of our application's variable names
                |-- config.service.ts // This will be injected where it's needed to get the variables
            |-- decorators // Custom Decorators
            |-- filters // Custom Exception Filters
            |-- guards // Custom Guards
            |-- mapping // This app utilizes AutoMapper
                | -- mapper.service.ts // Same as ConfigService
            |-- shared.model.ts // BaseModel for all other models to include the extension of Mongoose's Document
            |-- shared.module.ts
            |-- shared.service.ts // BaseService for All other services to include base CRUD operations
        |-- socket // SocketModule
        |-- todo // TodoModule
            |-- ... same as UserModule
        |-- user // UserModule
            |-- models
            |-- schema
            |-- user.controller.ts
            |-- user.module.ts
            |-- user.service.ts
        |-- app.controller.spec.ts
        |-- app.controller.ts
        |-- app.module.ts // Main ApplicationModule
        |-- app.service.ts
        |-- app-routing.module.ts // RoutingModule utilizing nest-router
        |-- main.ts // Bootstrap our backend
    |-- test // Will not be covered in here
    |-- .gitignore
    |-- .prettierc
    |-- NestDemo.nswag // NSwag file for Client-side API Generations
    |-- nodemon.json
    |-- package.json
    |-- package-lock.json
    |-- README.md
    |-- tsconfig.json
    |-- tslint.json
    |-- webpack.config.js
|-- README.md // this README
|-- .gitignore
``` 
The above structure might look overwhelming for a simple Todo backend but NestJS aims for Scalability and Modernity of backend development. Hence, the Separation of Concern (SoC) is heavily *forced* and utilized here.

- ####Customs:
1. ConfigService:
```typescript
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
    private devEnvironment: string = process.env.NODE_ENV ? 'production' : 'development';

    /**
     * Method to return specific config variable using the constants from config.constant.ts.
     * Using this will help us get rid of: process.env.<VAR_NAME> || config.get('<var_name_path>') all over our code.
     * @param {string} name
     * @returns {string | number}
     */
    getConfigVariable(name: string): string {
        return process.env[name] || get(name);
    }

    get isDevelopment(): boolean {
        return this.devEnvironment === 'development';
    }
}
```
I do have comments in the file but might as well explain it here. I made `connectionString` a static variable because there's no way for me, in the `AppModule`, to call the `getConfigVariable` method in `ConfigService` to get the` MONGO_URI` from my `config/default.ts`.

`getConfigVariable` is a method that takes in a `variableName` and will return a value from either `process.env` or your `default.ts` file. This is a nice-r way to get rid of all `process.env.<some_thing> || <some_thing>` in your codebase.

A **getters** `isDevelopment` is to return the `DevelopmentEnvironment` in which the Application is running as a `boolean`.

2. HttpExceptionFilters:
```typescript
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();

        if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
            if (typeof(error.response) !== 'string') {
                error.response['message'] = error.response.message || 'You do not have permission to access this resource';
            }
        }

        res.status(error.getStatus())
            .json({
                statusCode: error.getStatus(),
                error: error.response.name || error.name,
                message: error.response.message || error.message,
                errors: error.response.errors || null,
                timestamp: new Date().toISOString(),
                path: req ? req.url : null,
            });
    }
}
```
This is NestJS's Filter. I have this `HttpExceptionFilter` to catch all `HttpException` thrown from the `Service` or `Controller` and modify it before it actually gets returned to the Client side.

As you can see from the code, I intentionally return some additional information from the `Request` itself (as Nest's Filter can have access to the **ExecutionContext**) before responding back to the client with the *familiar* `Response` object. Ironically, the returned object here looks exactly the same as my `ApiException` class in `shared.model.ts`.

3. Swagger Integration:

NestJS provides `SwaggerModule` through `@nestjs/swagger` package. In the code, you'll see decorators with prefix `@Api` all over the place as these decorators signify `SwaggerModule` to look at this class/method to include them in the `SwaggerUI` view and the `swagger.json` specification file.

4. AutoMapper:

The usage of `AutoMapper` in this demo simply to test out `automapper-ts` and to actually implement`Model` on the Backend and `ViewModel` for the Frontend.

For example, `User` on the backend has every fields including `password` but `UserVm` does not include `password` to prevent `password` to be EVER exposed to the Frontend.

5. NSwag:

`NSwag` is used to generate Client-side API code. This is a package which you can install via: `npm install -g nswag`. 

This `nswag` uses the `swagger.json` that you expose via `SwaggerUI` to generate `HTTP Calls` for your Frontend, including all calls and models. This is nice because it can help keeping the models consistent front-to-back.

You'll need an `.nswag` file. More information can be accessed at `nswag.org`.

# Client

This is just a simple Angular frontend application to connect to the NestJS backend.

# Steps to run
1. For **NestDemo.Server**:
- Run `mongod` to start a local Mongo service.
- Make a `default.ts` and put it in your `config` directory under `root`
- Mimic the format in `default-example.ts`
- `cd ./NestDemo.Server` and run `npm install`
- `npm start` will start up the server given you've done everything right
- Go to `http://localhost:8080/api/docs` for the `SwaggerUI`

2. For **NestDemo.Client**:
- Run normal like an Angular application with `ng serve`.