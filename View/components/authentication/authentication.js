
export class authentication {
    notify
    googleOauth
    constructor(notification, googleOauth, storage) {
        this.notify = new notification
        this.googleOauth = new googleOauth
        this.googleOauth.signInWithGoogle()

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


