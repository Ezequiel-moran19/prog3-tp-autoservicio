import { ResumenCarritoView } from "./resumenCarritoView.js";

export class CarritoView {

    constructor(carrito, confirmarCallback) {
        this.carrito = carrito;
        this.contenedorCarrito = document.getElementById("carrito");
        this.contenedorResumen = document.getElementById("resumen");
        this.resumenView = new ResumenCarritoView(this.contenedorResumen, carrito, confirmarCallback);
        this.inicializarEventos();
    }

    // INICIALIZAR EVENTOS
    inicializarEventos() {
        this.contenedorCarrito.addEventListener("click", (e) => {
            const btn = e.target.closest(".sumar, .restar, .btn-eliminar");
            if (!btn) return;

            const index = Number(btn.dataset.index); // Aseguramos número
            if (btn.classList.contains("sumar")) this.cambiarCantidad(index, 1);
            if (btn.classList.contains("restar")) this.cambiarCantidad(index, -1);
            if (btn.classList.contains("btn-eliminar")) this.eliminarItem(index);
        });
    }

    // RENDER PRINCIPAL
    mostrarCarrito() {
        this.contenedorCarrito.innerHTML = "";

        if (!this.carrito.items.length) {
            this.contenedorCarrito.innerHTML = `<div class="alert alert-info text-center"> Tu carrito está vacío </div>`;
        } else {
            this.contenedorCarrito.innerHTML = this.carrito.items
                .map((item, i) => this.generarCardItem(item, i))
                .join("");
        }

        this.resumenView.render();
        this.actualizarContador();
    }

    // GENERAR TARJETA DE PRODUCTO
    generarCardItem(item, index) {
        return `<div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm" data-index="${index}">
                    ${this.generarImagen(item)}
                    ${this.generarInfoProducto(item)}
                    ${this.generarControles(item, index)}
                </div>`;
    }

    generarImagen(item) {
        return `<img src="http://localhost:3000${item.rutaImg}" 
                     alt="${item.nombre}" 
                     class="rounded object-fit-cover"
                     style="width: 100px; height: 100px;">`;
    }

    generarInfoProducto(item) {
        return `<div class="flex-grow-1">
                    <h5 class="fw-semibold mb-1">${item.nombre}</h5>
                    <p class="text-muted mb-2 descripcion">${item.descripcion || "Sin descripción"}</p>
                    <p class="fw-bold text-danger mb-0">$${item.precio}</p>
                    <p class="text-sm text-danger mb-0">Stock: ${item.stock}</p>
                </div>`;
    }

    generarControles(item, index) {
        return `<div class="d-flex flex-column align-items-end gap-2">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-secondary btn-sm restar" data-index="${index}">-</button>
                        <span class="fw-semibold cantidad">${item.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm sumar" data-index="${index}">+</button>
                    </div>
                    <p class="fw-semibold text-sm mb-0 subtotal"> Subtotal: $${item.subtotal} </p>
                </div>`;
    }

    // CAMBIAR CANTIDAD
    cambiarCantidad(index, cambio) {
        const item = this.carrito.items[index];
        if (!item) return;

        const nuevaCantidad = item.cantidad + cambio;

        if (nuevaCantidad <= 0) return this.eliminarItem(index);

        if (nuevaCantidad > item.stock) {
            item.cantidad = item.stock;
        } else {
            item.cantidad = nuevaCantidad;
        }

        item.subtotal = item.cantidad * item.precio;
        this.carrito.guardar();
        this.actualizarItem(index);
        this.resumenView.actualizar();
        this.actualizarContador();
    }

    // ELIMINAR ITEM
    eliminarItem(index) {
        this.carrito.eliminar(index);
        this.mostrarCarrito();
    }

    // ACTUALIZAR ITEM INDIVIDUAL EN EL DOM
    actualizarItem(index) {
        const item = this.carrito.items[index];
        const card = this.contenedorCarrito.querySelector(`[data-index="${index}"]`);
        if (!card) return;

        card.querySelector(".cantidad").textContent = item.cantidad;
        card.querySelector(".subtotal").textContent = `Subtotal: $${item.subtotal}`;
    }

    // ACTUALIZAR CONTADOR GENERAL
    actualizarContador() {
        const total = this.carrito.items.reduce((acc, p) => acc + p.cantidad, 0);
        const badge = document.querySelector("#contadorCarrito");
        if (badge) badge.textContent = total;
    }
}
