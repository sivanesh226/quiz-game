export class category {
    notify
    constructor(notification) {
        this.notify = new notification
        this.getCategories()
    }
    categories = []
    originalCatagories = []
    getCategories() {
        fetch('Controller/category.php?action=view', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.categories = data.result
                    // this.notify.showNotification("Login Successfully ", "success")s
                    this.setCategory()

                } else {
                    this.notify.showNotification("Login failed ", "danger")
                }
            });

    }
    setCategory() {
        const container = document.getElementById("categoryTree");
        container.innerHTML = "";
        this.categories.forEach((category, index) => {
            // Create a container for heading + icon
            const headingContainer = document.createElement("div");
            headingContainer.classList.add("category-heading", "mt-3");

            // Create Bootstrap icon
            const icon = document.createElement("i");
            icon.classList.add("bi", "bi-chevron-right", "toggle-icon");

            // Create Main Category Heading (Clickable)
            let mainHeading
            if (category.isEdit) {
                mainHeading = document.createElement("input");
                mainHeading.value = category.category_name;
                mainHeading.classList.add("form-control");
                mainHeading.style.width = "200px";
                mainHeading.autofocus = true;
                mainHeading.addEventListener('blur', (event) => {
                    event.stopPropagation()
                    if (mainHeading.value != '') {
                        category.isEdit = false
                        category.category_name = mainHeading.value
                        // this.setCategory()
                        this.updateCategory(index)
                    }
                })
            }
            else {
                mainHeading = document.createElement("label");
                mainHeading.id = `expandLabel${index}`
                mainHeading.textContent = category.category_name;
                mainHeading.style.cursor = "pointer";
            }

            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add("bi", "bi-trash", "text-danger")
            deleteBtn.style.opacity = '60%';
            deleteBtn.addEventListener("click", (event) => {
                event.stopPropagation()
                // this.deleteCategory(index)
                category.isDeleted = true
                this.updateCategory(index)
            })
            deleteBtn.style.marginLeft = "15px";

            const editBtn = document.createElement('i');
            editBtn.classList.add("bi", "bi-pencil-square", "text-blue")
            editBtn.style.opacity = '60%';
            editBtn.addEventListener("click", (event) => {
                event.stopPropagation()
                // this.editMainCategory(index)
                category.isEdit = true
                this.setCategory()

            })
            editBtn.style.marginLeft = "25px";
            // Create Subcategory List
            const ul = document.createElement("ul");
            ul.style.display = "none"; // Initially Hidden

            category.subcategories.forEach((sub, subIndex) => {
                let li
                if (sub.isEdit) {
                    li = document.createElement("input");
                    li.value = sub.sub_category_name;
                    li.classList.add("form-control");
                    li.style.width = "150px";
                    li.autofocus = true
                    li.addEventListener('blur', (event) => {
                        event.stopPropagation()
                        if (li.value != '') {
                            sub.isEdit = false
                            sub.sub_category_name = li.value
                            // this.setCategory()
                            this.updateSubCategory(index, subIndex)
                        }
                    })
                }
                else {

                    li = document.createElement("li");
                    li.textContent = sub.sub_category_name;
                    li.classList.add('subBtn')
                    li.addEventListener('click', (event) => {
                        event.stopPropagation()
                    })

                    const editBtn = document.createElement('i')
                    editBtn.classList.add('bi', 'bi-pencil', 'ms-3', 'text-primary');
                    editBtn.addEventListener('click', (event) => {
                        event.stopPropagation()
                        sub.isEdit = true
                        this.setCategory()
                    })
                    li.appendChild(editBtn)

                    const deleteBtn = document.createElement('i')
                    deleteBtn.classList.add('bi', 'bi-x', 'ms-2', 'text-danger');
                    deleteBtn.addEventListener('click', (event) => {
                        event.stopPropagation()
                        sub.isDeleted = true
                        this.updateSubCategory(index, subIndex)
                    })
                    li.appendChild(deleteBtn)
                }
                ul.appendChild(li);

            });
            const addBtn = document.createElement("li");
            addBtn.textContent = "Add";
            addBtn.classList.add('addSubBtn')
            addBtn.addEventListener("click", (event) => {
                event.stopPropagation()
                this.addSubCategory(index)
            })
            ul.style.display = category.isExpanded ? "none" : "flex";
            icon.classList.toggle("bi-chevron-right", category.isExpanded);
            icon.classList.toggle("bi-chevron-down", !category.isExpanded);
            // Click event to toggle subcategories
            setTimeout(() => {
                document.getElementById(`expandLabel${index}`).onclick = () => {
                    category.isExpanded = !category.isExpanded
                    // ul.style.display = category.isExpanded ? "none" : "flex";
                    this.setCategory()

                };
            }, 10)





            // Append elements
            headingContainer.appendChild(icon);
            headingContainer.appendChild(mainHeading);
            headingContainer.appendChild(editBtn);
            headingContainer.appendChild(deleteBtn);
            container.appendChild(headingContainer);
            container.appendChild(ul);
            ul.appendChild(addBtn)

        });

    }
    addMainCategory() {
        this.categories.push({
            id: null,
            category_name: '',
            isEdit: true,
            isExpanded: true,
            subcategories: []
        })
        this.setCategory()
    }
    deleteMainCategory(index) {
    }
    updateCategory(index) {
        fetch(`Controller/category.php?action=${this.categories[index].id ? this.categories[index]?.isDeleted ? 'delete_category' : 'update_category' : 'insert_category'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
            body: JSON.stringify(this.categories[index])
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.categories[index].isEdit = false;

                    this.notify.showNotification(this.categories[index].id ? this.categories[index]?.isDeleted ? 'Category Deleted' : 'Category Updated' : 'Category Added', "success")
                    this.getCategories()

                } else {
                    this.notify.showNotification("Category update failed ", "danger")
                }
            })
            .catch(err => {
                this.notify.showNotification("Category update failed ", "danger")
            });
    }
    addSubCategory(index) {
        this.categories[index].subcategories.push({ sub_category_name: '', isEdit: true, id: null })

        this.setCategory()
    }

    updateSubCategory(index, subIndex) {
        let subCat = this.categories[index].subcategories[subIndex]
        subCat['category_id'] = this.categories[index].id
        fetch(`Controller/category.php?action=${subCat.id ? subCat?.isDeleted ? 'delete_subcategory' : 'update_subcategory' : 'insert_subcategory'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
            body: JSON.stringify(subCat)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    subCat.isEdit = false;

                    this.notify.showNotification(subCat.id ? subCat?.isDeleted ? 'Category Deleted' : 'Category Updated' : 'Category Added', "success")
                    this.getCategories()

                } else {
                    this.notify.showNotification("Category update failed ", "danger")
                }
            })
            .catch(err => {
                this.notify.showNotification("Category update failed ", "danger")
            });
    }
}

// [
//     {
//         "id": 1,
//         "category_name": "History",
//         "created_author": "Admin",
//         "updated_author": "Admin",
//         "subcategories": [
//             {
//                 "id": 3,
//                 "sub_category_name": "World War History",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             },
//             {
//                 "id": 2,
//                 "sub_category_name": "Modern History",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             },
//             {
//                 "id": 1,
//                 "sub_category_name": "Ancient History",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "category_name": "General Knowledge",
//         "created_author": "Admin",
//         "updated_author": "Admin",
//         "subcategories": [
//             {
//                 "id": 6,
//                 "sub_category_name": "Important Events",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             },
//             {
//                 "id": 5,
//                 "sub_category_name": "Famous Personalities",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             },
//             {
//                 "id": 4,
//                 "sub_category_name": "Current Affairs",
//                 "created_author": "Admin",
//                 "updated_author": "Admin"
//             }
//         ]
//     }
// ]