import { authentication } from './View/components/authentication/authentication.js';
import { adminDashboard } from './View/components/modules/admin-layout/admin-components/dashboard/dashboard.js';
import { notification } from './View/components/common/notification/notification.js';
import { signup } from './View/components/signup/signup.js';
import { googleOauth } from './View/services/google-oauth-service.js'
import { adminLayout } from './View/components/modules/admin-layout/adminLayout.js';
import { userLayout } from './View/components/modules/user-layout/userLayout.js'
import { profile } from './View/components/modules/admin-layout/admin-components/profile/profile.js';
import { userDashboard } from './View/components/modules/user-layout/user-components/dashboard/dashboard.js'

export const routes = [
    { path: '/', componentPath: './View/home', loadClass: () => false },
    { path: '/login', componentPath: './View/components/authentication/authentication', loadClass: () => new authentication(notification, googleOauth) },
    { path: '/register', componentPath: './View/components/signup/signup', loadClass: () => new signup(notification, googleOauth) },
    // { path: '/dashboard', componentPath: './View/components/dashboard/dashboard', loadClass: () => new dashboard() },
    {
        path: '/admin', componentPath: './View/components/modules/admin-layout/adminLayout', loadClass: () => new adminLayout(),
        childrens: (() => [
            { path: '/dashboard', componentPath: './View/components/modules/admin-layout/admin-components/dashboard/dashboard', loadClass: () => new adminDashboard() },
            { path: '/profiles', componentPath: './View/components/modules/admin-layout/admin-components/profile/profile', loadClass: () => new profile() },
            { path: '**', componentPath: './View/components/error404/error404', loadClass: () => false }
        ])
    },
    {
        path: '/user', componentPath: './View/components/modules/user-layout/userLayout', loadClass: () => new userLayout(),
        childrens: (() => [
            { path: '/dashboard', componentPath: './View/components/modules/user-layout/user-components/dashboard/dashboard', loadClass: () => new userDashboard() },
        ])
    },
    { path: '**', componentPath: './View/components/error404/error404', loadClass: () => false }
];
