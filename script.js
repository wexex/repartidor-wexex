/*
Mi WeWasa de Reparto 1.5.0
*/
// Coordenadas de locales
// McDonalds	37.38133708612366,  -5.7334867016903175
// King Doner 	37.383191426656516, -5.727653050379951
// Tutto Italia 37.38365680055818,  -5.725068291224817
// Bugs Burger 	37.39445567048347,  -5.715608081800965

// Variables globales para guardar la ubicación
let ubicacionLista = false;
let lat = null;
let lon = null;


function CALCULADOR_DISTANCIA() {
	const PRECIO_KM = 0.55;
	const DISTANCIA = parseFloat(document.getElementById('DISTANCIA').value.replace(',', '.'));
	const TRANSPORTE = parseFloat(document.getElementById('TRANSPORTE').value);
	const TOTAL = (PRECIO_KM * DISTANCIA + TRANSPORTE).toFixed(2);
	document.getElementById('CALCULADOR_RESULTADO_DISTANCIA').innerText = `💰 Precio TOTAL: ${TOTAL} €`;
}


// Coordenadas de locales fijos
const localesCoords = {
    1: { nombre: "McDonalds", 		lat: 37.38133708612366, 	lon: -5.7334867016903175 },
    2: { nombre: "Tutto Italia", 	lat: 37.383191426656516, 	lon: -5.727653050379951 },
    3: { nombre: "King Doner", 		lat: 37.38365680055818, 	lon: -5.725068291224817 },
    4: { nombre: "Bugs Burger", 	lat: 37.39445567048347, 	lon: -5.715608081800965 }
};

// Calcula la distancia con fórmula Haversine
function calcularDistanciaCoord(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Geocodifica dirección escrita → lat/lon
async function geocodificarDireccion(direccion) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (datos.length > 0) {
            return {
                lat: parseFloat(datos[0].lat),
                lon: parseFloat(datos[0].lon)
            };
        } else {
            return null; // Dirección no encontrada
        }
    } catch (error) {
        console.error("❌ Error en la geocodificación:", error);
        return null;
    }
}

// Función principal del botón
async function CALCULADOR_LOCALES() {
    const PRECIO_KM = 0.55;
	const ALIMENTO = 0.55;
    const idLocal = parseInt(document.getElementById('locales').value);
    const direccionCliente = document.getElementById('CLIENTE_DIRECCION').value.trim();

    const resultado = document.getElementById('CALCULADOR_RESULTADO_LOCALES');

    if (!direccionCliente) { resultado.innerText = "❌ Escribe una dirección válida."; return; }

    const clienteCoord = await geocodificarDireccion(direccionCliente);

    if (!clienteCoord) { resultado.innerText = "❌ Dirección no encontrada. Intenta escribirla más completa."; return; }

    const local = localesCoords[idLocal];
    const distancia = calcularDistanciaCoord(local.lat, local.lon, clienteCoord.lat, clienteCoord.lon);
    const total = (PRECIO_KM * distancia + ALIMENTO).toFixed(2);

    resultado.innerText =
        `📍 Distancia estimada: ${distancia.toFixed(2)} km\n💰 Precio TOTAL: ${total} €`;
}



function construirMensaje(nombre, direccion, textoPedido, lat, lon) {
    return `
👤 ${nombre}
🏠 ${direccion}
📍  https://www.google.com/maps?q=${lat},${lon}
🫡 ORDEN DEL PEDIDO:
${textoPedido}

`; }

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
	CALCULADOR_DISTANCIA();
	CALCULADOR_LOCALES();
}
