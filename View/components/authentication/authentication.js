
export class authentication {
    notify
    googleOauth
    constructor(notification, googleOauth) {
        this.notify = new notification
        this.googleOauth = new googleOauth
        this.googleOauth.signInWithGoogle()
        this.autoSignInByToken()
    }
    autoSignInByToken() {
        if (window.storage.hasAppToken() && (!window.storage.getSessionData().token)) {
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
    login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('Controller/auth.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.notify.showNotification("Login Successfully ", "success")
                    window.storage.setSessionData(data.result)
                    window.authGuard.authenticatedRoutes()
                } else {
                    this.notify.showNotification("Login failed ", "danger")
                }
            });
    }
}
// // await lastValueFrom
// async parseGoogleToken(token) {
//     let info = await lastValueFrom(this.http.parseGoogletoken(token))
//     return info
// }


