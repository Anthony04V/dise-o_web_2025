document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("role") !== "coordinador") {
        window.location.href = "index.html";
    }

    const formPago = document.getElementById("formPago");
    const tablaPagos = document.getElementById("tablaPagos");
    const filtroTipo = document.getElementById("filtroTipo");

    let pagos = [];

    // Crear nuevo pago
    formPago.addEventListener("submit", function(event) {
        event.preventDefault();

        const descripcion = document.getElementById("descripcion").value.trim();
        const fechaVencimiento = document.getElementById("fechaVencimiento").value;
        const tipoPago = document.getElementById("tipoPago").value;

        if (descripcion === "" || fechaVencimiento === "") return;

        const nuevoPago = {
            id: pagos.length + 1,
            descripcion,
            fechaVencimiento,
            tipoPago,
            estado: "Creada"
        };

        pagos.push(nuevoPago);
        actualizarTabla();
        formPago.reset();
    });

    // Actualizar tabla de pagos
    function actualizarTabla() {
        tablaPagos.innerHTML = "";
        let tipoSeleccionado = filtroTipo.value;

        pagos.forEach(pago => {
            if (tipoSeleccionado === "todos" || pago.tipoPago === tipoSeleccionado) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${pago.descripcion}</td>
                    <td>${pago.fechaVencimiento}</td>
                    <td>${pago.tipoPago}</td>
                    <td>${pago.estado}</td>
                    <td>
                        ${pago.estado === "Creada" ? `<button class="btn btn-sm btn-success" onclick="enviarPago(${pago.id})">Enviar</button>` : ""}
                    </td>
                `;
                tablaPagos.appendChild(row);
            }
        });
    }

    // Enviar pago a analista
    window.enviarPago = function(id) {
        let pago = pagos.find(p => p.id === id);
        if (pago) {
            pago.estado = "Enviada";
            actualizarTabla();
        }
    };

    // Filtrar pagos
    filtroTipo.addEventListener("change", actualizarTabla);
});

// Cerrar sesión
function logout() {
    localStorage.removeItem("role");
    window.location.href = "index.html";
}


