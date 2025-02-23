export class userLayout {
    constructor() {
        this.subPageRedirect()
    }
    subPageRedirect() {
        let splittedPath = location.pathname.split('/')
        if (splittedPath[splittedPath.length - 1] == 'user') {
            window.router.navigate('/')
        }

    }
}