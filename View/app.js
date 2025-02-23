import { routes } from "../route.js";
import { router } from "./services/router-service.js";
import { authGuard } from "./services/auth-guard.js";
import { storage } from "./services/storage-service.js";

class app {
    constructor() {
        this.init()
    }
    init() {
        window['storage'] = new storage()
        window['authGuard'] = new authGuard()
        window['router'] = new router(routes)
        this.autoSignInByToken()
    }
    autoSignInByToken() {
        if (window.storage.hasAppToken()) {
            fetch(`Controller/auth.php?action=auto_login`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.hasAppToken() },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        this.notify.showNotification("Login Successfully ", "success")
                        window.storage.setSessionData(data.result)
                        window.authGuard.authenticatedRoutes()

                    }
                });

        }
    }
}
new app()


