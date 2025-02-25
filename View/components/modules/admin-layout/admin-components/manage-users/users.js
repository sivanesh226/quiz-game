export class users {
    notify
    userData = []
    constructor(notification) {
        this.notify = new notification
        this.addUserToggle()
        this.getUserDetails('')

    }
    isAddUserPaneOpen = true

    getUserDetails(srchstr) {
        fetch(`Controller/admin_user.php?action=view_users&search_key=${srchstr}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    this.userData = data.result
                    this.tableData()
                } else {
                    this.notify.showNotification(data.result, "danger")
                }
            }).catch((err) => {
                this.notify.showNotification(`Error while fetching user detail ${err}`, 'danger')
            });

    }
    search() {
        document.getElementById('search-txt').value
    }
    addUserToggle() {
        this.isAddUserPaneOpen = !this.isAddUserPaneOpen
        let btn = document.getElementById('add-user-btn')
        if (this.isAddUserPaneOpen) {
            btn.style.backgroundColor = 'var(--color-danger)';
            btn.textContent = 'Cancel';
            document.getElementById('add-user-pane').style.maxHeight = '400px'
        }
        else {
            btn.style.backgroundColor = 'var(--color-primary)';
            btn.textContent = 'Add User';
            document.getElementById('add-user-pane').style.maxHeight = '0px'

        }
    }
    tableData() {
        let tableTemplate = ''
        this.userData.forEach((row, i) => {
            tableTemplate += `
        <tr>
            <td>${i + 1}</td>
            <td>${row.name}</td>
            <td>${row.email}</td>
            <td>${row.role}</td>
            <td>${row.password ? '<label class="text-success">Password Already Set</label>' : '<label class="text-danger">Password Not Set</label>'}</td>
         </tr>`
        });
        document.getElementById('table-data').innerHTML = tableTemplate
    }
}
// }[
//     {
//         "id": 1,
//         "name": "Smart",
//         "email": "smartsiva226@gmail.com",
//         "password": true
//     },
//     {
//         "id": 5,
//         "name": "SIVANESH M",
//         "email": "sivanesh@dsrt.in",
//         "password": false
//     }
// ]