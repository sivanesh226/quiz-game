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
                route[0].isLoaded ? this.currentParentPath = route[0].path : this.setPage(route[0], 'root')
            }
            else {
                if (route[0].childrens) {
                    this.paths[route[1]]['isLoaded'] = true
                    route = this.findRoute('/' + splittedPath[i], route[0].childrens())
                    this.setPage(route[0], 'child')
                }
            }

        }
    }

    setPage(route, pathType) {
        if (route && (!route.hasOwnProperty('navigateTo'))) {
            if (route && route.canActive()) {
                if (route.childrens) {
                    this.currentParentPath += route.path; // Store parent path for child navigation
                }
                let moduleName = this.currentParentPath.substring(this.currentParentPath.lastIndexOf('/') + 1)
                console.log(location.origin + this.basePath + route.componentPath + ".html")
                fetch(location.origin + this.basePath + route.componentPath + ".html")
                    .then(response => response.text())
                    .then(html => {
                        this.updateCSS(location.origin + this.basePath + route.componentPath + ".css", pathType, moduleName);

                        document.getElementById(pathType == 'root' ? "main-outlet" : moduleName + "-outlet").innerHTML = html;
                        let obj = route.loadClass();
                        window[obj.constructor.name] = obj;

                        // this.loadChildRoute(route.childrens(), childPath);
                    });
            }
            else {
                this.navigate('/login')
            }
        }
        else {
            this.navigate(route.navigateTo)
        }
        // }

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
    // getComponentNameAndPath(routeObj) {
    //     let lastIndex = routeObj.componentPath.lastIndexOf("/");
    //     return lastIndex != -1 ?
    //         {
    //             componentPath: routeObj.componentPath.substring(0, lastIndex + 1),
    //             componentName: routeObj.componentPath.substring(lastIndex + 1)
    //         } : console.error('Given Route is not Valid', `Error ${routeObj}`);
    // }

    // findRoute(path) {
    //     for (let route of this.paths) {
    //         if (route.path === path) return route;
    //         if (route.childrens) {
    //             for (let child of route.childrens()) {
    //                 if (child.path === path)
    //                     return child;
    //             }
    //         }
    //     }
    //     return this.paths.find(route => route.path === '**') || null;
    // }
    // findRoute(path) {
    //     for (let route of this.paths) {
    //         if (route.path === path) return route;
    //         if (route.childrens) {
    //             for (let child of route.childrens()) {
    //                 if (child.path === path) return child;
    //             }
    //         }
    //     }
    //     return this.paths.find(route => route.path === '**') || null;
    // }
    findRoute1(path) {
        for (let route of this.paths) {
            if (route.path === path) return route;
            if (route.childrens) {
                for (let child of route.childrens()) {
                    if (child.path === path) return child;
                }
            }
        }
        return this.paths.find(route => route.path === '**') || null;
    }
    findRoute(path, routes) {
        for (let [index, route] of routes.entries()) {
            if (route.path === path) {
                return [route, index]
            };

        }
        return [routes.find(route => route.path === '**'), routes.length - 1] || null;
    }
    // loadChildRoute(childRoutes, path) {
    //     let childRoute = childRoutes.find(route => route.path === path);
    //     if (childRoute) {
    //         fetch(childRoute.componentPath + ".html")
    //             .then(response => response.text())
    //             .then(html => {
    //                 let outlet = path.startsWith("/admin") ? "admin-outlet" : "user-outlet";
    //                 document.getElementById(outlet).innerHTML = html;
    //                 if (childRoute.loadClass)
    //                     window[childRoute.loadClass().constructor.name] = childRoute.loadClass();
    //             });
    //     }
    // }

    // Load child routes in admin or user outlet
    //     loadChildRoute(childRoutes, path) {
    //         let childRoute = childRoutes.find(route => path === route.path);

    //         if (childRoute) {
    //             fetch(childRoute.componentPath + ".html")
    //                 .then(response => response.text())
    //                 .then(html => {
    //                     let outletId = path.startsWith("/admin") ? "admin-outlet" : "user-outlet";
    //                     let outlet = document.getElementById(outletId);
    //                     if (outlet) {
    //                         outlet.innerHTML = html;
    //                         if (childRoute.loadClass)
    //                             window[childRoute.loadClass().constructor.name] = childRoute.loadClass();
    //                     }
    //                 });
    //         }
    //     }
    // }
    loadChildRoute(childRoutes, childPath) {
        console.log("Loading child route:", childPath);

        let cleanPath = childPath.startsWith("/") ? childPath.substring(1) : childPath; // Remove leading slash
        let childRoute = childRoutes.find(route => cleanPath === route.path.replace("/", ""));

        if (childRoute) {
            fetch(location.origin + this.basePath + childRoute.componentPath + ".html")
                .then(response => response.text())
                .then(html => {
                    let outlet = this.currentParentPath === "/admin" ? "admin-outlet" : "user-outlet";
                    document.getElementById(outlet).innerHTML = html;
                    if (childRoute.loadClass)
                        window[childRoute.loadClass().constructor.name] = childRoute.loadClass();
                });
        }
    }


}
// window['router'] = new router(routes)
