import { router } from "../../../services/router-service.js"

export class adminLayout {
    isNavBarOpen = true;
    menuList = [
        { path: '/dashboard', menuName: "Dashboard", icon: 'bi bi-stack' },
        { path: '/settings', menuName: 'Settings', icon: 'bi bi-gear-fill' },
        { path: '/profiles', menuName: 'Profiles', icon: 'bi bi-person-lines-fill' }
    ]
    constructor() {
        // window['adminRouter'] = new router(routes())

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
            menuBtn.innerHTML = `<i class="${menu.icon}"></i><label> ${menu.menuName}</label>`;
            fragment.appendChild(menuBtn);
        });
        navActive.appendChild(fragment);
    }
    init() {
        this.toggleLeftNavBar()
        window.router.navigate('/dashboard')
        this.setMenuList()
        setTimeout(() => {
            this.setMenuListActive(-1)

        }, 1000)

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