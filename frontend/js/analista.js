document.addEventListener("DOMContentLoaded", function () {
    const userId = "a1";
    const user = analistas.find((a) => a.id_usuario === userId);
  
    const tablaBody = document.getElementById("tablaPagosAnalista");
    const filtroFecha = document.getElementById("fechaPago");
    const filtroTipoPago = document.getElementById("tipoPago");
  
    function renderizarOrdenesEnTabla() {
      tablaBody.innerHTML = "";
  
      let ordenesAsignadas = ordenesPago.filter(
        (o) => o.cedula_analista === user.cedula_analista || o.id_estado === 2
      );
  
      const fechaSeleccionada = filtroFecha.value;
      const tipoSeleccionado = filtroTipoPago.value;
  
      if (fechaSeleccionada) {
        ordenesAsignadas = ordenesAsignadas.filter((o) =>
          o.fecha_pago?.startsWith(fechaSeleccionada)
        );
      }
  
      if (tipoSeleccionado !== "todos") {
        ordenesAsignadas = ordenesAsignadas.filter((o) => {
          const tipoObj = tipoPagoCatalogo.find(
            (tp) => tp.id_tipo_pago === o.id_tipo_pago
          );
          return (
            tipoObj?.descripcion.toLowerCase() === tipoSeleccionado.toLowerCase()
          );
        });
      }
  
      ordenesAsignadas.forEach((o) => {
        const estado =
          estadoCatalogo.find((e) => e.id_estado === o.id_estado)?.descripcion ||
          "Estado";
        const tipo =
          tipoPagoCatalogo.find((tp) => tp.id_tipo_pago === o.id_tipo_pago)
            ?.descripcion || "Tipo";
        const fechaPago = o.fecha_pago || "Sin fecha";
  
        const fila = document.createElement("tr");
        fila.innerHTML = `
                  <td>${o.id_documento}</td>
                  <td>${tipo}</td>
                  <td>${fechaPago}</td>
                  <td>${estado}</td>
                  <td class="text-center">
                      <div class="d-flex justify-content-center gap-2">
                          <button class="btn btn-accent btn-sm" onclick="marcarPagado('${o.id_documento}')">Marcar Pagada</button>
                          <button class="btn btn-devolver btn-sm" onclick="devolverOrden('${o.id_documento}')">Devolver</button>
                      </div>
                  </td>
              `;
        tablaBody.appendChild(fila);
      });
    }
  
    window.marcarPagado = function (id_documento) {
      const orden = ordenesPago.find((o) => o.id_documento === id_documento);
      if (orden && orden.id_estado === 2) {
        orden.id_estado = 4;
        orden.fecha_pago = new Date().toISOString().slice(0, 10);
        orden.cedula_analista = user.cedula_analista;
  
        bitacora.push({
          id: bitacora.length + 1,
          cedula: user.cedula_analista,
          tabla: "ordenPago",
          columna: "id_estado",
          valor_antes: 2,
          valor_despues: 4,
          fecha_movimiento: new Date().toISOString(),
          transaccion: "UPDATE",
        });
  
        alert("Pago marcado como realizado.");
        renderizarOrdenesEnTabla();
      }
    };
  
    window.devolverOrden = function (id_documento) {
      const orden = ordenesPago.find((o) => o.id_documento === id_documento);
      if (orden && orden.id_estado === 2) {
        devoluciones.push({
          id_devolucion: devoluciones.length + 1,
          descripcion: "Revisión fallida",
          fecha_devolucion: new Date().toISOString(),
          cedula_devuelve: user.cedula_analista,
          id_tipo_devolucion: 1,
          id_documento: orden.id_documento,
          cedula_analista: user.cedula_analista,
        });
  
        orden.id_estado = 1;
  
        bitacora.push({
          id: bitacora.length + 1,
          cedula: user.cedula_analista,
          tabla: "ordenPago",
          columna: "id_estado",
          valor_antes: 2,
          valor_despues: 1,
          fecha_movimiento: new Date().toISOString(),
          transaccion: "UPDATE",
        });
  
        alert("Orden devuelta correctamente.");
        renderizarOrdenesEnTabla();
      }
    };
  
    filtroFecha.addEventListener("change", renderizarOrdenesEnTabla);
    filtroTipoPago.addEventListener("change", renderizarOrdenesEnTabla);
  
    renderizarOrdenesEnTabla();
  });
  