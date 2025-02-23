export class userLayout {
    constructor() {
        this.subPageRedirect()
        document.getElementById('user-name').innerText = window.storage.getSessionData().name
        this.toggleMenu()
    }
    subPageRedirect() {
        let splittedPath = location.pathname.split('/')
        if (splittedPath[splittedPath.length - 1] == 'user') {
            window.router.navigate('/')
        }
    }
    logout() {
        window.storage.removeSession();
        // window.router.navigate('/login')
        window.location.reload()
    }
    menuToggle = true
    toggleMenu() {
        this.menuToggle = !this.menuToggle
        document.getElementById('menu').style.display = this.menuToggle ? 'inline-block' : 'none';
    }
}