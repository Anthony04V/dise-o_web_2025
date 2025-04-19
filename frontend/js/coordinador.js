document.addEventListener("DOMContentLoaded", function () {
  const role = localStorage.getItem("role")?.trim().toLowerCase();
  if (role !== "coordinador") {
    window.location.href = "login.html";
  }

  const formPago = document.getElementById("formPago");
  const tablaPagos = document.getElementById("tablaPagos");
  const filtroTipo = document.getElementById("filtroTipo");

  let pagos = [];

  formPago?.addEventListener("submit", function (event) {
    event.preventDefault();

    const descripcion = document.getElementById("descripcion").value.trim();
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const tipoPago = document.getElementById("tipoPago").value;
    const cedula_analista = document.getElementById("analista").value;

    if (descripcion === "" || fechaVencimiento === "") return;

    const nuevoPago = {
      id: pagos.length + 1,
      descripcion,
      fechaVencimiento,
      tipoPago,
      estado: "Creada",
      cedula_analista,
    };

    pagos.push(nuevoPago);
    actualizarTabla();
    formPago.reset();
  });

  function actualizarTabla() {
    tablaPagos.innerHTML = "";
    let tipoSeleccionado = filtroTipo?.value || "todos";

    pagos.forEach((pago) => {
      if (tipoSeleccionado === "todos" || pago.tipoPago === tipoSeleccionado) {
        let row = document.createElement("tr");
        const analistaNombre =
          analistas.find((a) => a.cedula_analista === pago.cedula_analista)
            ?.nombre || "No asignado";

        row.innerHTML = `
          <td>${pago.id}</td>
          <td>${pago.descripcion}</td>
          <td>${pago.fechaVencimiento}</td>
          <td>${pago.tipoPago}</td>
          <td>${pago.estado}</td>
          <td>${analistaNombre}</td>
          <td class="text-center">
            ${
              pago.estado === "Creada"
                ? `<button class="btn btn-sm btn-success" onclick="enviarPago(${pago.id})">Enviar</button>`
                : ""
            }
          </td>
        `;

        tablaPagos.appendChild(row);
      }
    });
  }

  window.enviarPago = function (id) {
    let pago = pagos.find((p) => p.id === id);
    if (pago) {
      pago.estado = "Enviada";
      actualizarTabla();
    }
  };

  filtroTipo?.addEventListener("change", actualizarTabla);

  // Segunda sección
  const user = {
    id_coordinador: localStorage.getItem("usuarioActual"),
    correo: localStorage.getItem("usuarioActual")
  };

  const analistaSelect = document.getElementById("analista");
  if (analistaSelect) {
    analistas.forEach((a) => {
      const option = document.createElement("option");
      option.value = a.cedula_analista;
      option.textContent = a.nombre;
      analistaSelect.appendChild(option);
    });
  }

  function mostrarOrdenes(tipoFiltro = "todos") {
    const lista = document.getElementById("listaOrdenes");
    if (!lista) return;

    lista.innerHTML = "";

    const misOrdenes = ordenesPago.filter(
      (o) => o.id_coordinador === user.id_coordinador
    );

    const ordenesFiltradas =
      tipoFiltro === "todos"
        ? misOrdenes
        : misOrdenes.filter((o) => o.id_tipo_pago === parseInt(tipoFiltro));

    ordenesFiltradas.forEach((o) => {
      const tipo =
        tipoPagoCatalogo.find((tp) => tp.id_tipo_pago === o.id_tipo_pago)
          ?.descripcion || "Desconocido";
      const estado =
        estadoCatalogo.find((e) => e.id_estado === o.id_estado)?.descripcion ||
        "Sin estado";
      const analista =
        analistas.find((a) => a.cedula_analista === o.cedula_analista)
          ?.nombre || "No asignado";

      const row = document.createElement("li");
      row.innerHTML = `
        <strong>${o.id_documento}</strong> | ${o.acreedor} | ${tipo} | Estado: ${estado} | Analista: ${analista}
        <button onclick="enviarAnalista('${o.id_documento}')">Enviar a Analista</button>
      `;

      lista.appendChild(row);
    });
  }

  window.enviarAnalista = function (id_documento) {
    const orden = ordenesPago.find((o) => o.id_documento === id_documento);
    if (orden) {
      orden.id_estado = 2;
      bitacora.push({
        id: bitacora.length + 1,
        cedula: user.id_coordinador,
        tabla: "ordenPago",
        columna: "id_estado",
        valor_antes: 1,
        valor_despues: 2,
        fecha_movimiento: new Date().toISOString(),
        transaccion: "UPDATE",
      });
      alert("Orden enviada al analista");
      mostrarOrdenes();
    }
  };

  window.crearOrden = function () {
    const nuevaOrden = {
      id_documento: document.getElementById("idOrdenPago").value,
      fecha_ingreso: new Date().toISOString().slice(0, 10),
      acreedor: document.getElementById("acreedor")?.value || "Sin nombre",
      factura: document.getElementById("factura").value,
      monto: parseFloat(document.getElementById("cantidad").value),
      descuento: 0,
      impuesto: 0,
      moneda: document.getElementById("tipoMoneda").value,
      id_estado: 1,
      documento_compensacion: "",
      fecha_factura:
        document.getElementById("fechaFactura")?.value ||
        new Date().toISOString().slice(0, 10),
      fecha_pago: "",
      fecha_vencimiento:
        document.getElementById("fechaVencimiento")?.value || "",
      id_coordinador: user.id_coordinador,
      id_tipo_pago: parseInt(document.getElementById("tipoPago").value),
      urgente: false,
      cedula_analista: document.getElementById("analista").value,
      fecha_revisada: "",
    };

    ordenesPago.push(nuevaOrden);
    bitacora.push({
      id: bitacora.length + 1,
      cedula: user.id_coordinador,
      tabla: "ordenPago",
      columna: "insert",
      valor_antes: "",
      valor_despues: JSON.stringify(nuevaOrden),
      fecha_movimiento: new Date().toISOString(),
      transaccion: "INSERT",
    });

    alert("Orden creada correctamente");
    mostrarOrdenes();
  };

  document.getElementById("filtroTipoPago")
    ?.addEventListener("change", function () {
      mostrarOrdenes(this.value);
    });

  mostrarOrdenes();
});

function logout() {
  localStorage.removeItem("usuarioActual");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
