// script.js

let editIndex = null; // Índice do item sendo editado, null se for novo

document.getElementById("vehicleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const vehicleType = document.getElementById("vehicleType").value;
    const plate = document.getElementById("plate").value;
    const color = document.getElementById("color").value;
    const owner = document.getElementById("owner").value;
    const apartment = document.getElementById("apartment").value;
    const block = document.getElementById("block").value;

    // Armazena o novo veículo em um objeto
    const vehicle = { vehicleType, plate, color, owner, apartment, block };

    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    if (editIndex !== null) {
        // Se editIndex não for nulo, estamos editando um item existente
        vehicles[editIndex] = vehicle;
        editIndex = null; // Resetar editIndex
    } else {
        // Caso contrário, adicionar um novo item
        vehicles.push(vehicle);
    }

    // Salvar os dados atualizados no localStorage
    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    // Atualiza a tabela
    updateVehicleTable();

    // Limpa o formulário
    document.getElementById("vehicleForm").reset();
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

        // Botão de edição
        const editCell = row.insertCell(6);
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm";
        editButton.innerText = "Editar";
        editButton.onclick = function () {
            loadVehicleData(index);
        };
        editCell.appendChild(editButton);
    });
}

// Função para carregar os dados no formulário para edição
function loadVehicleData(index) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const vehicle = vehicles[index];

    document.getElementById("vehicleType").value = vehicle.vehicleType;
    document.getElementById("plate").value = vehicle.plate;
    document.getElementById("color").value = vehicle.color;
    document.getElementById("owner").value = vehicle.owner;
    document.getElementById("apartment").value = vehicle.apartment;
    document.getElementById("block").value = vehicle.block;

    // Armazena o índice do item sendo editado
    editIndex = index;
}

// Função para filtrar veículos
document.getElementById("searchInput").addEventListener("input", function () {
    const searchQuery = this.value.toLowerCase();
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const filteredVehicles = vehicles.filter(vehicle => {
        return (
            vehicle.vehicleType.toLowerCase().includes(searchQuery) ||
            vehicle.plate.toLowerCase().includes(searchQuery) ||
            vehicle.owner.toLowerCase().includes(searchQuery)
        );
    });

    const vehicleTable = document.getElementById("vehicleTable");
    vehicleTable.innerHTML = "";

    filteredVehicles.forEach((vehicle, index) => {
        const row = vehicleTable.insertRow();

        row.insertCell(0).innerText = vehicle.vehicleType;
        row.insertCell(1).innerText = vehicle.plate;
        row.insertCell(2).innerText = vehicle.color;
        row.insertCell(3).innerText = vehicle.owner;
        row.insertCell(4).innerText = vehicle.apartment;
        row.insertCell(5).innerText = vehicle.block;

        const editCell = row.insertCell(6);
        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm";
        editButton.innerText = "Editar";
        editButton.onclick = function () {
            loadVehicleData(index);
        };
        editCell.appendChild(editButton);
    });
});

// Carrega a tabela ao carregar a página
updateVehicleTable();
