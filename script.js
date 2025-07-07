/*
Mi WeWasa de Reparto 1.5.0
*/

// Variables globales para guardar la ubicación
let ubicacionLista = false;
let lat = null;
let lon = null;


function calcularPedido() {
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

function enviarConUbicacion() {
    var nombre = document.getElementById("nombre_cliente").value.trim();
    var direccion = document.getElementById("direccion_cliente").value.trim();
    var textoPedido = document.getElementById("texto_pedido").value.trim();

    if (!nombre || !direccion || !textoPedido) { alert("Por favor, rellena tu nombre, dirección y el pedido."); return; }
    if (!ubicacionLista) { alert("Ubicación aún no disponible. Espera unos segundos o revisa los permisos."); return; }

    var mensaje = construirMensaje(nombre, direccion, textoPedido, lat, lon);
    window.open(`https://api.whatsapp.com/send?phone=34635291704&text=${encodeURIComponent(mensaje)}`, '_blank');
}

function detectarUbicacionInicial() {
	const direccionInput = document.getElementById('direccion_cliente');

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

// Al cargar la web
window.onload = () => {
	detectarUbicacionInicial();
	fondoAleatorioWasa();
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


// Coordenadas fijas de los locales
const locales = {
  "mairena1,sevilla": { nombre: "King Doner Kebab", lat: 37.3744, lon: -5.7261 },
  "mairena2,sevilla": { nombre: "Tutto Italia", lat: 37.3750, lon: -5.7252 },
  "mairena3,sevilla": { nombre: "Bugs Burger", lat: 37.3739, lon: -5.7248 }
};

// Calcular distancia con fórmula Haversine
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Cálculo avanzado
function calcularPedidoAvanzado() {
  const localId = document.getElementById("local_salida").value;
  const transporte = parseFloat(document.getElementById("transporte").value);
  const local = locales[localId];

  if (!navigator.geolocation) {
    alert("Geolocalización no soportada");
    return;
  }

navigator.geolocation.getCurrentPosition(
	(pos) => {
	const latCliente = pos.coords.latitude;
	const lonCliente = pos.coords.longitude;

	fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latCliente}&lon=${lonCliente}&format=json`)
	.then(response => response.json())
	.then(data => {
		const direccionLegible = data.display_name;
		document.getElementById("direccion_auto").value = direccionLegible;
	});

	// Autocompletar campo dirección si está vacío
	const inputDireccion = document.getElementById("direccion_auto");
	if (!inputDireccion.value) {
		inputDireccion.value = `https://www.google.com/maps?q=${latCliente},${lonCliente}`;
	}

	// Calcular distancia
	const distancia = calcularDistancia(local.lat, local.lon, latCliente, lonCliente);
	const distanciaRedondeada = parseFloat(distancia.toFixed(2));
	const precio = parseFloat((distanciaRedondeada + transporte).toFixed(2));

	document.getElementById("resultado").textContent = `💰 Total estimado: ${precio} €`;
	document.getElementById("distancia_km").textContent = `📏 Distancia: ${distanciaRedondeada} km`;
	},
	(err) => {
	alert("Error obteniendo ubicación: " + err.message);
	}
);
}

