// Datos de ejemplo (simulados para demostración)
const reportesData = {
    porCoordinador: [
        { idPago: '001', coordinador: 'Coordinador 1', tipoPago: 'Efectivo', estado: 'Pagada', fechaPago: '2025-03-20' },
        { idPago: '002', coordinador: 'Coordinador 2', tipoPago: 'Transferencia', estado: 'Enviada', fechaPago: '2025-03-21' },
        { idPago: '003', coordinador: 'Coordinador 1', tipoPago: 'Tarjeta', estado: 'Pagada', fechaPago: '2025-03-22' },
    ],
    porAnalista: [
        { idPago: '001', analista: 'Analista 1', tipoPago: 'Efectivo', estado: 'Pagada', fechaPago: '2025-03-20' },
        { idPago: '002', analista: 'Analista 2', tipoPago: 'Transferencia', estado: 'Enviada', fechaPago: '2025-03-21' },
        { idPago: '003', analista: 'Analista 1', tipoPago: 'Tarjeta', estado: 'Pagada', fechaPago: '2025-03-22' },
    ],
    porTipoPago: [
        { idPago: '001', tipoPago: 'Efectivo', estado: 'Pagada', fechaPago: '2025-03-20' },
        { idPago: '002', tipoPago: 'Transferencia', estado: 'Enviada', fechaPago: '2025-03-21' },
        { idPago: '003', tipoPago: 'Tarjeta', estado: 'Pagada', fechaPago: '2025-03-22' },
    ]
};
function actualizarTabla(filtro) {
    let datosCoordinador = reportesData.porCoordinador;
    let datosAnalista = reportesData.porAnalista;
    let datosTipoPago = reportesData.porTipoPago;

    // Aplicar filtro de Coordinador (si no es "todos")
    if (filtro.coordinador !== 'todos') {
        datosCoordinador = datosCoordinador.filter(item => item.coordinador === filtro.coordinador);
    }

    // Aplicar filtro de Analista (si no es "todos")
    if (filtro.analista !== 'todos') {
        datosAnalista = datosAnalista.filter(item => item.analista === filtro.analista);
    }

    // Aplicar filtro de Tipo de Pago (si no es "todos") en ambas tablas (coordinador y analista)
    if (filtro.tipoPago !== 'todos') {
        datosCoordinador = datosCoordinador.filter(item => item.tipoPago === filtro.tipoPago);
        datosAnalista = datosAnalista.filter(item => item.tipoPago === filtro.tipoPago);
        datosTipoPago = datosTipoPago.filter(item => item.tipoPago === filtro.tipoPago);
    }

    // Limpiar las tablas antes de agregar los nuevos datos
    limpiarTablas();

    // Agregar los datos filtrados a cada tabla correctamente
    agregarDatosATabla('reporteCoordinadorTabla', datosCoordinador);
    agregarDatosATabla('reporteAnalistaTabla', datosAnalista);
    agregarDatosATabla('reporteTipoPagoTabla', datosTipoPago);
}


// Función para limpiar las tablas
function limpiarTablas() {
    document.getElementById('reporteCoordinadorTabla').innerHTML = '';
    document.getElementById('reporteAnalistaTabla').innerHTML = '';
    document.getElementById('reporteTipoPagoTabla').innerHTML = '';
}

// Función para agregar los datos a la tabla correspondiente
function agregarDatosATabla(idTabla, datos) {
    const tabla = document.getElementById(idTabla);

    datos.forEach(dato => {
        let fila = `<tr>
            <td>${dato.idPago}</td>
            <td>${dato.coordinador || dato.analista || dato.tipoPago}</td>
            <td>${dato.tipoPago}</td>
            <td>${dato.estado}</td>
            <td>${dato.fechaPago}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

// Event listeners para los filtros
document.getElementById('reporteCoordinador').addEventListener('change', function() {
    const filtro = {
        coordinador: this.value,
        analista: document.getElementById('reporteAnalista').value,
        tipoPago: document.getElementById('reporteTipoPago').value
    };
    actualizarTabla(filtro);
});

document.getElementById('reporteAnalista').addEventListener('change', function() {
    const filtro = {
        coordinador: document.getElementById('reporteCoordinador').value,
        analista: this.value,
        tipoPago: document.getElementById('reporteTipoPago').value
    };
    actualizarTabla(filtro);
});

document.getElementById('reporteTipoPago').addEventListener('change', function() {
    const filtro = {
        coordinador: document.getElementById('reporteCoordinador').value,
        analista: document.getElementById('reporteAnalista').value,
        tipoPago: this.value
    };
    actualizarTabla(filtro);
});

// Inicializar la tabla con todos los datos
actualizarTabla({
    coordinador: 'todos',
    analista: 'todos',
    tipoPago: 'todos'
});

document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("reportePorFechaPago");
    const filtroFecha = document.getElementById("fechaFiltroPago");

    if (!contenedor || !filtroFecha) return;

    filtroFecha.addEventListener("change", function () {
        const fechaSeleccionada = this.value;
        contenedor.innerHTML = "";

        const pagos = ordenesPago.filter(o => o.fecha_pago === fechaSeleccionada && o.id_estado === 4);

        pagos.forEach(p => {
            const tipo = tipoPagoCatalogo.find(tp => tp.id_tipo_pago === p.id_tipo_pago)?.descripcion || "Tipo";
            const row = document.createElement("li");
            row.innerHTML = `
                <strong>${p.id_documento}</strong> | ${p.acreedor} | ${tipo} | Monto: ${p.monto} | Fecha pago: ${p.fecha_pago}
            `;
            contenedor.appendChild(row);
        });

        if (pagos.length === 0) {
            contenedor.innerHTML = "<li>No hay pagos en esa fecha.</li>";
        }
    });
});
