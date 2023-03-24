const cardsContainer = document.getElementById("cards-container");
const verCarrito = document.getElementById("ver-carrito");
const myOrder = document.getElementById("my-order");
verCarrito.addEventListener("click", () => {
    myOrder.style.display === "none"
        ? (myOrder.style.display = "grid")
        : (myOrder.style.display = "none");
});
const listaProductos = document.getElementById("lista-productos");
const articulos = document.getElementById("cantidad-productos");
const precioTotal = document.getElementById("total");
const cantidadCarrito = document.getElementById("cantidad-carrito");

let carrito = [];
let carritoStorage = localStorage.getItem("carrito");
let cantidadArticulos = 0;
let cantidadArticulosStorage = localStorage.getItem("cantidadArticulos");
let total = 0;
let totalStorage = localStorage.getItem("total");

const botonComprar = document.getElementById("finalizar-compra");

if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    mostrarCarrito();
}

if (cantidadArticulosStorage) {
    cantidadArticulos = parseInt(JSON.parse(cantidadArticulosStorage));
    articulos.innerHTML = `${cantidadArticulos} artículos`;
    cantidadCarrito.innerHTML = `${cantidadArticulos}`;
}

if (totalStorage) {
    total = parseInt(JSON.parse(totalStorage));
    precioTotal.innerHTML = `$${total}`;
}

cantidadArticulos === 0
    ? (botonComprar.style.display = "none")
    : (botonComprar.style.display = "block");

const traerProductos = async () => {
    try {
        const response = await fetch("./js/data.json");
        const productos = await response.json();
        return productos;
    } catch {
        (error) => console.log(error);
    }
};

async function mostrarProductos() {
    const productos = await traerProductos();
    productos.forEach((producto) => {
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
        `;
        cardsContainer.appendChild(tarjeta);
        const button = document.getElementById(`${producto.nombre}`);
        button.addEventListener("mouseover", () => {
            button.style.width = "50px";
            button.style.height = "50px";
        });
        button.addEventListener("mouseout", () => {
            button.style.width = "40px";
            button.style.height = "40px";
        });
        button.addEventListener("click", () => {
            if (carrito.some((el) => el.nombre == producto.nombre)) {
                elemento = carrito.find((el) => el.nombre == producto.nombre);
                elemento.cantidadCarrito++;
                total += elemento.precio;
                cantidadArticulos++;
            } else {
                producto.cantidadCarrito = 1;
                carrito.push(producto);
                total += producto.precio;
                cantidadArticulos++;
            }
            localStorage.setItem(
                "cantidadArticulos",
                JSON.stringify(cantidadArticulos)
            );
            localStorage.setItem("total", JSON.stringify(total));
            Toastify({
                text: "Producto agregado",
                duration: 1000,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            mostrarCarrito();
        });
    });
}

mostrarProductos();

function mostrarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    listaProductos.innerHTML = "";
    carrito.forEach((producto) => {
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
        `;
        listaProductos.appendChild(productoAgregado);
        const eliminarProducto = document.getElementById(producto.codigo);
        eliminarProducto.addEventListener("click", () =>
            quitarProducto(producto.codigo)
        );
    });
    precioTotal.innerHTML = `$${total}`;
    articulos.innerHTML = `${cantidadArticulos} artículos`;
    cantidadCarrito.innerHTML = `${cantidadArticulos}`;
    botonComprar.addEventListener("click", finalizarCompra);
    cantidadArticulos === 0
        ? (botonComprar.style.display = "none")
        : (botonComprar.style.display = "block");
}

const quitarProducto = (codigo) => {
    const productofiltrado = carrito.filter((prod) => prod.codigo === codigo);
    const carritoFiltrado = carrito.filter((prod) => prod.codigo !== codigo);
    carrito = carritoFiltrado;
    total -= productofiltrado[0].precio * productofiltrado[0].cantidadCarrito;
    cantidadArticulos -= productofiltrado[0].cantidadCarrito;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem(
        "cantidadArticulos",
        JSON.stringify(cantidadArticulos)
    );
    Toastify({
        text: "Producto eliminado",
        duration: 1000,
        gravity: "bottom",
        style: {
            background:
                "linear-gradient(to right, rgba(156,14,67,1), rgba(255,0,194,1))",
        },
    }).showToast();
    mostrarCarrito();
};

function finalizarCompra() {
    Swal.fire({
        title: "Finalizar compra",
        text: "¿Está seguro que desea finalizar la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡comprar ahora!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Su compra se realizó con éxito",
                showConfirmButton: false,
                timer: 1500,
            }).then(
                setTimeout(() => {
                    localStorage.clear();
                    carrito = [];
                    cantidadArticulos = 0;
                    total = 0;
                    location.reload();
                }, 1500)
            );
        }
    });
}
