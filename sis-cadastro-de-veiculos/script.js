
let editIndex = null; // Índice do item sendo editado, null se for novo

document.getElementById("vehicleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const vehicleType = document.getElementById("vehicleType").value;
    const plate = document.getElementById("plate").value;
    const color = document.getElementById("color").value;
    const owner = document.getElementById("owner").value;
    const apartment = document.getElementById("apartment").value;
    const block = document.getElementById("block").value;
    const parkingSpot = document.getElementById("parkingSpot").value;
    const entryTime = document.getElementById("entryTime").value;
    const entryDate = document.getElementById("entryDate").value;
    const parkingDuration = parseInt(document.getElementById("parkingDuration").value);
    

    // Cria um objeto para o novo veículo
    const vehicle = { vehicleType, plate, color, owner, apartment, block, parkingSpot, entryTime, entryDate, parkingDuration };

    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    if (editIndex !== null) {
        vehicles[editIndex] = vehicle; // Atualiza o item existente
        editIndex = null;
    } else {
        vehicles.push(vehicle); // Adiciona novo item
    }

    localStorage.setItem("vehicles", JSON.stringify(vehicles)); // Salva no localStorage
    updateVehicleTable(); // Atualiza a tabela
    document.getElementById("vehicleForm").reset(); // Limpa o formulário
});

function updateVehicleTable() {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicleTable = document.getElementById("vehicleTable");
    vehicleTable.innerHTML = "";

    vehicles.forEach((vehicle, index) => {
        const row = vehicleTable.insertRow();

        row.insertCell(0).innerText = vehicle.vehicleType;
        row.insertCell(1).innerText = vehicle.plate;
        row.insertCell(2).innerText = vehicle.color;
        row.insertCell(3).innerText = vehicle.owner;
        row.insertCell(4).innerText = vehicle.apartment;
        row.insertCell(5).innerText = vehicle.block;
        row.insertCell(6).innerText = vehicle.parkingSpot;
        row.insertCell(7).innerText = vehicle.entryTime;
        row.insertCell(8).innerText = vehicle.entryDate;
        row.insertCell(9).innerText = vehicle.parkingDuration;

        // Cria célula de ações com botões de editar e excluir
        const actionsCell = row.insertCell(10);
        actionsCell.className = "actions-cell"; // Adiciona a classe para exibir os botões lado a lado

        // Botão de edição
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm";
        editButton.innerText = "Editar";
        editButton.onclick = function () {
            loadVehicleData(index);
        };
        actionsCell.appendChild(editButton);

        // Botão de exclusão
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.innerText = "Excluir";
        deleteButton.onclick = function () {
            deleteVehicle(index);
        };
        actionsCell.appendChild(deleteButton);
    });
}

function loadVehicleData(index) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicle = vehicles[index];

    document.getElementById("vehicleType").value = vehicle.vehicleType;
    document.getElementById("plate").value = vehicle.plate;
    document.getElementById("color").value = vehicle.color;
    document.getElementById("owner").value = vehicle.owner;
    document.getElementById("apartment").value = vehicle.apartment;
    document.getElementById("block").value = vehicle.block;
    document.getElementById("parkingSpot").value = vehicle.parkingSpot;
    document.getElementById("entryTime").value = vehicle.entryTime;
    document.getElementById("entryDate").value = vehicle.entryDate;
    document.getElementById("parkingDuration").value = vehicle.parkingDuration;

    editIndex = index; // Define o índice para edição
}

function deleteVehicle(index) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    vehicles.splice(index, 1); // Remove o veículo do array
    localStorage.setItem("vehicles", JSON.stringify(vehicles)); // Atualiza o localStorage
    updateVehicleTable(); // Atualiza a tabela
}

function filterVehicles() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#vehicleTable tr");

    rows.forEach(row => {
        const [vehicleType, plate, , owner] = row.cells;
        const text = `${vehicleType.textContent} ${plate.textContent} ${owner.textContent}`.toLowerCase();
        
        row.style.display = text.includes(searchInput) ? "" : "none";
    });
}

    // Manipulador para o botão "Cancelar Edição"
    document.getElementById("btnCancelar").addEventListener("click", function () {
    document.getElementById("vehicleForm").reset(); // Limpa o formulário
    editIndex = null; // Reseta o índice de edição
});

    // Adiciona o evento para o campo de busca
    document.getElementById("searchInput").addEventListener("input", filterVehicles);

    // Carrega a tabela ao carregar a página
    updateVehicleTable();




