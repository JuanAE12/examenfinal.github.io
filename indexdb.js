const dbConnection = window.indexedDB.open('academia', 2); //base de datos, version            
let db;

//on success = El successevent se dispara cuando un IDBRequesttiene éxito.
dbConnection.onsuccess = () => {
    db = dbConnection.result;
    console.log("Base de datos abierta", db);
}

// El upgradeneededevento se activa cuando se intentó abrir una base de datos 
// con un número de versión superior a su versión actual.

//creamos tabla usuario
dbConnection.onupgradeneeded = (e) => {
    db = e.target.result;//elemento que nos devuelve
    console.log("Crear objetos de DB", db);
    const coleccionObjetos = db.createObjectStore('usuario', { 
        keyPath: 'clave', autoIncrement:true
    }); //nombre de la tabla, clave de la tabla , autoincremento
}

dbConnection.onerror = (error) =>{
    console.log(error);
}

const insertarusuario = () =>{
    // recuperando los datos de los inputs
    //var _nombre = document.getElementById('nombre').value;
    var _usuario="juan";
    var _pass="juan";
    var _nombre="Juan de Dios Abad martinez Ticona";
    var _telefono="77211367";

    // creando un objeto articulo 
    var art = {nombre: _nombre, telefono: _telefono , usuario: _usuario , pass: _pass};
    var transaccion = db.transaction("usuario", "readwrite");
    const objeto = transaccion.objectStore('usuario');
    // insertar en el objeto
    // const cargarInfo= objeto.add(informacion);
    const cargarInfo= objeto.add(art);
    console.log("cargar informacion",cargarInfo);
}


const devolverusuario = ()=>{
    var usuario = document.getElementById('usuario').value;
    var pass = document.getElementById('pass').value;
    var sw = false;

    db = dbConnection.result;
    // lectura de tablas
    var transaccion = db.transaction("usuario", "readonly");
    const objeto = transaccion.objectStore('usuario');
    console.log(objeto);
    // iterar los elementos
    const cursor = objeto.openCursor();
    cursor.onsuccess = (e) =>{
        const c = e.target.result;
        if (c){
            // insertando en el html de UL, se realizo algunas concatenaciones adicionales
            //lista.innerHTML += "<li class='list-group-item'>"+c.value['clave']+'--'+c.value['nombre']+"</li>"
            console.log(c.value['clave']+" "+c.value['usuario']+" "+c.value['pass']);
            var passuser=new String(c.value['usuario']);
            var passbase= new String(c.value['pass']);
            if(passuser==usuario && passbase==pass){
                sw=true;
                console.log(sw);
                location.href ="usuario.html";
            }
            c.continue();
        } 
    };
    /*if (sw==false){
        alert("USUARIO O CONTRASEÑA INCORRECTOS");
    } else if (sw=true){
        location.href ="usuario.html";
    }*/
}
//metodo ELIMINAR
/*const eliminar = (clave) =>{
    var transaccion = db.transaction("articulo", "readwrite");
    const objeto = transaccion.objectStore('articulo');
    // insertar en el objeto
    const eliminado = objeto.delete(clave);
    eliminado.onsuccess = () => {
        devolver();
    }
    eliminado.onerror = (error) => {
        console.log(error);
    }
    
}*/
//metodo Aactualizar
/*const actualizar = (informacion) =>{
    var transaccion = db.transaction("articulo", "readwrite");
    const objeto = transaccion.objectStore('articulo');
    // insertar en el objeto
    const actualizarInfo= objeto.put(informacion);
    if (actualizarInfo)
        console.log("Se agrego con exito", actualizarInfo );
}*/
//metodo devolver
/*const devolver = ()=>{
    // Lista de boostrapp visualizar
    var lista = document.getElementById("mostrarLista");
    console.log(lista);
    db = dbConnection.result;
    // lectura de tablas
    var transaccion = db.transaction("articulo", "readonly");
    const objeto = transaccion.objectStore('articulo');
    console.log(objeto);
    // iterar los elementos
    const cursor = objeto.openCursor();
    cursor.onsuccess = (e) =>{
        const c = e.target.result;
        if (c){
            // insertando en el html de UL, se realizo algunas concatenaciones adicionales
            lista.innerHTML += "<li class='list-group-item'>"+c.value['clave']+'--'+c.value['nombre']+"</li>"
            c.continue();
        } else {
            console.log("no tiene datos");
        }
    }
}*/