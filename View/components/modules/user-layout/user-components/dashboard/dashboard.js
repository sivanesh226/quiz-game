export class userDashboard {
    constructor() {
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
        // ctx = document.getElementById('canvas').getContext("2d")

    }
    categoryPopup() {
        let popup = document.getElementById('popup');
        popup.style.display = 'flex';
    }
    closePopup() {
        let popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

}