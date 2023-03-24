const cardsContainer = document.getElementById("cards-container");
const verCarrito = document.getElementById("ver-carrito");
const myOrder = document.getElementById("my-order");
verCarrito.addEventListener("click", () => {
    myOrder.style.display === "none"? myOrder.style.display = "grid": myOrder.style.display = "none";
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

const traerProductos = async() => {
    try {
        const response = await fetch("./js/data.json");
        const productos = await response.json();
        productos.forEach(producto => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "product-card";
            tarjeta.innerHTML = `
                <img src="${producto.foto}">
                    <div class="product-info">
                        <p>$ ${producto.precio}</p>
                        <p>${producto.nombre}</p>
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
                mostrarCarrito();
            });
        });
    } catch {
        error => console.log(error);
    }
}

traerProductos();


function mostrarCarrito() {
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
            <button class= "eliminar-producto" id=${producto.codigo}>🗑</button>
        `
        listaProductos.appendChild(productoAgregado);
        const eliminarProducto = document.getElementById(producto.codigo);
        eliminarProducto.addEventListener("click", () => quitarProducto(producto.codigo))
    });
    precioTotal.innerHTML = `$${total}`;
    articulos.innerHTML = `${cantidadArticulos} artículos`;
    cantidadCarrito.innerHTML = `${cantidadArticulos}`;
}

const quitarProducto = (codigo) => {
    const productofiltrado = carrito.filter(prod => prod.codigo === codigo); 
    const carritoFiltrado = carrito.filter(prod => prod.codigo !== codigo);
    carrito = carritoFiltrado;
    total -= productofiltrado[0].precio * productofiltrado[0].cantidadCarrito;
    cantidadArticulos = productofiltrado[0].cantidadCarrito;
    mostrarCarrito();
}

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