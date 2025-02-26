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
                    this.notify.showNotification(data.message, "danger")
                }
            }).catch((err) => {
                this.notify.showNotification(`Error while fetching user detail ${err}`, 'danger')
            });

    }
    search() {
        this.getUserDetails(document.getElementById('search-txt').value)
    }
    addUserToggle(state) {
        this.isAddUserPaneOpen = state ? true : !this.isAddUserPaneOpen
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
            <td>
            <div class="d-flex align-items-center">
            <button class="btn" onclick="users.editUser(${i})"><i class="bi bi-pencil text-primary"></i></button>
            <button class="btn" onclick="users.deleteUser(${i})"><i class="bi bi-trash text-danger"></i></button>
            </div>
         </tr>`
        });
        document.getElementById('table-data').innerHTML = tableTemplate
    }
    updateId
    editUser(index) {

        document.getElementById('submit-btn').textContent = 'Update User'
        let name = document.getElementById("u-name")
        let email = document.getElementById("email")
        let password = document.getElementById("password")
        let role = document.getElementById("role")
        name.value = this.userData[index].name
        email.value = this.userData[index].email
        // name.password = this.userData[index].password
        role.value = this.userData[index].role
        this.updateId = this.userData[index].id
        this.addUserToggle(true)
    }
    clear() {
        document.getElementById("u-name").value = ''
        document.getElementById("email").value = ''
        document.getElementById("password").value = ''
        document.getElementById("role").value = ''
        document.getElementById('submit-btn').textContent = 'Add User'
        this.updateId = ''
    }
    updateUserData() {
        let name = document.getElementById("u-name").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let role = document.getElementById("role").value

        if (name != '', email != '', role != '') {
            let payload = {
                user_id: this.updateId ? this.updateId : null,
                password: password ? password : null,
                user_name: name,
                email_id: email,
                role: role,
            }
            fetch(`Controller/admin_user.php?action=admin_addUpdate_user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.storage.userData.token },
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        document.getElementById('submit-btn').textContent = 'Add User'
                        this.updateId = ''
                        this.getUserDetails()
                    } else {
                        this.notify.showNotification(data.message, "danger")
                    }
                }).catch((err) => {
                    this.notify.showNotification(`Error while fetching user detail ${err}`, 'danger')
                });

        }
        else {
            this.notify.showNotification('Please fill all fields', 'warn')
        }
    }
    deleteUserData(){
        
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