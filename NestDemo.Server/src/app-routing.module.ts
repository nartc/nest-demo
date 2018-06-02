import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { UserModule } from './user/user.module';

/**
 * Define API routes, there's currently a bug in nest-router package
 * that we have to use path: / for all children instead of /<children_route>.
 * Because of that, we define the route for the children in the children's controllers.
 */
const routes: Routes = [
    {
        path: '/api',
        children: [
            {
                path: '/',
                module: UserModule,
            },
        ],
    },
];

@Module({
    imports: [RouterModule.forRoutes(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
