let riskChart;

document.addEventListener("DOMContentLoaded", function () {
    initChart();
    
    const form = document.getElementById("predictionForm");
    
    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const btn = document.getElementById("predictBtn");
            const btnText = btn.querySelector('.btn-text');
            const loader = btn.querySelector('.loader');
            
            // UI Loading state
            btn.disabled = true;
            btnText.style.display = 'none';
            if(loader) loader.style.display = 'block';

            const distance = document.getElementById("distance").value;
            const velocity = document.getElementById("velocity").value;
            const mass = document.getElementById("mass").value;
            
            try {
                const response = await fetch("http://127.0.0.1:5000/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        distance: distance,
                        velocity: velocity,
                        mass: mass
                    })
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                
                // Update Results UI
                document.getElementById("probability").innerText = (data.risk * 100).toFixed(2) + "%";
                document.getElementById("riskScore").innerText = data.risk.toLocaleString(); // using risk as score
                
                const riskLevelEl = document.getElementById("riskLevel");
                riskLevelEl.innerText = data.level;
                
                // Update badge color
                riskLevelEl.className = "level-badge";
                if(data.level.includes("HIGH")) riskLevelEl.classList.add("high");
                else if(data.level.includes("MEDIUM")) riskLevelEl.classList.add("medium");
                else riskLevelEl.classList.add("low");

                updateGraph(data.risk);
                
            } catch (error) {
                console.error("Error during prediction:", error);
                alert("Failed to connect to backend context. Make sure Flask API is running.");
            } finally {
                // Restore button state
                btn.disabled = false;
                btnText.style.display = 'block';
                if(loader) loader.style.display = 'none';
            }
        });
    }

    // Handle CSV File upload selection display
    const csvInput = document.getElementById('csvFile');
    if (csvInput) {
        csvInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
            document.getElementById('fileName').textContent = fileName;
        });
    }
});

function initChart() {
    const ctx = document.getElementById("riskChart");
    if (!ctx) return;
    
    // Set chart defaults for dark theme
    Chart.defaults.color = '#a8c4ff';
    Chart.defaults.borderColor = 'rgba(63, 169, 255, 0.1)';
    
    riskChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Start"],
            datasets: [{
                label: "Collision Probability Trend",
                data: [0],
                borderColor: '#3fa9ff',
                backgroundColor: 'rgba(63, 169, 255, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#00d4ff',
                pointRadius: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
}

function updateGraph(probability) {
    if (!riskChart) return;
    
    if (riskChart.data.labels.length > 8) {
        riskChart.data.labels.shift();
        riskChart.data.datasets[0].data.shift();
    }

    riskChart.data.labels.push("E" + (riskChart.data.labels.length));
    riskChart.data.datasets[0].data.push(probability);

    riskChart.update();
}

function loadCSV() {
    const fileInput = document.getElementById("csvFile");
    const file = fileInput ? fileInput.files[0] : null;

    if (!file) {
        alert("Please upload a CSV file");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const tableBody = document.querySelector("#dataTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "<tr><td colspan='4'>Processing...</td></tr>";

    fetch("http://127.0.0.1:5000/batch_predict", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        tableBody.innerHTML = "";

        if (!data.results || data.results.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
            return;
        }

        data.results.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.distance.toFixed(1)}</td>
                <td>${item.velocity.toFixed(1)}</td>
                <td>${item.mass.toFixed(1)}</td>
                <td style="color: ${item.risk > 0.7 ? '#ff4d4d' : item.risk > 0.4 ? '#ffaa00' : '#4dff88'}">
                    ${(item.risk * 100).toFixed(2)}% (${item.level})
                </td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Error during batch prediction:", error);
        tableBody.innerHTML = "<tr><td colspan='4'>Error processing dataset. Make sure Flask API is running.</td></tr>";
        alert("Failed to connect to backend context. Make sure Flask API is running.");
    });
}