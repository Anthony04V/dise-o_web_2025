document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("role") !== "coordinador") {
      window.location.href = "index.html";
    }
  
    const formPago = document.getElementById("formPago");
    const tablaPagos = document.getElementById("tablaPagos");
    const filtroTipo = document.getElementById("filtroTipo");
  
    let pagos = [];
  
    // Crear nuevo pago
    formPago.addEventListener("submit", function (event) {
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
  
    // Actualizar tabla de pagos
    function actualizarTabla() {
      tablaPagos.innerHTML = "";
      let tipoSeleccionado = filtroTipo.value;
  
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
  
    // Enviar pago a analista
    window.enviarPago = function (id) {
      let pago = pagos.find((p) => p.id === id);
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
  
  function crearOrden() {
    const orden = {
      idOrdenPago: document.getElementById("idOrdenPago").value,
      factura: document.getElementById("factura").value,
      tipoMoneda: document.getElementById("tipoMoneda").value,
      tipoPago: document.getElementById("tipoPago").value,
      tipoDevolucion: document.getElementById("tipoDevolucion").value,
      cantidad: parseFloat(document.getElementById("cantidad").value),
      creadoPor: localStorage.getItem("usuarioActual") || "coordinador", // o el nombre real
      estado: document.getElementById("estado").value,
      fechaCreacion: new Date().toISOString(),
      cedula_analista: document.getElementById("analista").value,
    };
  
    // Simular guardado (puedes cambiarlo por localStorage o API real)
    console.log("Orden creada:", orden);
    alert("Orden registrada exitosamente.");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const userId = "c1"; // Simulación de coordinador conectado
    const analistaSelect = document.getElementById("analista");
    if (analistaSelect) {
      analistas.forEach((a) => {
        const option = document.createElement("option");
        option.value = a.cedula_analista;
        option.textContent = a.nombre;
        analistaSelect.appendChild(option);
      });
    }
  
    const user = coordinadores.find((c) => c.id_usuario === userId);
  
    function mostrarOrdenes(tipoFiltro = "todos") {
      const analista =
        analistas.find((a) => a.cedula_analista === o.cedula_analista)?.nombre ||
        "No asignado";
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
        orden.id_estado = 2; // enviada
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
  
    // Crear nueva orden
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
  
    // Filtro por tipo de pago
    document
      .getElementById("filtroTipoPago")
      ?.addEventListener("change", function () {
        mostrarOrdenes(this.value);
      });
  
    mostrarOrdenes();
  });
  