const cardsContainer = document.getElementById("cards-container"); 

let eleccion;
let total = 0;
let cuotas;
let cuota;
let pregunta;
let stringProductos;

class Producto {
    constructor(nombre, precio, codigo, foto) {
        this.nombre = nombre;
        this.precio = precio;
        this.codigo = codigo;
        this.foto = foto;
    }
}

let producto1 = new Producto("Pantalón", 5000, 1, "./img/pantalon.jpg");
let producto2 = new Producto("Remera", 4000, 2, "./img/remera.jpg");
let producto3 = new Producto("Zapatillas", 10000, 3, "./img/zapatillas.jpg");
let producto4 = new Producto("Guantes", 1000, 4, "./img/guantes.jpg");
let producto5 = new Producto("Gorro", 2000, 5, "./img/gorro.jpg");
let producto6 = new Producto("Buzo", 8000, 6, "./img/buzo.jpg");

let productos = [];
productos.push(producto1, producto2, producto3, producto4, producto5, producto6);

productos.forEach(producto => {
    let tarjeta = document.createElement("div");
    tarjeta.className = "product-card";
    tarjeta.innerHTML = `
        <img src="${producto.foto}">
            <div class="product-info">
                <p>$ ${producto.precio}</p>
                <p>$ ${producto.nombre}</p>
                <figure>
                <img src="./img/icons/bt_add_to_cart.svg" alt="logo-carrito">
                </figure> 
            </div>
                           
    `
    cardsContainer.appendChild(tarjeta);
});

// function iniciar() {
//     mostrarProductos(productos)
//     elegirProducto();
//     comprarMas();    
//     cuotas = prompt("Ingrese la cantidad de cuotas");
//     calculadorCuotas(total, cuotas);
//     alert(`Pagará $${total} en ${cuotas} cuotas de $${cuota}`);
// }

// function calculadorCuotas(total, cuotas) {
//     if (total > 0 && cuotas > 0) {
//         cuota = (total / cuotas).toFixed(2);
//         return;
//     } else {
//         alert(`Ingrese un precio y/o cuotas válidos`);
//         iniciar();
//     }
// }

// function mostrarProductos(arr) { //puedo usar forEach
//     let listaProductos = [];
//     productos.forEach(producto => {
//         let mostrar = `${producto.codigo}- ${producto.nombre}`; 
//         listaProductos.push(mostrar); })
//     stringProductos = listaProductos.join("; ");
// }


// function elegirProducto() {
//     eleccion = prompt(`Elija el producto deseado: ${stringProductos}`)
//     if (eleccion > 0 && eleccion <= productos.length) {
//         total += productos[eleccion - 1].precio;
//     } else {
//         alert("Elija un número válido");
//         elegirProducto();
//     }
// }

// function comprarMas() {
//     pregunta = prompt("¿Desea otro producto?").toUpperCase();
//     while(pregunta === "SI") {
//         elegirProducto();
//         pregunta = prompt("¿Desea otro producto?").toUpperCase();
//     }
// }

// iniciar()