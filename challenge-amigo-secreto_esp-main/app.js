// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listaAmigos = [];

// Cargar amigos desde localStorage al iniciar
window.onload = function () {
    const amigosGuardados = localStorage.getItem("listaAmigos");
    if (amigosGuardados) {
        listaAmigos = JSON.parse(amigosGuardados);
        actualizarListaHTML();
    }
};

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, escribe un nombre válido.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Ese nombre ya fue agregado.");
        return;
    }

    listaAmigos.push(nombre);
    guardarEnLocalStorage();
    actualizarListaHTML();

    input.value = "";
    input.focus();
}

function eliminarAmigo(nombre) {
    listaAmigos = listaAmigos.filter((amigo) => amigo !== nombre);
    guardarEnLocalStorage();
    actualizarListaHTML();
}

function actualizarListaHTML() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar lista antes de volver a pintar

    listaAmigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.style.marginLeft = "10px";
        botonEliminar.onclick = () => eliminarAmigo(amigo);

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (listaAmigos.length === 0) {
        alert("Agrega al menos un amigo antes de sortear.");
        return;
    }

    const indice = Math.floor(Math.random() * listaAmigos.length);
    const nombreSorteado = listaAmigos[indice];

    const mensaje = document.createElement("li");
    mensaje.textContent = `🎉 El amigo secreto es: ${nombreSorteado}`;
    resultado.appendChild(mensaje);

    // Mostrar botones para compartir
    document.getElementById("compartir").style.display = "block";
}


function guardarEnLocalStorage() {
    localStorage.setItem("listaAmigos", JSON.stringify(listaAmigos));
}

function reiniciarTodo() {
    if (!confirm("¿Estás seguro de que quieres borrar todo?")) {
        return;
    }

    listaAmigos = [];
    localStorage.removeItem("listaAmigos");

    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
function compartirWhatsApp() {
    const resultado = document.getElementById("resultado").innerText;
    const mensaje = encodeURIComponent(`¡Hola! El resultado del sorteo de amigo secreto es:\n${resultado}`);
    const enlace = `https://wa.me/?text=${mensaje}`;
    window.open(enlace, "_blank");
}

function compartirCorreo() {
    const resultado = document.getElementById("resultado").innerText;
    const asunto = encodeURIComponent("Resultado del Amigo Secreto 🎁");
    const cuerpo = encodeURIComponent(`¡Hola!\n\nEl amigo secreto sorteado es:\n${resultado}\n\n¡Suerte y a divertirse!`);
    const enlace = `mailto:?subject=${asunto}&body=${cuerpo}`;
    window.location.href = enlace;
}

function descargarImagen() {
    const resultado = document.getElementById("resultado");

    html2canvas(resultado).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = "resultado-amigo-secreto.png";
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    });
}

function descargarPDF() {
    const resultado = document.getElementById("resultado");

    html2canvas(resultado).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resultado-amigo-secreto.pdf");
    });
}

