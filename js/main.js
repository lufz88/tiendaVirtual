const cardsContainer = document.getElementById("cards-container");
const verCarrito = document.getElementById("ver-carrito");
const myOrder = document.getElementById("my-order");
verCarrito.addEventListener("click", () => {
    if(myOrder.style.display === "none") {
        myOrder.style.display = "grid"
    } else {
        myOrder.style.display = "none";
    }
});
const listaProductos = document.getElementById("lista-productos");
const articulos = document.getElementById("cantidad-productos")
const precioTotal = document.getElementById("total")
const cantidadCarrito = document.getElementById("cantidad-carrito")

let carrito = [];
let carritoStorage = localStorage.getItem("carrito");
let cantidadArticulos = 0; 
let cantidadArticulosStorage = localStorage.getItem("cantidadArticulos"); 
let total = 0;
let totalStorage = localStorage.getItem("total");
let cuotas;
let cuota;
let pregunta;
let stringProductos;

if(carritoStorage){
    carrito = JSON.parse(carritoStorage);
    mostrarCarrito();
}

if(cantidadArticulosStorage){
    cantidadArticulos = parseInt(JSON.parse(cantidadArticulosStorage));
    articulos.innerHTML = `${cantidadArticulos} artículos`;
    cantidadCarrito.innerHTML = `${cantidadArticulos}`;
}

if(totalStorage){
    total = parseInt(JSON.parse(totalStorage));
    precioTotal.innerHTML = `$${total}`;
}

class Producto {
    constructor(nombre, precio, codigo, foto, cantidadCarrito = null) {
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
                <button>
                <img src="./img/icons/bt_add_to_cart.svg" alt="logo-carrito" id=${producto.nombre}>
                </button> 
            </div>
    `
    cardsContainer.appendChild(tarjeta);
    const button = document.getElementById(`${producto.nombre}`);
    button.addEventListener("mouseover", () => {button.style.width = "50px"; button.style.height = "50px"});
    button.addEventListener("mouseout", () => {button.style.width = "40px"; button.style.height = "40px"});
    button.addEventListener("click", () => {
        if (carrito.some((el) => el.nombre == producto.nombre)) {
            elemento = carrito.find((el) => el.nombre == producto.nombre)
            elemento.cantidadCarrito++
            total += elemento.precio;
            cantidadArticulos++;
        } else {
            producto.cantidadCarrito = 1;
            carrito.push(producto);
            total += producto.precio
            cantidadArticulos++;
        }
        localStorage.setItem("cantidadArticulos", JSON.stringify(cantidadArticulos));
        localStorage.setItem("total", JSON.stringify(total));
        mostrarCarrito()
    });
});

function mostrarCarrito() {
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    listaProductos.innerHTML = '';
    carrito.forEach(producto => {
    let productoAgregado = document.createElement("div");
    productoAgregado.className = "shopping-cart";
    productoAgregado.innerHTML = `
        <p>${producto.cantidadCarrito} X</p>
        <figure>
        <img src="${producto.foto}" alt="">
        </figure>
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <button id="eliminar-producto">🗑</button>
    `
    listaProductos.appendChild(productoAgregado);
    });
    precioTotal.innerHTML = `$${total}`;
    articulos.innerHTML = `${cantidadArticulos} artículos`;
    cantidadCarrito.innerHTML = `${cantidadArticulos}`;
}

/* <div class="shopping-cart">
                <figure>
                    <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
                </figure>
                <p>Bike</p>
                <p>130.00</p> */


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