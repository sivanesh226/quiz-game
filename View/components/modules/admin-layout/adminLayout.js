import { router } from "../../../services/router-service.js"

export class adminLayout {
    isNavBarOpen = true;
    menuList = [
        { path: '/dashboard', menuName: "Dashboard", icon: 'bi bi-stack' },
        { path: '/manage-exams', menuName: 'Manage Exams', icon: 'bi bi-gear-fill' },
        { path: '/manage-category', menuName: 'Categories', icon: 'bi bi-gear-fill' },
        { path: '/profiles', menuName: 'Profiles', icon: 'bi bi-person-lines-fill' }
    ]
    constructor() {
        this.init()
    }

    setMenuList() {
        const navActive = document.getElementById('nav-list');
        const fragment = document.createDocumentFragment(); // Improves performance
        this.menuList.forEach((menu, index) => {
            const menuBtn = document.createElement('div');
            menuBtn.onclick = (event) => {
                this.navigateTo(menu.path, index)
            }
            menuBtn.className = `nav-btn`;
            menuBtn.innerHTML = `<i class="${menu.icon} icon"></i><label> ${menu.menuName}</label>`;
            fragment.appendChild(menuBtn);
        });
        navActive.appendChild(fragment);
    }
    init() {
        this.toggleLeftNavBar()
        this.subPageRedirect()
        this.setMenuList()
        setTimeout(() => {
            this.setMenuListActive(-1)
        }, 1000)

    }
    subPageRedirect() {
        let splittedPath = location.pathname.split('/')
        if (splittedPath[splittedPath.length - 1] == 'admin') {
            window.router.navigate('/')
        }

        // window.router.navigate('/dashboard')

    }
    toggleLeftNavBar() {
        this.isNavBarOpen = (!this.isNavBarOpen)
        let leftNav = document.getElementById('left-nav')
        let content = document.getElementById('right-content')
        if (this.isNavBarOpen) {
            leftNav.style.marginLeft = '-250px';
            content.style.width = '100%';
            content.style.marginLeft = '0px'
        }
        else {
            leftNav.style.marginLeft = '0px';
            content.style.width = 'calc(100% - 250px)';
            content.style.marginLeft = '250px'
        }
    }
    navigateTo(path, index) {
        console.log(path, index)
        this.setMenuListActive(index)
        window.router.navigate(path)

    }
    setMenuListActive(index) {
        let eleIndex
        if (index == -1) {
            let location = window.location.pathname.split('/')[3]
            eleIndex = this.menuList.findIndex(menu => menu.path === '/' + location);
        }
        else eleIndex = index
        // setTimeout(() => {
        let element = document.getElementsByClassName('nav-btn')
        let activeNav = document.getElementById('nav-active')
        activeNav.style.marginTop = element[eleIndex].getBoundingClientRect().top - 145 + 'px'
        for (let i = 0; i < element.length; i++) {
            element[i].style.color = (i == eleIndex) ? 'white' : 'black'
        }
        // }, 100)

    }
}