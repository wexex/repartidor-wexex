/*
Mi WeWasa de Reparto 1.5.0
*/

// Variables globales para guardar la ubicación
let ubicacionLista = false;
let lat = null;
let lon = null;


function CALCULADOR_DISTANCIA() {
	const precioKm = 0.55;
	const distancia = parseFloat(document.getElementById('distancia').value.replace(',', '.'));
	const transporte = parseFloat(document.getElementById('transporte').value);
	const total = (precioKm * distancia + transporte).toFixed(2);
	document.getElementById('resultado').innerText = `💰 Precio TOTAL: ${total} €`;
}

function construirMensaje(nombre, direccion, textoPedido, lat, lon) {
    return `
👤 ${nombre}
🏠 ${direccion}
📍  https://www.google.com/maps?q=${lat},${lon}
🫡 ORDEN DEL PEDIDO:
${textoPedido}

`
}
// ORDEN DE PEDIDO
function ENVIAR_ORDEN() {
    var nombre = document.getElementById("CLIENTE_NOMBRE").value.trim();
    var direccion = document.getElementById("CLIENTE_DIRECCION").value.trim();
    var textoPedido = document.getElementById("CLIENTE_TEXTO").value.trim();

	// Requisitos
    if (!nombre) { alert("Por favor, rellena tu nombre."); return; }
	if (!direccion) { alert("Por favor, rellena tu dirección."); return; }
	if (!textoPedido) { alert("Por favor, rellena tu lista de pedido."); return; }
    if (!ubicacionLista) { alert("Espera unos segundos o revisa los permisos."); return; }

	// Abre una ventana nueva a whatsapp con la orden del pedido
    var mensaje = construirMensaje(nombre, direccion, textoPedido, lat, lon);
    window.open(`https://api.whatsapp.com/send?phone=34635291704&text=${encodeURIComponent(mensaje)}`, '_blank');
}

function detectarUbicacionInicial() {
	const direccionInput = document.getElementById('CLIENTE_DIRECCION');


	// Ubicacion no obtenida
	if (!navigator.geolocation) { console.warn("❌ El navegador no permite obtener ubicación."); return; }

	navigator.geolocation.getCurrentPosition(async function(pos) {
		const lat = pos.coords.latitude;
		const lon = pos.coords.longitude;

		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
			const data = await response.json();
			direccionInput.value = data.display_name || "";
		} catch (error) { console.warn("⚠️ No se pudo autocompletar la dirección."); }

	}, function(error) {
		console.warn("⚠️ No se pudo obtener la ubicación al entrar.");
	});
}

function fondoAleatorioWasa() {
	const numero = Math.floor(Math.random() * 6) + 1; // Número del 1 al 6
	const fondo = `./imgs/wasa_fondo${numero}.jpeg`; // Ruta del fondo
	const section = document.querySelector('section');

	// Aplicar fondo
	section.style.background = `url('${fondo}') no-repeat center center fixed`;
	section.style.backgroundSize = 'cover';

	// Mostrar en consola
	console.log(`🖼️ Fondo cargado: wasa_fondo${numero}.jpeg`);
}



// Estado de ubicacion al cargar la web
window.addEventListener("load", function () {
    const estado = document.getElementById("estado_ubicacion");

    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				ubicacionLista = true;
				console.log("✅ Ubicación obtenida:", lat, lon);
				if (document.getElementById("estado_ubicacion")) {
					document.getElementById("estado_ubicacion").textContent = "✅ Ubicación lista";
				}
			},
			function (error) {
				console.error("❌ Error al obtener ubicación:", error.message);
				ubicacionLista = false;
				if (document.getElementById("estado_ubicacion")) {
					document.getElementById("estado_ubicacion").textContent = "❌ Error al obtener ubicación";
				}
			},
			{
				enableHighAccuracy: true,   // 🔍 Usa el GPS con máxima precisión
				timeout: 10000,             // ⏱️ Espera máxima de 10 segundos
				maximumAge: 0               // ❌ No reutiliza datos antiguos
			}
		); }

    else { 	console.warn("⚠️ Tu navegador no soporta geolocalización"); ubicacionLista = false;
			if (estado) { estado.textContent = "⚠️ Tu navegador no soporta geolocalización"; estado.style.color = "orange"; }; }
});


// Al cargar la web
window.onload = () => {
	detectarUbicacionInicial();
	fondoAleatorioWasa();
}
