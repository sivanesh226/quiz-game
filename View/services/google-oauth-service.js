export class googleOauth {
    constructor() {
    }
    clientId = '725416259310-h57hv2gema7g93j5rjiqktei1viegqbn.apps.googleusercontent.com'

    signInWithGoogle() {
        if (window.location.hash) {
            const hashParams = new URLSearchParams(location.hash.substring(1)); // Remove the `#` at the beginning
            fetch('Controller/google_login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: hashParams.get('access_token') })
            })
                .then(res => res.json())
                .then(data => {

                    if (data.status) {
                        window.storage.setSessionData(data.result)
                        window.authGuard.authenticatedRoutes()

                    } else {
                        this.notify.showNotification("Login failed ", "danger")
                    }
                    console.log(data)
                });

        }
    }
    invokeOAuth() {

        let params = {
            client_id: this.clientId,
            scope: 'openid email',
            ux_mode: 'redirect',
            redirect_uri: 'http://localhost:80/quiz-game/login',
            response_type: 'token',
            include_granted_scopes: 'true',
            state: 'pass-through value',
            prompt: 'select_account'
        }


        let form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', 'https://accounts.google.com/o/oauth2/v2/auth');
        for (var p in params) {
            var input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }
    logout() {
        localStorage.removeItem('jwt');
        window.router.navigate('/');
    }


}