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

// Variables globales
const PRECIO_KM = 0.55;
const ALIMENTO = 0.55;


// DETECTAR UBICACION INICIAL
function detectarUbicacionInicial() {


	// Ubicacion no obtenida
	if (!navigator.geolocation) { console.warn("❌ El navegador no permite obtener ubicación."); return; }

	navigator.geolocation.getCurrentPosition(async function(pos) {
		const lat = pos.coords.latitude;
		const lon = pos.coords.longitude;

		const direccionInput1 = document.getElementById('CLIENTE_DIRECCION_LOCAL');
		const direccionInput2 = document.getElementById('CLIENTE_DIRECCION_ORDEN');
		
		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
			const data = await response.json();
			direccionInput1.value = data.display_name || ""; 
			direccionInput2.value = data.display_name || ""; 
			
		}
		
		catch (error) { console.warn("⚠️ No se pudo autocompletar la dirección."); }

	}, function(error) { console.warn("⚠️ No se pudo obtener la ubicación al entrar."); });
}

// CALCULADOR_DISTANCIA
function CALCULADOR_DISTANCIA() {
	const DISTANCIA = parseFloat(document.getElementById('DISTANCIA').value.replace(',', '.'));
	const TRANSPORTE = parseFloat(document.getElementById('TRANSPORTE').value);
	const TOTAL = (PRECIO_KM * DISTANCIA + TRANSPORTE).toFixed(2);
	document.getElementById('CALCULADOR_RESULTADO_DISTANCIA').innerText = `💰 Precio TOTAL: ${TOTAL} €`;
}

// COORDENADAS DE LOCALES FIJOS
const localesCoords = {
    1: { nombre: "McDonalds", 		lat: 37.38133708612366, 	lon: -5.7334867016903175 },
    2: { nombre: "Tutto Italia", 	lat: 37.383191426656516, 	lon: -5.727653050379951 },
    3: { nombre: "King Doner", 		lat: 37.38365680055818, 	lon: -5.725068291224817 },
    4: { nombre: "Bugs Burger", 	lat: 37.39445567048347, 	lon: -5.715608081800965 }
};

// CALCULA LA DISTANCIA CON FÓRMULA HAVERSINE
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

// GEOCODIFICA DIRECCIÓN ESCRITA > LAT, LON
async function geocodificarDireccion(direccion) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (datos.length > 0) { return { lat: parseFloat(datos[0].lat), lon: parseFloat(datos[0].lon) }; } 
        else { return null; } 																	// Dirección no encontrada
    } catch (error) { console.error("❌ Error en la geocodificación:", error); return null; }	// ERROR
}

// CALCULADOR_LOCALES
async function CALCULADOR_LOCALES() {
    const idLocal = parseInt(document.getElementById('locales').value);
    const direccionCliente = document.getElementById('CLIENTE_DIRECCION_LOCAL').value.trim();

    const resultado = document.getElementById('CALCULADOR_RESULTADO_LOCALES');

    if (!direccionCliente) { resultado.innerText = "❌ Escribe una dirección válida."; return; }

    const clienteCoord = await geocodificarDireccion(direccionCliente);

    if (!clienteCoord) { resultado.innerText = "❌ Dirección no encontrada. Intenta escribirla más completa."; return; }

    const local = localesCoords[idLocal]; // Esto primero sí o sí

	const DISTANCIA_BASE = calcularDistanciaCoord(local.lat, local.lon, clienteCoord.lat, clienteCoord.lon);

	const AJUSTE_RUTA_REAL = 1.175;
	const DISTANCIA = DISTANCIA_BASE * AJUSTE_RUTA_REAL;

	const TOTAL = (PRECIO_KM * DISTANCIA + ALIMENTO).toFixed(2);


    resultado.innerText =`📍 Distancia: ${DISTANCIA.toFixed(2)} km\n💰 Precio TOTAL: ${TOTAL} €`;
}

// MENSAJE DE LA ORDEN DEL PEDIDO
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



// 🧠 Productos por local
const menusLocales = {
	mcdonalds: [

		// 🍔 McMenú Clásicos
		'🍔 McMenú Big Mac',
		'🍔 McMenú Big Mac Bacon',
		'🍔 McMenú Big Mac Pollo',
		'🍔 McMenú McPollo',
		
		'🍔 McMenú Cuarto de Libra',
		'🍔 McMenú Cuarto de Libra Doble',
		'🍔 McMenú CBO',
		'🍔 McMenú CBO Plex (nuevo Plex)',
		
		'🍔 McMenú McExtreme Bacon Doble',
		'🍔 McMenú McExtreme Pulled Pork',
		'🍔 McMenú McExtreme Tutti Pepperoni','',
		
		'🍔 McMenú Spicy McCrispy',
		'🍔 McMenú Spicy McNuggets 9 uds',
		'🍔 McMenú Manuel Turizo',
		'🍔 McMenú Saiko',

		// 👨‍👩‍👧 Packs para compartir
		'👫 Pack Dúo (2 Menús + 2 McFlurry)',
		'👥 Pack Trío (3 Menús + Maxi 25 McNuggets)',
		'👨‍👩‍👧‍👦 Pack Familiar (2 Menús + 9 McNuggets + Happy Meal)',
		'👤 Pack Picoteo (ShareBox + 2 bebidas)',

		// 🧒 Happy Meal
		'🧒 Happy Meal 6 McNuggets',
		'🧒 Happy Meal Chicken Burger Kids','','',

		// 🍔 Hamburguesas sueltas
		'🍔 Big Mac',
		'🍔 Big Mac Bacon',
		'🍔 Big Mac Pollo',
		'🍔 McPollo',
		
		'🍔 Cuarto de Libra',
		'🍔 Cuarto de Libra Doble',
		'🍔 CBO',
		'🍔 CBO Plex',
		
		'🍔 McExtreme Bacon',
		'🍔 McExtreme Pulled Pork',
		'🍔 McExtreme Tutti Pepperoni',
		'🍔 Spicy McCrispy',

		// 🍗 McNuggets y alitas
		'🍗 4 McNuggets',
		'🍗 6 McNuggets',
		'🍗 4 Alitas',
		'🍗 10 Alitas',
		
		'🍗 6 Spicy McNuggets',
		'🍗 9 Spicy McNuggets','','',
		
		'🍗 ShareBox 10 McNuggets + 10 Spicy McNuggets',
		'🍗 ShareBox 25 McNuggets',
		'🍗 ShareBox 25 Spicy McNuggets',
		'🍗 ShareBox 10 Alitas + 10 McNuggets',
		

		// 🥤 Bebidas frías
		'🥤 Refresco pequeño',
		'🥤 Refresco mediano',
		'🥤 Refresco grande','',
		
		'🥤 Coca‑Cola',
		'🥤 Fanta',
		'🥤 Sprite',
		'🥤 Nestea',
		
		'🥤 Dr Pepper',
		'🥤 Diet Coke',
		
		'🥤 Aquarius limón',
		'🥤 Frozen Coca‑Cola',
		'🥤 Frozen Fanta',
		'🥤 Smoothie (Strawberry Banana, Mango Pineapple)',
		
		'🥤 Lemonade',
		'🥤 Iced Tea Sweet',
		'🥤 Iced Tea Unsweetened',
		'💧 Agua DASANI','',

		// ☕ McCafé
		'☕ Americano',
		'☕ Cappuccino',
		'☕ Latte',
		'☕ Caramel Macchiato',
		
		'☕ Mocha Latte',
		'☕ French Vanilla Cappuccino',
		'☕ Caramel Frappé',
		'☕ Hot Chocolate',
		
		'☕ Iced Coffees','','','',

		// 🍦 Postres y helados
		'🍦 McFlurry Oreo',
		'🍦 McFlurry M&M’s',
		'🍦 McFlurry Filipinos',
		'🍦 McFlurry Pistacho',
		
		'🍦 Vanilla Cone',
		'🍧 Hot Fudge Sundae',
		'🍧 Hot Caramel Sundae',
		'🍪 Baked Apple Pie',
		
		'🍪 Chocolate Chip Cookie',
		'🍰 Redondo Pistacho',
		'🥐 Croissant','',
		
		'🍿 McPop Lotus Biscoff',
		'🍿 McPop Chocolate Blanco',
		'🍿 McPop Nocilla',

		// 🧂 Complementos y salsas
		'🧂 Ketchup',
		'🧂 Mostaza',
		'🧂 Sour Cream Sazonador',
		'🧂 Italian Sazonador',
		
		'🧂 Salsa Agridulce',
		'🧂 Salsa Barbacoa',
		'🧂 Salsa Buffalo',
		'🧂 Salsa Deluxe',
		
		'🧂 Salsa Honey Mustard',
		'🧂 Salsa César',
		'🧂 Aceite y Vinagre','',
		
		'SIN SALSA', 'SIN VEGETALES', 'SOLO CARNE'
	],
	tutto: [
		'🍕Margarita', 	'🔥 Pizza Barbacoa',	'🧀 Pizza 4 Quesos',
		'🥘Lasaña',		'🍝 Spaghetti', 		'🍚 Risotto',
		'🧄Pan de Ajo', 	'🥤 Bebida Grande',	'🍰 Postre Tiramisú',
		'💧Agua', 		'🥤 Coca-Cola', 		'🥤 Fanta'
	],
	kingdoner: [
		// MENÚS COMPLETOS
		'🥙 Menú Kebab Pollo', 				'🥙 Menú Kebab Ternera', 		'🥙 Menú Kebab Mixto',			'🥙 Menú Kebab Solo Carne',
		'🌯 Menú Durum Pollo', 				'🌯 Menú Durum Ternera', 		'🌯 Menú Durum Mixto', 			'🌯 Menú Durum Pequeño',
		'🍕 Menú Lahmacun (Pizza Turca)',	'🍔 Menú Hamburguesa Pollo', 	'🍔 Menú Hamburguesa Ternera',	'🍔 Menú Hamburguesa Mixto',
		'🍗 Menú Nuggets (6 uds)', 			'🍗 Menú Alitas (5 uds)', 		'', 							'',

		// KEBAB Y DURUM
		'🥙 Kebab Pollo', 					'🥙 Kebab Ternera', 				'🥙 Kebab Mixto', 				'🥙 Kebab Solo Carne',
		'🌯 Durum Pollo', 					'🌯 Durum Ternera', 				'🌯 Durum Mixto', 				'🌯 Durum Solo Carne',

		// LAHMACUN / PIZZAS TURCAS
		'🍕 Lahmacun Pollo', 				'🍕 Lahmacun Ternera', 			'🍕 Lahmacun Mixto','',

		// HAMBURGUESAS
		'🍔 Hamburguesa Pollo', 				'🍔 Hamburguesa Ternera', 		'🍔 Hamburguesa Mixto','',

		// FRITOS
		'🍗 Nuggets (6 uds)', 				'🍗 Nuggets (12 uds)', 			'🍗 Alitas de Pollo (5 uds)', 	'🍗 Alitas de Pollo (10 uds)',

		// PLATOS
		'🍛 Plato de Carne (1 persona)', 	
		'🍛 Plato de Carne (2 personas)',
		'🍟 Patatas con Carne Medianas', 	
		'🍟 Patatas con Carne Grandes',
		
		'🍚 Plato de Arroz Mediano', 		
		'🍚 Plato de Arroz Grande',
		'🍽️ Plato Sultán Mediano', 			
		'🍽️ Plato Sultán Grande',

		// OFERTAS ESPECIALES
		'📦 Oferta 4 Kebab + Patatas + Refresco 2L', 		
		'📦 Oferta 6 Kebab + Patatas + Refresco 2L',
		'📦 Oferta 4 Durum + Patatas + Refresco 2L', 		
		'📦 Oferta 6 Durum + Patatas + Refresco 2L',
		
		'📦 Oferta 4 Lahmacun + Patatas + Refresco 2L',		
		'📦 Oferta 6 Lahmacun + Patatas + Refresco 2L',
		'📦 Oferta 4 Hamburguesas + Patatas + Refresco 2L',	
		'📦 Oferta 6 Hamburguesas + Patatas + Refresco 2L',
		
		'📦 Oferta 4 Platos de Carne + Pan + Patatas + Refresco 2L','','','',
		
		'📦 Oferta Variada 6 (Kebab + Durum + Lahmacun + Pizza mediana + Patatas + Refresco)',
		'📦 Oferta Variada 7 (2 Kebab + 2 Durum + Patatas + Refresco)',
		'📦 Oferta Variada 8 (Kebab + Durum + Lahmacun + Nuggets/Alitas + Patatas + Refresco)',
		'📦 Oferta Variada 9 (Kebab + Durum + Lahmacun + Hamburguesa + Patatas + Refresco)',

		// PATATAS
		'🍟 Patatas Pequeñas', 		'🍟 Patatas Medianas', 	'🍟 Patatas Grandes',

		// SALSAS
		'❌ SIN SALSA',
		'🍅 Salsa Roja', 			'🧄 Salsa Blanca', 				'🌶️ Salsa Picante', 	'🧂 Salsa Mixta',
		'🫙 Extra Salsa Roja', 		'🫙 Extra Salsa Blanca', 		'🫙 Extra Salsa Picante','',

		// BEBIDAS INDIVIDUALES
		'🥤 Coca-Cola Lata 330ml', 	'🥤 Fanta Naranja Lata 330ml', 	'🥤 Nestea Lata 330ml',	'💧 Agua Botella 500ml',

		// BEBIDAS 2 LITROS
		'🥤 Coca-Cola 2L', 			'🥤 Fanta 2L', 					'🥤 Nestea 2L', 			'💧 Agua 2L',
		
		'🥤 Aquarius Limón Lata 330ml','','',''
	]
};

// 🎯 Muestra el menú de un local
function mostrarMenu(local) {
	const contenedor = document.getElementById("menu-local");
	contenedor.innerHTML = ""; // Limpiar menú anterior

	// 🧠 Nombres bonitos con emoji
	const nombresLocales = {
		mcdonalds: "🍔 McDonald's:",
		tutto: 	   "🍕 Tutto Italia:",
		kingdoner: "🌯 King Döner Kebab(El Viso del Alcor):"
	};

	// ✅ Añadir nombre del local al pedido
	const campo = document.getElementById("CLIENTE_TEXTO");
	campo.value += (campo.value.trim() !== "" ? "\n" : "") + nombresLocales[local];

	// 🔘 Botón para cerrar menú
	const cerrar = document.createElement("button");
	cerrar.textContent = "❌ Cerrar menú";
	cerrar.classList.add("boton-cerrar-menu");
	cerrar.onclick = () => contenedor.innerHTML = "";
	contenedor.appendChild(cerrar);

	// 🔲 Botones de productos
	menusLocales[local].forEach(producto => {
		const boton = document.createElement("button");
		boton.textContent = producto;

		// Cada vez que se pulsa, añade como una línea de lista
		boton.onclick = () => { campo.value += `\n ▪️ ${producto}`; };

		contenedor.appendChild(boton);
	});
}

// 📝 Añade producto al campo de texto
function añadirProducto(producto) {
	const campo = document.getElementById("CLIENTE_TEXTO");
	campo.value += (campo.value.trim() !== "" ? "\n" : "") + producto;
}

// ✅ SOLO UNA VEZ: Botón para borrar última línea (debajo de los locales)
document.addEventListener("DOMContentLoaded", () => {
	const selectorLocales = document.querySelector(".selector-locales");

	// 👀 Evitar duplicados
	if (!document.getElementById("boton-borrar-linea")) {
		const boton = document.createElement("button");
		boton.id = "boton-borrar-linea";
		boton.textContent = "🗑️ Borrar última línea";
		boton.classList.add("boton-cerrar-menu");

		boton.onclick = () => {
			const campo = document.getElementById("CLIENTE_TEXTO");
			const lineas = campo.value.trim().split("\n");
			lineas.pop();
			campo.value = lineas.join("\n");
		};

		// ⬇️ Insertar justo debajo de los botones de local
		selectorLocales.insertAdjacentElement("afterend", boton);
	}
});


// 🧼 Botón para borrar última línea (debajo de los locales)
document.addEventListener("DOMContentLoaded", () => {
	const contenedorLocales = document.querySelector(".selector-locales");

	// Solo lo insertamos si no existe ya
	if (!document.querySelector("#boton-borrar-linea")) {
		const boton = document.createElement("button");
		boton.id = "boton-borrar-linea";
		boton.textContent = "🗑️ Borrar última línea";
		boton.classList.add("boton-cerrar-menu");
		boton.onclick = () => {
			const campo = document.getElementById("CLIENTE_TEXTO");
			const lineas = campo.value.trim().split("\n");
			lineas.pop();
			campo.value = lineas.join("\n");
		};

		// Lo añadimos justo después del contenedor de locales
		contenedorLocales.parentNode.insertBefore(boton, contenedorLocales.nextSibling);
	}
});




// 📝 Añade producto al campo de texto
function añadirProducto(producto) {
	const campo = document.getElementById("CLIENTE_TEXTO");
	campo.value += (campo.value.trim() !== "" ? "\n" : "") + producto;
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

function actualizarReloj() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const reloj = `${horas}:${minutos}:${segundos}`;
    const contenedor = document.getElementById("reloj-digital");
    if (contenedor) contenedor.textContent = reloj;
}
setInterval(actualizarReloj, 1000); 	// Actualiza cada segundo
actualizarReloj(); 						// Ejecuta inmediatamente al cargar


// ✅ Insertar botón una única vez justo debajo de los botones de local
function insertarBotonBorrarUnaVez() {
	if (!document.getElementById("boton-borrar-linea")) {
		const boton = document.createElement("button");
		boton.id = "boton-borrar-linea";
		boton.textContent = "🗑️ Borrar última línea";
		boton.classList.add("boton-cerrar-menu");
		boton.onclick = () => {
			const campo = document.getElementById("CLIENTE_TEXTO");
			const lineas = campo.value.trim().split("\n");
			lineas.pop();
			campo.value = lineas.join("\n");
		};

		const selectorLocales = document.querySelector(".selector-locales");
		selectorLocales.insertAdjacentElement("afterend", boton);
	}
}

// 📌 Ejecutar justo al cargar la web
document.addEventListener("DOMContentLoaded", insertarBotonBorrarUnaVez);

// Al cargar la web
window.onload = () => {
	detectarUbicacionInicial();
	fondoAleatorioWasa();
	CALCULADOR_DISTANCIA();
	CALCULADOR_LOCALES();
}