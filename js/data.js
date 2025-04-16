// Datos simulados para el sistema de control de pagos

const tipoPagoCatalogo = [
  { id_tipo_pago: 1, descripcion: "Compatible", siglas: "CE" },
  { id_tipo_pago: 2, descripcion: "Salario", siglas: "PR" },
  { id_tipo_pago: 3, descripcion: "Viaje", siglas: "SA" },
  { id_tipo_pago: 4, descripcion: "Compatible", siglas: "DI" },
];

const tipoDevolucionCatalogo = [
  {
    id_tipo_devolucion: 1,
    descripcion: "Información incompleta",
    estado: "activo",
  },
  { id_tipo_devolucion: 2, descripcion: "Monto incorrecto", estado: "activo" },
];

const estadoCatalogo = [
  { id_estado: 1, descripcion: "creada" },
  { id_estado: 2, descripcion: "enviada" },
  { id_estado: 3, descripcion: "revisada" },
  { id_estado: 4, descripcion: "pagada" },
  { id_estado: 5, descripcion: "devuelta" },
  { id_estado: 6, descripcion: "anulada" },
];

const analistas = [
  {
    cedula_analista: "101",
    nombre: "Andrea Solano Vargas",
    correo: "andrea@empresa.com",
    estado: "A",
    id_usuario: "a1",
  },
  {
    cedula_analista: "102",
    nombre: "Luis Martínez Mora",
    correo: "luis@empresa.com",
    estado: "A",
    id_usuario: "a2",
  },
  {
    cedula_analista: "103",
    nombre: "María Rodríguez Arce",
    correo: "maria@empresa.com",
    estado: "A",
    id_usuario: "a3",
  },
  {
    cedula_analista: "104",
    nombre: "Fernando Jiménez Porras",
    correo: "fernando@empresa.com",
    estado: "A",
    id_usuario: "a4",
  },
  {
    cedula_analista: "105",
    nombre: "Sofía López Rivera",
    correo: "sofia@empresa.com",
    estado: "A",
    id_usuario: "a5",
  },
  {
    cedula_analista: "106",
    nombre: "Jorge Castillo Alfaro",
    correo: "jorge@empresa.com",
    estado: "A",
    id_usuario: "a6",
  },
];

const coordinadores = [
  {
    id_coordinador: "201",
    nombre: "Carlos",
    primer_apellido: "Ramírez",
    segundo_apellido: "Vega",
    correo: "coordinador@email.com",
    estado: "A",
    id_usuario: "c1",
  },
];

const usuarios = [
  {
    id_usuario: "a1",
    id_cedula: "101",
    tipoUsuario: "analista",
    contrasena: "1234",
    fecha_creacion: "2024-01-01",
  },
  {
    id_usuario: "c1",
    id_cedula: "201",
    tipoUsuario: "coordinador",
    contrasena: "1234",
    fecha_creacion: "2024-01-01",
  },
];

// Simulación de órdenes de pago
let ordenesPago = [
  {
    id_documento: "ORD001",
    fecha_ingreso: "2025-04-01",
    acreedor: "Empresa XYZ",
    factura: "F001",
    monto: 1200,
    descuento: 100,
    impuesto: 0,
    moneda: "USD",
    id_estado: 2,
    documento_compensacion: "",
    fecha_factura: "2025-04-01",
    fecha_pago: "",
    fecha_vencimiento: "2025-04-15",
    id_coordinador: "201",
    id_tipo_pago: 1,
    urgente: false,
    cedula_analista: "",
  },
  {
    id_documento: "ORD002",
    fecha_ingreso: "2025-04-02",
    acreedor: "Servicios ABC",
    factura: "F002",
    monto: 850,
    descuento: 50,
    impuesto: 0,
    moneda: "CRC",
    id_estado: 2,
    documento_compensacion: "",
    fecha_factura: "2025-04-02",
    fecha_pago: "",
    fecha_vencimiento: "2025-04-20",
    id_coordinador: "201",
    id_tipo_pago: 2,
    urgente: true,
    cedula_analista: "",
  },
  {
    id_documento: "ORD003",
    fecha_ingreso: "2025-04-03",
    acreedor: "Consultoría Omega",
    factura: "F003",
    monto: 2300,
    descuento: 0,
    impuesto: 0,
    moneda: "EUR",
    id_estado: 2,
    documento_compensacion: "",
    fecha_factura: "2025-04-03",
    fecha_pago: "",
    fecha_vencimiento: "2025-04-25",
    id_coordinador: "201",
    id_tipo_pago: 3,
    urgente: false,
    cedula_analista: "",
  },
];

// Tabla de devoluciones
let devoluciones = [];

// Bitácora de movimientos
let bitacora = [];
