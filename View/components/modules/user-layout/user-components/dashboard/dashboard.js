export class userDashboard {
    constructor() {
        this.prepareChart()
        this.getCategories()
    }
    prepareChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        let gradient1 = ctx.createLinearGradient(0, 0, 0, 400)
        gradient1.addColorStop(0, '#ef5350')
        gradient1.addColorStop(1, '#e53935')

        let gradient2 = ctx.createLinearGradient(0, 0, 0, 400)
        gradient2.addColorStop(0, '#f5365c')
        gradient2.addColorStop(1, '#f5365c')

        let gradient3 = ctx.createLinearGradient(0, 0, 0, 400)
        gradient3.addColorStop(0, '#ffa726')
        gradient3.addColorStop(1, '#fb8c00')

        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Passed',
                    'Failed',
                    'Incomplete'
                ],
                datasets: [{
                    label: '',
                    data: [40, 35, 25],
                    backgroundColor:
                        // [gradient1, gradient2, gradient3],
                        [
                            '#2dce89',
                            '#f5365c',
                            '#fb8c00'
                        ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: true // Hide legend
                },
                responsive: true,

            }
        });
    }
    categoryPopup() {
        let popup = document.getElementById('popup');
        popup.style.display = 'flex';

    }
    closePopup() {
        let popup = document.getElementById('popup');
        popup.style.display = 'none';
    }


    // categories = [
    //     {
    //         category_name: "General Knowledge",
    //         isEdit: false,
    //         subCatagory: [
    //             { subCatagoryName: 'History', subCatagoryId: 1 },
    //             { subCatagoryName: 'Money', subCatagoryId: 2 },
    //             { subCatagoryName: 'Earth', subCatagoryId: 3 },
    //             { subCatagoryName: 'History', subCatagoryId: 1 },
    //             { subCatagoryName: 'Money', subCatagoryId: 2 },
    //             { subCatagoryName: 'Earth', subCatagoryId: 3 },
    //             { subCatagoryName: 'History', subCatagoryId: 1 },
    //             { subCatagoryName: 'Money', subCatagoryId: 2 },
    //             { subCatagoryName: 'Earth', subCatagoryId: 3 }
    //         ]
    //     }
    // ];
    categories = []
    getCategories() {
        console.log(window)
        fetch('Controller/category.php?action=view', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.categories = data.result
                    console.log(this.categories)
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
        this.categories.forEach(category => {
            // Create a container for heading + icon
            const headingContainer = document.createElement("div");
            headingContainer.classList.add("category-heading", "mt-3");

            // Create Bootstrap icon
            const icon = document.createElement("i");
            icon.classList.add("bi", "bi-chevron-right", "toggle-icon");

            // Create Main Category Heading (Clickable)
            const mainHeading = document.createElement("label");
            mainHeading.textContent = category.category_name;
            mainHeading.style.cursor = "pointer";

            // Create Subcategory List
            const ul = document.createElement("ul");
            ul.style.display = "flex"; // Initially Hidden

            category.subcategories.forEach((sub) => {
                const li = document.createElement("li");
                li.textContent = sub.sub_category_name;
                li.addEventListener('click', () => {
                    this.navigateQuiz(category.id, sub.id)
                })
                ul.appendChild(li);

            });

            // Click event to toggle subcategories
            headingContainer.onclick = function () {
                const isExpanded = ul.style.display === "flex";
                ul.style.display = isExpanded ? "none" : "flex";
                icon.classList.toggle("bi-chevron-right", isExpanded);
                icon.classList.toggle("bi-chevron-down", !isExpanded);
            };

            // Append elements
            headingContainer.appendChild(icon);
            headingContainer.appendChild(mainHeading);
            container.appendChild(headingContainer);
            container.appendChild(ul);
        });

    }
    categoryId
    subCategoryId
    navigateQuiz(categoryId, subCategoryId) {
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId
        window.router.navigate('/quiz')
    }

}   