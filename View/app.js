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

    }
}
new app()


