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

/* ------------------------ FUNCIONES CON USUARIOS ------------------------ */
// Recuperar lista de Usuarios

app.get('/usuarios', function (req, res) {
    conexion.query('SELECT * FROM usuarios', (error, filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

// Recuperar usuario por ID 
app.get('/usuarios/:id', function (req, res) {
    conexion.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (error, fila)=>{
        if (error) {
            throw error;
        } else {
            res.send(fila);
        }
    })
});

// Insertar un nuevo usuario 
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

// Valida si el usuario y contraseña coincide con un registro
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

/* ------------------------ FUNCIONES CON PRODUCTOS ------------------------ */
// Recuperar lista de productos
app.get('/productos', function (req, res) {
    conexion.query('SELECT * FROM productos', (error, filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

// Recuperar un producto por ID
app.get('/productos/:id', function (req, res) {
    conexion.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (error, filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

// Insertar un nuevo producto
app.post('/productos', (req, res)=> {
    let data = {name: req.body.name, image: req.body.image, price: req.body.price, description: req.body.description};
    let sql = 'INSERT INTO productos SET ?';
    conexion.query(sql, data, function (error, results) {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

// Insertar varios productos
app.post('/productos/insertar', (req, res)=> {
    let data = {name: req.body.name, image: req.body.image, price: req.body.price, description: req.body.description};
    data.forEach(item => {
        let sql = 'INSERT INTO productos SET ?';
        conexion.query(sql, item, function (error, results) {
            if (error) {
                throw error;
            } else {
                res.send(results);
            }
        });
    });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Servidor ok en puerto: '+PORT);
});