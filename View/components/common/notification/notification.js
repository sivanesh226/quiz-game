export class notification {
    constructor() { }
    showNotification(message, type) {
        let icon = type === 'success' ? 'check-lg' : type === 'danger' ? 'x-lg' : 'exclamation-lg'


        const container = document.getElementById("notification-container");

        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.innerHTML = `<i class="bi bi-${icon}"></i> ${message}`
        // notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}