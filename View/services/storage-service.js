export class storage {
    userData = {
        user_id: '',
        token: '',
        name: '',
        email: '',
        role: '',
    }
    hasAppToken() {
        console.log(this.userData)
        const token = localStorage.getItem('app-token');
        return token ? token : false
    }
    setSessionData(data) {
        console.log(data)
        localStorage.setItem('app-token', data.token);
        this.userData = data
        return true
    }
    getSessionData() {
        return this.userData
    }
}