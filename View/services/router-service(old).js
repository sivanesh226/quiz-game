// import { routes } from "../../route.js";

export class router {
    paths = []
    basePath = "/quiz-game"
    currentParentPath = ''
    constructor(routes) {
        this.paths = routes
        this.init()
    }

    // init() {
    //     window.onpopstate = () => this.loadPage(window.location.pathname, window.location.pathname != this.basePath + '/');

    //     document.addEventListener('DOMContentLoaded', () => {
    //         console.log(window.location.pathname, this.basePath + '/', window.location.pathname === this.basePath + '/')
    //         this.loadPage(window.location.pathname, window.location.pathname != this.basePath + '/');
    //     });
    // }
    init() {
        window.addEventListener("popstate", () => this.loadPage(window.location.pathname));
        document.addEventListener("DOMContentLoaded", () => this.loadPage(window.location.pathname));
    }
    // navigate(path, hold = false) {
    //     console.log(window.location, path)
    //     let pathName

    //     if (!hold) {
    //         let lastIndex = window.location.pathname.lastIndexOf("/");
    //         pathName = window.location.pathname.substring(0, lastIndex)
    //     }

    //     let finalPath = (pathName ? pathName : location.pathname)
    //     console.log(window.location.origin + finalPath + path, hold)
    //     window.history.pushState({}, path, window.location.origin + finalPath + path);
    //     this.loadPage(path);

    // }
    // navigate(path) {
    //     history.pushState({}, "", this.basePath + path);
    //     this.loadPage(path);
    // }
    navigate(path) {
        let fullPath = this.basePath + path;

        // Handle child navigation inside layouts (Admin/User)
        if (this.currentParentPath) {
            fullPath = this.basePath + this.currentParentPath + path;
        }

        history.pushState({}, "", fullPath);
        this.loadPage(fullPath);
    }

    // loadPage(path, basePath = false) {
    //     const file = this.paths.filter(row => { return basePath ? path === (this.basePath + row.path) : path === row.path });
    //     if (file.length) {
    //         let component = this.getComponentNameAndPath(file[0])
    //         console.log(component)
    //         if (component) {
    //             this.updateCSS(component.componentPath + component.componentName + '.css') // dynamically switch css according to component

    //             fetch(component.componentPath + component.componentName + '.html')
    //                 .then(response => response.text())
    //                 .then(html => document.getElementById('app').innerHTML = html);
    //             file[0].loadClass() ? window[component.componentName] = file[0].loadClass() : false; // Add the class in window Object to access globally 
    //         }

    //     }
    //     else {
    //         const file = this.paths.filter(row => { return row.path === '**' });
    //         if (file.length) {
    //             let component = this.getComponentNameAndPath(file[0])
    //             fetch(file[0].componentPath)
    //                 .then(response => response.text())
    //                 .then(html => document.getElementById('app').innerHTML = html);
    //             if (component) {
    //                 this.updateCSS(component.componentPath + component.componentName + '.css')

    //                 fetch(component.componentPath + component.componentName + '.html')
    //                     .then(response => response.text())
    //                     .then(html => document.getElementById('app').innerHTML = html);
    //                 file[0].loadClass() ? window[component.componentName] = file[0].loadClass() : false
    //             }
    //         }
    //         console.error(`${path} Route not Found`);

    //     }
    // }
    // loadPage(path) {
    //     let route = this.findRoute(path);
    //     if (route) {
    //         this.updateCSS(route.componentPath + ".css");
    //         fetch(route.componentPath + ".html")
    //             .then(response => response.text())
    //             .then(html => {
    //                 document.getElementById("app").innerHTML = html;
    //                 if (route.loadClass) route.loadClass();
    //             });
    //     } else {
    //         document.getElementById("app").innerHTML = "<h2>404 Not Found</h2>";
    //     }
    // }
    // loadPage(path) {
    //     let route = this.findRoute(path);
    //     if (route) {
    //         this.updateCSS(route.componentPath + ".css");

    //         // Check if the route has children (sub-routing)
    //         if (route.childrens) {
    //             fetch(route.componentPath + ".html")
    //                 .then(response => response.text())
    //                 .then(html => {
    //                     document.getElementById("main-outlet").innerHTML = html; // Load layout
    //                     route.loadClass(); // Initialize layout
    //                     this.loadChildRoute(route.childrens(), window.location.pathname); // Load child component
    //                 });
    //         } else {
    //             fetch(route.componentPath + ".html")
    //                 .then(response => response.text())
    //                 .then(html => {
    //                     document.getElementById("main-outlet").innerHTML = html;
    //                     if (route.loadClass)
    //                         window[route.loadClass().constructor.name] = route.loadClass();
    //                 });
    //         }
    //     } else {
    //         document.getElementById("main-outlet").innerHTML = "<h2>404 Not Found</h2>";
    //     }
    // }

    // loadPage(path) {
    //     console.log("Loading path:", path);

    //     if (!path.startsWith(this.basePath)) {
    //         console.error("Invalid base path");
    //         return;
    //     }

    //     const relativePath = path.replace(this.basePath, "") || "/"; // Remove base path
    //     let route = this.findRoute(relativePath);

    //     if (route) {
    //         this.updateCSS(route.componentPath + ".css");

    //         if (route.childrens) {
    //             fetch(route.componentPath + ".html")
    //                 .then(response => response.text())
    //                 .then(html => {
    //                     document.getElementById("main-outlet").innerHTML = html;
    //                     window[route.loadClass().constructor.name] = route.loadClass();
    //                     this.loadChildRoute(route.childrens(), relativePath);
    //                 });
    //         } else {
    //             fetch(route.componentPath + ".html")
    //                 .then(response => response.text())
    //                 .then(html => {
    //                     document.getElementById("main-outlet").innerHTML = html;
    //                     if (route.loadClass)
    //                         window[route.loadClass().constructor.name] = route.loadClass();
    //                 });
    //         }
    //     } else {
    //         document.getElementById("main-outlet").innerHTML = "<h2>404 Not Found</h2>";
    //     }
    // }
    loadPage(path) {
        console.log("Loading path:", path);

        if (!path.startsWith(this.basePath)) {
            console.error("Invalid base path");
            return;
        }

        const relativePath = path.replace(this.basePath, "") || "/";
        let route = ''
        console.log(relativePath, relativePath.split('/'))
        let splittedPath = relativePath.split('/')
        if (splittedPath.length <= 2) {
            route = this.findRoute(relativePath);
        }
        else {
            // route = this.findRoute('/' + splittedPath[1])
            let childPath = this.currentParentPath == '/' + splittedPath[1] ? '/' + splittedPath[2] : ''
            this.loadChildRoute(this.findRoute('/' + splittedPath[1]).childrens(), childPath);
        }

        if (route) {
            this.updateCSS(route.componentPath + ".css");

            if (route.childrens) {
                this.currentParentPath = route.path; // Store parent path for child navigation

                fetch(location.origin + this.basePath + route.componentPath + ".html")
                    .then(response => response.text())
                    .then(html => {
                        document.getElementById("main-outlet").innerHTML = html;
                        window[route.loadClass().constructor.name] = route.loadClass();

                        // Extract child path by removing the parent path correctly
                        let childPath = relativePath.startsWith(route.path + "/")
                            ? relativePath.substring(route.path.length + 1)  // Remove "admin/"
                            : "";

                        this.loadChildRoute(route.childrens(), childPath);
                    });
            }
            // } else {
            //     // If it's a child component, load into the correct outlet
            //     let outlet = this.currentParentPath === "/admin" ? "admin-outlet" :
            //         this.currentParentPath === "/user" ? "user-outlet" :
            //             "main-outlet";

            //     fetch(location.origin + this.basePath + route.componentPath + ".html")
            //         .then(response => response.text())
            //         .then(html => {
            //             document.getElementById(outlet).innerHTML = html;
            //             if (route.loadClass)
            //                 window[route.loadClass().constructor.name] = route.loadClass();
            //         });
            // }
        } else {
            // document.getElementById("main-outlet").innerHTML = "<h2>404 Not Found</h2>";
        }
    }


    updateCSS(cssFile) {
        let cssLink = document.getElementById("page-style");
        if (!cssLink) {
            cssLink = document.createElement("link");
            cssLink.id = "page-style";
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
    findRoute(path) {
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
