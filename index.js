const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = '2000';
let nName = "";
let nRole = "";

let datosPersona = [
    { username: 'mariana', fullname: 'mariana pajon', password: 'marina32', role: 1 },
    { username: 'tino', fullname: 'faustino hernan asprilla', password: 'tino32', role: 2 },
    { username: 'maria', fullname: 'maria isabel urritia', password: 'maria32', role: 1 },
    { username: 'mariaLu', fullname: 'maria luisa calle', password: 'mariaLu32', role: 2 },
    { username: 'victor', fullname: 'victor hugo aristizabal', password: 'victor32', role: 1 },
]


let middSession = (username, password) => {
    console.log("ingreso aqui");
    return (req, res, next) => {
        let xFind = datosPersona.find(dper => dper.username == username && dper.password == password);
        if (xFind != undefined) {
            nName = xFind.fullname;
            next();
        } else {
            res.send("Usuario o contraseña invalidos");
        }
    }
}

let middPrincipal = (username, password, role) => {
    console.log("ingresando a middPrincipal");
    return (req, res, next) => {
        let pFind = datosPersona.find(dper => dper.username == username && dper.password == password && dper.role == role);
        if (pFind != undefined) {
            nRole = pFind.role;
            next();
        } else {
            res.send("Usuario, contraseña o rol invalidos");
        }
    }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//para que los archivos css se puedan reconocer
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
});

app.get('/addUsuario', (req, res, next) => {
    const { username, password } = req.query;
    middSession(username, password)(req, res, next);
}, (req, res, next) => {
    //res.send(`ha iniciado sesion en ruta sessionp. Bienvenido ${nName}`)
    res.redirect('/principal')
    //res.json(req.query);

}
);
app.get('/principal', (req, res, next) => {
    res.sendFile('views/principal.html', { root: __dirname });
})

app.get('/login', (req, res, next) => {
    const { username, password, role } = req.query;
    middPrincipal(username, password, role)(req, res, next);
    //res.json(req.query);
}, (req, res, next) => {
    if (nRole == 1) {
        res.redirect('/customers')
    } else {
        res.redirect('/control-panel')
    }
});

app.get('/customers', (req, res, next) => {
    res.send(`Bienvenido a Customers`);
});

app.get('/control-panel', (req, res, next) => {
    res.send(`Bienvenido a Control-panel`);
});

//quienessomos
app.get('/quienessomos', (req, res, next) => {
    res.send(`Bienvenido a Quienes somos`);
});
//contacts
app.post('/contacts', (req, res, next) => {
    res.send(`Bienvenido a Contacs`);
});
//put
app.put('/', (req, res, next) => {
    res.send(`Bienvenido a la ruta put`);
});
//patch
app.patch('/', (req, res, next) => {
    res.send(`Bienvenido a la ruta patch`);
});
//delete
app.delete('/', (req, res, next) => {
    res.send(`Bienvenido a la ruta delete`);
});
app.listen(port, () => {
    console.log(`server is running in http://localhost:${port}`)
})