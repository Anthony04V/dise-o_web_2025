const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'sa',
    password: 'admin12',
    server: 'localhost',
    database: 'WebDB',
    options: {
        trustServerCertificate: true,
        encrypt: true
    }
};

app.get('/', (req, res) => {
    res.send('Backend WebDB con SQL Auth funcionando');
});

app.get('/api/usuarios', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT * FROM Usuario');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/usuarios', async (req, res) => {
    const { id_cedula, tipo_Usuario, Contraseña, nombre } = req.body;
    try {
        await sql.connect(dbConfig);
        await sql.query`INSERT INTO Usuario (id_cedula, tipo_Usuario, Contraseña, nombre) VALUES (${id_cedula}, ${tipo_Usuario}, ${Contraseña}, ${nombre})`;
        res.status(201).send('Usuario insertado correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.post('/api/login', async (req, res) => {
    const { cedula, password } = req.body;

    console.log("⚡ Login recibido:", cedula, password);

    try {
        await sql.connect(dbConfig);

        // 👇 FORZAMOS a imprimir el query completo
        const result = await sql.query`
            SELECT * FROM Usuario 
            WHERE id_cedula = ${parseInt(cedula)} 
            AND Contraseña = ${password}
        `;

        console.log("🔎 Resultado:", result.recordset);

        if (result.recordset.length > 0) {
            console.log("✅ Login exitoso");
            res.json(result.recordset[0]);
        } else {
            console.log("❌ Credenciales incorrectas");
            res.status(401).send('Credenciales inválidas');
        }
    } catch (err) {
        console.log("🔥 ERROR CAPTURADO 🔥");
        console.error(err); // 🧨 IMPRIME el error completo
        res.status(500).send('Error interno: ' + err.message);
    }
});

app.get('/api/analistas', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query('SELECT * FROM Analista');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.get('/api/ordenes', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query('SELECT * FROM OrdenPago');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

  app.post('/api/ordenes', async (req, res) => {
    const {
      id_documento, factura, monto, moneda, id_tipo_pago, id_tipo_devolucion,
      id_estado, descripcion, fecha_vencimiento, id_coordinador, cedula_analista
    } = req.body;
  
    try {
      await sql.connect(dbConfig);
      await sql.query`
        INSERT INTO OrdenPago (
          id_documento, factura, monto, moneda, id_tipo_pago, id_tipo_devolucion,
          id_estado, descripcion, fecha_vencimiento, id_coordinador, cedula_analista
        )
        VALUES (
          ${id_documento}, ${factura}, ${monto}, ${moneda}, ${id_tipo_pago}, ${id_tipo_devolucion},
          ${id_estado}, ${descripcion}, ${fecha_vencimiento}, ${id_coordinador}, ${cedula_analista}
        )
      `;
      res.status(201).send('Orden creada exitosamente');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});