import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { DetailsComponent } from './pages/details/details.component'
import { inject } from '@angular/core';
import { MangaService } from './services/manga/manga.service';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
            details: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const mangasService = inject(MangaService)
                return mangasService.details(route.paramMap.get('id') as string)
            },
            volumes: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const mangasService = inject(MangaService)
                return mangasService.volumes(route.paramMap.get('id') as string)
            },
        }
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
