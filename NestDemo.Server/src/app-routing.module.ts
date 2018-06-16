import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

/**
 * Define API routes, there's currently a bug in nest-router package
 * that we have to use path: / for all children instead of /<children_route>.
 * Because of that, we define the route for the children in the children's controllers.
 */
const routes: Routes = [
    {
        path: '/api', // localhost:3000/api/users
        children: [
            {
                path: '/',
                module: UserModule,
            },
            {
                path: '/',
                module: TodoModule,
            },
        ],
    },
];

@Module({
    imports: [RouterModule.forRoutes(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
