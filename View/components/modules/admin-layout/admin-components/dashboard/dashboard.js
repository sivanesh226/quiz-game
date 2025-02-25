export class adminDashboard {
    dashboardData = [];
    constructor() {
        this.getAdminDashboardDetails();
     }

     getAdminDashboardDetails() {
        fetch(`Controller/admin_dashboard.php?action=admin_dashboard`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.dashboardData = data.result;
                    console.log(this.dashboardData);
                    document.getElementById("no_users").textContent = this.dashboardData.no_of_user;
                    document.getElementById("no_categories").textContent = this.dashboardData.no_of_categories;
                    document.getElementById("no_subcategories").textContent = this.dashboardData.no_of_subcategories;
                    document.getElementById("no_questions").textContent = this.dashboardData.no_of_questions;
                    let tableTemplate = ''
                    this.dashboardData.high_score_user.forEach((row,i)=>{
                        tableTemplate += `<tr><td>${i+1}</td><td>${row.user_name}</td><td>${row.category_name}</td>
                                        <td>${row.sub_category_name}</td><td>${row.time_duration}</td>
                                        <td>${row.total_marks}</td></tr>`
                    });
                    document.getElementById("high_score_user").innerHTML = tableTemplate;

                } else {
                    this.notify.showNotification(data.message, "danger")
                }
            });

    }
}