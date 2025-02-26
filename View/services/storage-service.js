export class storage {
    userData = {
        user_id: '',
        token: '',
        name: '',
        email: '',
        role: '',
    }
    hasAppToken() {
        const token = localStorage.getItem('app-token');
        return token ? token : false
    }
    setSessionData(data) {
        localStorage.setItem('app-token', data.token);
        this.userData = data
        return true
    }
    getSessionData() {
        return this.userData
    }
    removeSession() {
        this.userData = {
            user_id: '',
            token: '',
            name: '',
            email: '',
            role: '',
        }
        localStorage.removeItem('app-token');
    }
}