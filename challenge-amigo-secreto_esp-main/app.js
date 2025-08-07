// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
const listaAmigos = []; // Arreglo global para almacenar los nombres

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim(); // Eliminamos espacios

    if (nombre === "") {
        alert("Por favor, escribe un nombre válido.");
        return;
    }

    // Agregar a la lista
    listaAmigos.push(nombre);

    // Mostrar en pantalla
    const lista = document.getElementById("listaAmigos");
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = nombre;
    lista.appendChild(nuevoElemento);

    // Limpiar el input
    input.value = "";
    input.focus();
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultado anterior

    if (listaAmigos.length === 0) {
        alert("Agrega al menos un amigo antes de sortear.");
        return;
    }

    const indice = Math.floor(Math.random() * listaAmigos.length);
    const nombreSorteado = listaAmigos[indice];

    const mensaje = document.createElement("li");
    mensaje.textContent = `🎉 El amigo secreto es: ${nombreSorteado}`;
    resultado.appendChild(mensaje);
}
