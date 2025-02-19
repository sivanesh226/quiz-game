export class authGuard {
    constructor() {
    }
    isAuthenticated() {
        if (window.storage.hasAppToken() && window.storage.getSessionData().email) {
            return true
        }
        return false
    }
    authenticatedRoutes() {
        if (this.isAuthenticated()) {
            if (window.storage.getSessionData().role == 'admin')
                window.router.navigate('/admin');
            else
                window.router.navigate('/user');
        }
    }
}