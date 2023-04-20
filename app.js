const { error } = require('console');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host: 'db4free.net',
    user: 'sugarrushadmin',
    password: 'ArgentinaPrograma4-0',
    database: 'sugarrush'

})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexión exitosa');
    }
});

app.get('/', function (req, res) {
    res.send('Ruta inicio');
});

app.get('/usuarios', function (req, res) {
    conexion.query('SELECT * FROM usuarios', (error, filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

app.get('/usuarios/:id', function (req, res) {
    conexion.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (error, fila)=>{
        if (error) {
            throw error;
        } else {
            res.send(fila);
        }
    })
});

app.post('/usuarios', (req, res) => {
    let data = {usuario: req.body.usuario, password: req.body.password, email: req.body.email, telefono: req.body.telefono, nombre: req.body.nombre,
    apellido: req.body.apellido, direccion: req.body.direccion};

    let sql = 'INSERT INTO usuarios SET ?';

    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    })    
});

app.post('/usuarios/validar', (req, res) => {
    let user = req.body.usuario;
    let pass = req.body.password;
    let sql = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';

    conexion.query(sql, [user, pass], function (error, valid) {
        if (error) {
            throw error;
        } else  {
            res.send(valid);
        }; 
    });
});

const PORT = process.env.PORT;

app.listen('3000', function () {
    console.log('Servidor ok en puerto: ');
});