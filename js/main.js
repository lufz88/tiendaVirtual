let eleccion;
let total = 0;
let cuotas;
let cuota;
let pregunta;
let stringProductos;

class Producto {
    constructor(nombre, precio, codigo) {
        this.nombre = nombre;
        this.precio = precio;
        this.codigo = codigo;
    }
}

let producto1 = new Producto("Pantalón", 5000, 1);
let producto2 = new Producto("Remera", 4000, 2);
let producto3 = new Producto("Zapatillas", 10000, 3);
let producto4 = new Producto("Guantes", 1000, 4);
let producto5 = new Producto("Gorro", 2000, 5);
let producto6 = new Producto("Buzo", 8000, 6);

let productos = [];
productos.push(producto1, producto2, producto3, producto4, producto5, producto6);

function iniciar() {
    mostrarProductos(productos)
    elegirProducto();
    comprarMas();    
    cuotas = prompt("Ingrese la cantidad de cuotas");
    calculadorCuotas(total, cuotas);
    alert(`Pagará $${total} en ${cuotas} cuotas de $${cuota}`);
}

function calculadorCuotas(total, cuotas) {
    if (total > 0 && cuotas > 0) {
        cuota = (total / cuotas).toFixed(2);
        return;
    } else {
        alert(`Ingrese un precio y/o cuotas válidos`);
        iniciar();
    }
}

function mostrarProductos(arr) { //puedo usar forEach
    let listaProductos = [];
    productos.forEach(producto => {
        let mostrar = `${producto.codigo}- ${producto.nombre}`; 
        listaProductos.push(mostrar); })
    stringProductos = listaProductos.join("; ");
}


function elegirProducto() {
    eleccion = prompt(`Elija el producto deseado: ${stringProductos}`)
    if (eleccion > 0 && eleccion <= productos.length) {
        total += productos[eleccion - 1].precio;
    } else {
        alert("Elija un número válido");
        elegirProducto();
    }
}

function comprarMas() {
    pregunta = prompt("¿Desea otro producto?").toUpperCase();
    while(pregunta === "SI") {
        elegirProducto();
        pregunta = prompt("¿Desea otro producto?").toUpperCase();
    }
}

iniciar()