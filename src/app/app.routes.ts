import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/balance-page.component').then((m) => m.BalancePageComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./pages/dashboard-page.component').then((m) => m.DashboardPageComponent),
    },
    {
        path: 'collectibles',
        loadComponent: () => 
            import('./pages/collectibles-page.component').then((m) => m.CollectiblesPageComponent),
    },
    {
        path: 'activity',
        loadComponent: () => 
            import('./pages/activity-page.component').then((m) => m.ActivityPageComponent),
    },
    {
        path: 'snipper',
        loadComponent: () => 
            import('./pages/orca-page.component').then((m) => m.OrcaPageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },

];
