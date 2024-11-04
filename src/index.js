const express = require('express');
const { Pool } = require('pg');
const csvParser = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const fastcsv = require('fast-csv');

const app = express();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',         
    host: 'localhost',         
    database: 'RecursosHumanos',  
    password: '123', 
    port: 5432,                
});

// Configuración de multer para manejar archivos CSV
const upload = multer({ dest: 'uploads/' });

// Endpoint 1: Importar datos desde un archivo CSV a una tabla de PostgreSQL
app.post('/import-csv', upload.single('file'), (req, res) => {
    const filePath = req.file.path;

    const insertData = async (row) => {
        const query = `INSERT INTO employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) VALUES (200, Flavia, Castro, flavcastro@gmail.com, 0994912008, 2000-10-12, 100, 2500, 10, 123, 50)`;
        await pool.query(query, [row.columna1, row.columna2, row.columna3]);
    };

    // Lee el archivo CSV y guarda cada fila en la tabla
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            insertData(row).catch(err => console.error(err));
        })
        .on('end', () => {
            fs.unlinkSync(filePath); // Elimina el archivo temporal
            res.send('CSV importado exitosamente a la base de datos');
        });
});



// Endpoint 2: Exportar datos desde PostgreSQL a un archivo CSV
app.get('/export-csv', (req, res) => {
    const query = 'SELECT * FROM employees'; 

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al exportar datos');
            return;
        }

        const csvStream = fastcsv.format({ headers: true });
        res.setHeader('Content-Disposition', 'attachment; filename=datos.csv');
        res.setHeader('Content-Type', 'text/csv');

        csvStream.pipe(res).on('end', () => res.end());
        result.rows.forEach(row => csvStream.write(row));
        csvStream.end();
    });
});

// Modificar un registro
app.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, valor } = req.body; 
    await pool.query('UPDATE employees SET nombre = $1, valor = $2 WHERE id = $3', [nombre, valor, id]);
    res.redirect('/');
});

// Eliminar un registro
app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM employees WHERE employee_id = $1', [employee_id]);
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


// Inicializar servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
