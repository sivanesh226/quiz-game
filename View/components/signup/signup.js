
export class signup {
    notify
    constructor(notification, googleOauth) {
        this.notify = new notification
        this.googleOauth = new googleOauth
        this.googleOauth.signInWithGoogle()
    }
    register() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const cpassword = document.getElementById('cpassword').value;

        fetch('Controller/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, cpassword })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.notify.showNotification("Account Created Successfully ", "success")
                    localStorage.setItem('jwt', data.token);
                    this.navigate('/dashboard');
                } else {
                    this.notify.showNotification(data.errorMsg, "danger")
                }
            })
            .catch((error) => {
                this.notify.showNotification("Unable Toconnect to server", "danger")
            });
    }

}

