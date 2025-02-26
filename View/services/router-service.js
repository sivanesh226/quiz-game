// import { routes } from "../../route.js";

export class router {
    paths = []
    basePath = "/quiz-game"
    currentParentPath = ''
    constructor(routes) {
        this.paths = routes
        this.init()

    }
    init() {
        window.addEventListener("popstate", () => this.loadPage(window.location.pathname));
        let path = this.basePath + '/login'
        document.addEventListener("DOMContentLoaded", () => this.loadPage(window.location.pathname));
    }
    navigate(path) {
        let fullPath = this.basePath + path;

        // Handle child navigation inside layouts (Admin/User)
        if (this.currentParentPath) {
            fullPath = this.basePath + this.currentParentPath + path;
        }

        history.pushState({}, "", fullPath);
        this.loadPage(fullPath);
    }

    loadPage(path) {
        let basePathLength = this.basePath.split('/').length
        let splittedPath = path.split('/')
        let route = ''
        for (let i = basePathLength; i < splittedPath.length; i++) {
            if (i == basePathLength) {
                this.currentParentPath = ''
                route = this.findRoute('/' + splittedPath[i], this.paths);
                if (route[0].isLoaded) { this.currentParentPath = route[0].path }
                else {
                    if (route[0].canActive())
                        this.setPage(route[0], 'root')
                    else {
                        this.navigate('/login')
                        break;
                    }
                }
            }
            else {
                if (route[0].childrens) {
                    this.paths[route[1]]['isLoaded'] = true
                    route = this.findRoute('/' + splittedPath[i], route[0].childrens())
                    if (route[0].canActive())
                        this.setPage(route[0], 'child')
                    else {
                        this.navigate('/login')
                        break;
                    }
                }
            }
        }
    }

    setPage(route, pathType) {
        if (route && (!route.hasOwnProperty('navigateTo'))) {
            if (route.childrens) {
                this.currentParentPath += route.path; // Store parent path for child navigation
            }
            let moduleName = this.currentParentPath.substring(this.currentParentPath.lastIndexOf('/') + 1)
            fetch(location.origin + this.basePath + route.componentPath + ".html")
                .then(response => response.text())
                .then(html => {
                    this.updateCSS(location.origin + this.basePath + route.componentPath + ".css", pathType, moduleName);

                    document.getElementById(pathType == 'root' ? "main-outlet" : moduleName + "-outlet").innerHTML = html;
                    let obj = route.loadClass();
                    window[obj.constructor.name] = obj;
                });
        }
        else {
            this.navigate(route.navigateTo)
        }
    }

    updateCSS(cssFile, pathType, moduleName) {

        let docId = pathType == 'root' ? 'page-style' : moduleName + '-style';
        let cssLink = document.getElementById(docId);
        if (!cssLink) {
            cssLink = document.createElement("link");
            cssLink.id = docId;
            cssLink.rel = "stylesheet";
            document.head.appendChild(cssLink);
        }
        cssLink.href = cssFile;
    }

    findRoute(path, routes) {
        for (let [index, route] of routes.entries()) {
            if (route.path === path) {
                return [route, index]
            };

        }
        return [routes.find(route => route.path === '**'), routes.length - 1] || null;
    }

    // loadChildRoute(childRoutes, childPath) {
    //     console.log("Loading child route:", childPath);

    //     let cleanPath = childPath.startsWith("/") ? childPath.substring(1) : childPath; // Remove leading slash
    //     let childRoute = childRoutes.find(route => cleanPath === route.path.replace("/", ""));

    //     if (childRoute) {
    //         fetch(location.origin + this.basePath + childRoute.componentPath + ".html")
    //             .then(response => response.text())
    //             .then(html => {
    //                 let outlet = this.currentParentPath === "/admin" ? "admin-outlet" : "user-outlet";
    //                 document.getElementById(outlet).innerHTML = html;
    //                 if (childRoute.loadClass)
    //                     window[childRoute.loadClass().constructor.name] = childRoute.loadClass();
    //             });
    //     }
    // }
}

