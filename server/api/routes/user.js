const express = require('express');
const router = express.Router();


const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
    mysqlConnection.query('select * from usuarios', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/login', (req, res)=>{
    const { email, password } = req.body;

    mysqlConnection.query('select * from usuarios where email=? and password=?',
        [email, password],
        (err, rows, fields) =>{
            if(!err){
                if(rows.length > 0){
                    const user = rows[0];
                    let data = JSON.stringify({email:user.email, nombre: user.nombre});
                    if(data.includes(undefined)){
                        res.status(401).json("Usuario o clave incorrectos.");
                        return;
                    }
                    const token = jwt.sign(data, 'secret');
                    res.status(200).json({token, idUsuario: user.idUsuario});
                } else{
                    res.status(401).json("Usuario o clave incorrectos.");
                    console.log(rows[0]);

                }
            } else{
                console.log(err)
            }
        }
    )
})

router.post('/test', verifyToken, (req, res)=>{
    res.json('Informacion secreta');
});

router.get('/session-status', verifyToken, (req, res) =>{
    res.json({isLoggedIn: true});
});


function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');
    
    const token = req.headers.authorization.substr(7);
    if (token !== '' && token !== undefined && token !== null) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const content = jwt.verify(token, 'secret');
          req.data = content;
          next();
        } else {
          res.status(401).json('Token inválido');
        }
      } catch (err) {
        res.status(401).json('Token inválido');
      }
    } else {
      res.status(401).json('Token vacío');
    }
}


router.post('/signup', (req, res)=>{
    let user = req.body;
    query = 'SELECT * from usuarios where email=?';
    mysqlConnection.query
})

router.post("/register", function(req, res){
    const datos = req.body;
    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let email = datos.email;
    let password = datos.password;
    
    let buscar = "SELECT * FROM usuarios WHERE email = '" + email + "'";
    
    mysqlConnection.query(buscar, function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Error en el servidor');
        } else {
            if(row.length > 0){
                console.log("Email ya registrado");
                return res.status(409).json({ error: 'Email ya registrado' });
            } else {

                if(!nombre || !email || !apellido || !password){
                    console.log('Faltan datos.')
                    return res.status(409).json({ error: 'All fields are required' });
                }

                let registrar = "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ('" + nombre + "', '" + apellido + "', '" + email + "', '" + password + "')";

                mysqlConnection.query(registrar, function(err){
                    if(err) {
                        console.error(err);
                        return res.status(500).send('Error en el servidor');
                    }

                    console.log("Datos almacenados correctamente");
                    return res.status(200).json({ message: 'Datos almacenados correctamente' });
                });
            }
        }
    });
});

router.get('/get-username', (req, res) =>{
    const { idUsuario } = req.query;

    if(!idUsuario){
        return res.status(400).json("Sesion no iniciada.");
    }

    mysqlConnection.query('SELECT nombre FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, rows, fields)=>{
        if(err){
            console.error(err);
            return res.status(500).json("Error en el servidor.");
        }

        if (rows.length > 0) {
            const user = rows[0];
            res.status(200).json({ nombre: user.nombre });
        } else {
            res.status(404).json("Usuario no encontrado.");
        }
    });
})

// --- modificar usuario ---

router.post('/mod-nombre', (req, res) =>{
    const data = req.body;
    const idUsuario = data.idUsuario;
})

// --- favourite games ---

router.post('/insert-game', (req, res) => {
    const data = req.body;
    const idUsuario = data.idUsuario;
    const idJuego = data.idJuego;

    let query = "INSERT INTO favoritosXusuario (idUsuario, idJuego) VALUES ('" + idUsuario + "', '" + idJuego + "')";
    mysqlConnection.query(query, function(error){
        if(error){
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

    console.log('Juego agregado a favoritos correctamente.')
    return res.status(200).json({ message: 'Datos almacenados correctamente' });
    });
});

router.post('/insert-game-2', (req, res) =>{
    const data = req.body;
    const idUsuario = data.idUsuario;
    const idJuego = data.idJuego;

    let buscar = "SELECT idJuego FROM favoritosxusuario WHERE idUsuario = '" + idUsuario + "'AND idJuego = '" + idJuego + "'";
    mysqlConnection.query(buscar, function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Error en el servidor');
        } else{
            if(row.length > 0){
                console.log("Juego ya agregado a favoritos");
                return res.status(409).json({error: 'Juego ya agregado a favoritos'});
            } else{
                let add = "INSERT INTO favoritosXusuario (idUsuario, idJuego) VALUES ('" + idUsuario + "', '" + idJuego + "')";

                mysqlConnection.query(add, function(err){
                    if(err){
                        console.error(err);
                        return res.status(500).send('Error en el servidor');
                    }

                    console.log('Datos almacenados correctamente');
                    return res.status(200).json({message: 'Datos almacenados correctamente'});
                });
            }
        }
    });
});

router.post('/delete-game', (req, res) => {
    const datos = req.body;
    const idUsuario = datos.idUsuario;
    const idJuego = datos.idJuego;

    let query = `DELETE FROM favoritosXusuario WHERE idUsuario = ${idUsuario} AND idJuego = ${idJuego};`;
    mysqlConnection.query(query, function(error){
        if(error){
          console.log(error);
          return res.status(500).send('Error en el servidor');
        }
  
        console.log('Juego eliminado de favoritos correctamente.')
        return res.status(200).json({ message: 'Juego eliminado de favoritos correctamente'});
      });
});

router.get('/show-fav-games', async (req, res) =>{
    const idUsuario = req.query.idUsuario;

    try {

        const query = 'SELECT idJuego FROM favoritosXusuario WHERE idUsuario = ?';
    
        mysqlConnection.query(query, idUsuario, (err, results)=>{
          if(results){
            return res.status(200).json(results);
          }
        });
      }catch (error) {
        console.error('Error al obtener juegos favoritos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
});


// --- puntajes ---

router.post('/puntear', (req, res) =>{
    const datos = req.body;
    const idUsuario = datos.idUsuario;
    const idJuego = datos.idJuego;
    const puntaje = datos.puntaje;

    let query = "INSERT INTO comentarios (idUsuario, idJuego, puntaje) VALUES ('" + idUsuario + "', '" + idJuego + "', '" + puntaje + "')";
    mysqlConnection.query(query, function(error){
        if(error){
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }

    console.log('Comentario agregado correctamente.');
    return res.status(200).json({ message: 'Comentario almacenado correctamente' });
    });
});

router.get('/show-scores', (req, res) =>{
    const idJuego = req.query.idJuego;

    try{
        const query = 'SELECT idUsuario, puntaje FROM comentarios WHERE idJuego = ?';

        mysqlConnection.query(query, idJuego, (err, results)=>{
            if(results){
                return res.status(200).json(results);
            }
        });
    } catch (error){
        console.error('Error al obtener puntajes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



module.exports = router;


