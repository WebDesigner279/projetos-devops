// script.js

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
  
  // Armazena os dados no localStorage
  let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
  vehicles.push(vehicle);
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
  });
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
  
  filteredVehicles.forEach(vehicle => {
      const row = vehicleTable.insertRow();
      
      row.insertCell(0).innerText = vehicle.vehicleType;
      row.insertCell(1).innerText = vehicle.plate;
      row.insertCell(2).innerText = vehicle.color;
      row.insertCell(3).innerText = vehicle.owner;
      row.insertCell(4).innerText = vehicle.apartment;
      row.insertCell(5).innerText = vehicle.block;
  });
});

// Carrega a tabela ao carregar a página
updateVehicleTable();
