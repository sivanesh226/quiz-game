import { authentication } from './View/components/authentication/authentication.js';
import { adminDashboard } from './View/components/modules/admin-layout/admin-components/dashboard/dashboard.js';
import { notification } from './View/components/common/notification/notification.js';
import { signup } from './View/components/signup/signup.js';
import { googleOauth } from './View/services/google-oauth-service.js'
import { adminLayout } from './View/components/modules/admin-layout/adminLayout.js';
import { userLayout } from './View/components/modules/user-layout/userLayout.js'
import { profile } from './View/components/modules/admin-layout/admin-components/profile/profile.js';
import { userDashboard } from './View/components/modules/user-layout/user-components/dashboard/dashboard.js'
import { manageExams } from './View/components/modules/admin-layout/admin-components/manage-exams/manage-exams.js'
import { category } from './View/components/modules/admin-layout/admin-components/category/category.js';
import { quiz } from './View/components/modules/user-layout/user-components/quiz/quiz.js'

export const routes = [
    { path: '/', navigateTo: '/login' },
    { path: '/login', componentPath: './View/components/authentication/authentication', loadClass: () => new authentication(notification, googleOauth), canActive: () => true },
    { path: '/register', componentPath: './View/components/signup/signup', loadClass: () => new signup(notification, googleOauth), canActive: () => true },
    // { path: '/dashboard', componentPath: './View/components/dashboard/dashboard', loadClass: () => new dashboard() },
    {
        path: '/admin', componentPath: './View/components/modules/admin-layout/adminLayout', loadClass: () => new adminLayout(), canActive: () => window.authGuard.isAuthenticated(),
        childrens: (() => [
            { path: '/', navigateTo: '/dashboard' },
            { path: '/dashboard', componentPath: './View/components/modules/admin-layout/admin-components/dashboard/dashboard', loadClass: () => new adminDashboard(), canActive: () => true },
            { path: '/profiles', componentPath: './View/components/modules/admin-layout/admin-components/profile/profile', loadClass: () => new profile(), canActive: () => true },
            { path: '/manage-exams', componentPath: './View/components/modules/admin-layout/admin-components/manage-exams/manage-exams', loadClass: () => new manageExams(), canActive: () => true },
            { path: '/manage-category', componentPath: './View/components/modules/admin-layout/admin-components/category/category', loadClass: () => new category(notification), canActive: () => true },
            { path: '**', componentPath: './View/components/error404/error404', loadClass: () => false, canActive: () => true }
        ])
    },
    {
        path: '/user', componentPath: './View/components/modules/user-layout/userLayout', loadClass: () => new userLayout(), canActive: () => window.authGuard.isAuthenticated(),
        childrens: (() => [
            { path: '/', navigateTo: '/dashboard' },
            { path: '/dashboard', componentPath: './View/components/modules/user-layout/user-components/dashboard/dashboard', loadClass: () => new userDashboard(), canActive: () => true },
            { path: '/quiz', componentPath: './View/components/modules/user-layout/user-components/quiz/quiz', loadClass: () => new quiz(notification), canActive: () => true }
        ])
    },
    { path: '**', componentPath: './View/components/error404/error404', loadClass: () => false, canActive: () => true }
];
