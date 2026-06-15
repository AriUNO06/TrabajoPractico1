const cotizacionDolar = 1250;
let monedaActual = "ARS";
let carrito = [];
let descuentoCodigo = 0;
let codigoAplicado = "";

const codigosDescuento = {
    LOL10: 0.1,
    SKINS20: 0.2,
    GRUPO5: 0.15,
};

const formatoMoneda = (valor) => {
    if (monedaActual === "USD") {
        return `US$${(valor / cotizacionDolar).toFixed(2)}`;
    }

    return `$${valor.toLocaleString("es-AR")} ARS`;
};

const descuentoPorCantidad = (cantidad) => {
    if (cantidad >= 4) return 0.2;
    if (cantidad >= 3) return 0.15;
    if (cantidad >= 2) return 0.1;
    return 0;
};

const actualizarPreciosProductos = () => {
    document.querySelectorAll(".precio").forEach((precio) => {
        const valor = Number(precio.dataset.precio);
        precio.textContent = formatoMoneda(valor);
    });
};

const renderizarCarrito = () => {
    const lista = document.getElementById("carrito-lista");
    const subtotalElemento = document.getElementById("carrito-subtotal");
    const descuentoElemento = document.getElementById("carrito-descuento");
    const totalElemento = document.getElementById("carrito-total");

    if (!lista || !subtotalElemento || !descuentoElemento || !totalElemento) return;

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Todavía no agregaste productos.</p>';
    } else {
        carrito.forEach((item, index) => {
            const itemCarrito = document.createElement("div");
            itemCarrito.className = "carrito-item";
            itemCarrito.innerHTML = `
                <div>
                    <p><strong>${item.nombre}</strong></p>
                    <span>${formatoMoneda(item.precio)}</span>
                </div>
                <button class="quitar-item" type="button" data-index="${index}">Quitar</button>
            `;
            lista.appendChild(itemCarrito);
        });
    }

    const subtotal = carrito.reduce((total, item) => total + item.precio, 0);
    const descuentoCantidad = subtotal * descuentoPorCantidad(carrito.length);
    const descuentoExtra = subtotal * descuentoCodigo;
    const descuento = descuentoCantidad + descuentoExtra;
    const total = subtotal - descuento;

    subtotalElemento.textContent = formatoMoneda(subtotal);
    descuentoElemento.textContent = `-${formatoMoneda(descuento)}`;
    totalElemento.textContent = formatoMoneda(total);
};

const iniciarTienda = () => {
    const selectorMoneda = document.getElementById("selector-moneda");
    const mensajeCompra = document.getElementById("mensaje-compra");
    const codigoInput = document.getElementById("codigo-descuento");
    const aplicarCodigo = document.getElementById("aplicar-codigo");
    const mensajeCodigo = document.getElementById("mensaje-codigo");

    if (!selectorMoneda) return;

    actualizarPreciosProductos();
    renderizarCarrito();

    selectorMoneda.addEventListener("change", () => {
        monedaActual = selectorMoneda.value;
        actualizarPreciosProductos();
        renderizarCarrito();
    });

    document.querySelectorAll(".agregar-carrito").forEach((boton) => {
        boton.addEventListener("click", () => {
            carrito.push({
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio),
            });

            if (mensajeCompra) mensajeCompra.textContent = "";
            renderizarCarrito();
        });
    });

    document.getElementById("carrito-lista").addEventListener("click", (evento) => {
        if (!evento.target.classList.contains("quitar-item")) return;

        const index = Number(evento.target.dataset.index);
        carrito.splice(index, 1);
        renderizarCarrito();
    });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        carrito = [];
        descuentoCodigo = 0;
        codigoAplicado = "";
        if (codigoInput) codigoInput.value = "";
        if (mensajeCodigo) mensajeCodigo.textContent = "";
        if (mensajeCompra) mensajeCompra.textContent = "";
        renderizarCarrito();
    });

    if (aplicarCodigo && codigoInput && mensajeCodigo) {
        aplicarCodigo.addEventListener("click", () => {
            const codigo = codigoInput.value.trim().toUpperCase();

            if (codigo === "") {
                descuentoCodigo = 0;
                codigoAplicado = "";
                mensajeCodigo.textContent = "Ingresa un codigo para aplicar.";
                renderizarCarrito();
                return;
            }

            if (codigosDescuento[codigo]) {
                descuentoCodigo = codigosDescuento[codigo];
                codigoAplicado = codigo;
                mensajeCodigo.textContent = `Codigo ${codigoAplicado} aplicado.`;
            } else {
                descuentoCodigo = 0;
                codigoAplicado = "";
                mensajeCodigo.textContent = "Codigo invalido.";
            }

            renderizarCarrito();
        });
    }

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        if (!mensajeCompra) return;

        if (carrito.length === 0) {
            mensajeCompra.textContent = "Agregá al menos un producto para finalizar.";
            return;
        }

        mensajeCompra.textContent = "Compra simulada finalizada con éxito.";
        carrito = [];
        descuentoCodigo = 0;
        codigoAplicado = "";
        if (codigoInput) codigoInput.value = "";
        if (mensajeCodigo) mensajeCodigo.textContent = "";
        renderizarCarrito();
    });
};

const datosCampeones = {
    "Ahri": {
        rol: "Mid",
        descripcion: "Maga asesina con movilidad, encanto y mucho daño explosivo.",
        dificultad: "Media",
        habilidad: "Encanto",
        consejo: "Usá el encanto para iniciar intercambios seguros y después reposicionate con su definitiva.",
    },
    "Yasuo": {
        rol: "Top / Mid",
        descripcion: "Luchador móvil que escala muy bien cuando consigue golpes críticos.",
        dificultad: "Alta",
        habilidad: "Último Aliento",
        consejo: "Esperá el momento correcto para entrar después de levantar enemigos por el aire.",
    },
    "Lee Sin": {
        rol: "Jungle",
        descripcion: "Jungla agresivo con gran movilidad y capacidad de iniciar jugadas.",
        dificultad: "Alta",
        habilidad: "Ira del Dragón",
        consejo: "Buscá jugadas tempranas y protegé tus guardianes para moverte mejor.",
    },
    "Miss Fortune": {
        rol: "ADC",
        descripcion: "Tiradora de daño en área que brilla en peleas agrupadas.",
        dificultad: "Baja",
        habilidad: "Lluvia de Balas",
        consejo: "Posicionate detrás del equipo para canalizar la definitiva sin interrupciones.",
    },
    "Jinx": {
        rol: "ADC",
        descripcion: "Carry de late game con gran daño sostenido y reinicios al conseguir bajas.",
        dificultad: "Media",
        habilidad: "Supermega Cohete Mortal",
        consejo: "Jugá con paciencia hasta conseguir una baja y activar su velocidad.",
    },
    "Yunara": {
        rol: "Mid",
        descripcion: "Maga veloz orientada al control de zonas y presión constante.",
        dificultad: "Media",
        habilidad: "Control de área",
        consejo: "Mantené distancia y forzá al rival a pelear dentro de tus zonas de daño.",
    },
    "Caitlyn": {
        rol: "ADC",
        descripcion: "Tiradora de mucho rango que domina la línea con trampas y presión.",
        dificultad: "Media",
        habilidad: "As en la Mira",
        consejo: "Aprovechá tu rango para castigar sin exponerte demasiado.",
    },
    "Gwen": {
        rol: "Top",
        descripcion: "Luchadora AP fuerte en duelos largos y peleas extendidas.",
        dificultad: "Media",
        habilidad: "Tijeretazos",
        consejo: "Esperá tus acumulaciones antes de pelear para maximizar el daño.",
    },
    "Jarvan IV": {
        rol: "Jungle",
        descripcion: "Iniciador resistente con mucho control para peleas grupales.",
        dificultad: "Media",
        habilidad: "Cataclismo",
        consejo: "Entrá cuando tu equipo pueda seguir la jugada y convertir el encierro en ventaja.",
    },
    "Kai'Sa": {
        rol: "ADC",
        descripcion: "Carry híbrida con movilidad, daño mixto y gran potencial de asesinato.",
        dificultad: "Media",
        habilidad: "Instinto Asesino",
        consejo: "Entrá con la definitiva sólo cuando el objetivo esté aislado o marcado.",
    },
    "Mordekaiser": {
        rol: "Top",
        descripcion: "Bruiser AP que puede separar a un enemigo clave con su definitiva.",
        dificultad: "Baja",
        habilidad: "Reino de la Muerte",
        consejo: "Usá la definitiva contra el campeón más peligroso o más fácil de eliminar.",
    },
    "Ashe": {
        rol: "ADC",
        descripcion: "Tiradora de utilidad con ralentizaciones constantes e iniciación global.",
        dificultad: "Baja",
        habilidad: "Flecha de Cristal Encantada",
        consejo: "Ayudá a tu equipo iniciando peleas desde lejos con la flecha.",
    },
};

const iniciarModalCampeones = () => {
    const modal = document.getElementById("campeon-modal");
    const cerrar = document.getElementById("cerrar-modal");

    if (!modal || !cerrar) return;

    const campos = {
        nombre: document.getElementById("modal-nombre"),
        rol: document.getElementById("modal-rol"),
        descripcion: document.getElementById("modal-descripcion"),
        dificultad: document.getElementById("modal-dificultad"),
        habilidad: document.getElementById("modal-habilidad"),
        consejo: document.getElementById("modal-consejo"),
    };

    const cerrarModal = () => {
        modal.classList.remove("activo");
        modal.setAttribute("aria-hidden", "true");
    };

    document.querySelectorAll(".ver-mas").forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombre = boton.dataset.campeon;
            const datos = datosCampeones[nombre];

            if (!datos) return;

            campos.nombre.textContent = nombre;
            campos.rol.textContent = `Rol: ${datos.rol}`;
            campos.descripcion.textContent = datos.descripcion;
            campos.dificultad.textContent = datos.dificultad;
            campos.habilidad.textContent = datos.habilidad;
            campos.consejo.textContent = datos.consejo;

            modal.classList.add("activo");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    cerrar.addEventListener("click", cerrarModal);
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") cerrarModal();
    });
};

document.addEventListener("DOMContentLoaded", () => {
    iniciarTienda();
    iniciarModalCampeones();
});
