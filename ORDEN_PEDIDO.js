// Mi WeWasa/WasaWe de Reparto 2.0.0 15725
function ENTRADA(texto,caja,tipo,filas) {
	const entrada = document.createElement(tipo);
	entrada.type = 						"text";
	entrada.placeholder = 				texto;
	entrada.style.fontSize =        	"0.9rem";
	entrada.rows = 						filas;
	entrada.style.display =            	"flex";
	entrada.style.flexDirection =      	"row";              // row, row-reverse, column y column-reverse
	entrada.style.color =              	MENSAJE_TEXTO_COLOR;
	entrada.style.backgroundColor =    	MENSAJE_FONDO_COLOR_ENTRADA;
	TEMA_WEWASA(entrada);
	entrada.style.padding =         	MENU_LOCAL_RELLENO;
	entrada.style.margin =          	MENU_LOCAL_MARGEN;
	// entrada.style.gap =                "0.0rem";
	entrada.style.width =             	"100%";

	caja.appendChild(entrada);

}
//
// ORDEN DEL PEDIDO
//
function ORDEN_PEDIDO() {
	const caja = document.createElement("button");
	caja.innerHTML =				`Orden del pedido:`
	caja.style.fontSize =        	"1.1rem";
	caja.style.display =            "flex";
	caja.style.flexDirection =      "row";              // row, row-reverse, column y column-reverse
	caja.style.flexWrap =           "wrap";
	caja.style.justifyContent =     "center";
	caja.style.color =              MENSAJE_FONDO_COLOR_BOTON;
	caja.style.backgroundColor =    MENSAJE_FONDO_COLOR;
	TEMA_WEWASA(caja);
	caja.style.width =             	BASE_ANCHO;

	document.body.appendChild(caja);

	ENTRADA("Tu Nombre:",caja,"input");
	ENTRADA("Tu Dirección:",caja,"input");
	ENTRADA("Nombra el local y escribe me tú pedido...",caja,"textarea", "12");


	const boton = document.createElement("button");
	boton.innerHTML =               `\
<strong">\
<span style='display:inline-block; transform:scaleX(-1);'> 💨 </span>\
 ENVIAR ORDEN \
<span style='display:inline-block; transform:scaleX(-1);'> 🛵 </span>\
</strong>`;

	boton.style.color =             MENSAJE_FONDO_COLOR_ENTRADA;
	boton.style.backgroundColor =   MENSAJE_TEXTO_COLOR;
	boton.style.fontSize =          "1.1rem";
	TEMA_WEWASA_MENU_LOCAL(boton);
	boton.style.padding =         	MENU_LOCAL_RELLENO;
	boton.style.margin =          	MENU_LOCAL_MARGEN;
	boton.style.width =             "100%";
	boton.style.display =           "block";

	caja.appendChild(boton);

	// CLICK DEL BOTON DE ENVIAR ORDEN
	boton.onclick = () => {
		const entradas = caja.querySelectorAll("input, textarea");

		const nombre = 		entradas[0].value.trim();
		const direccion = 	entradas[1].value.trim();
		const texto = 		entradas[2].value.trim();

		if (!nombre) { 			alert("Por favor, rellena tu nombre."); return; }
		if (!direccion) { 		alert("Por favor, rellena tu dirección."); return; }
		if (!texto) { 			alert("Por favor, rellena tu lista de pedido."); return; }
// 		if (!ubicacionLista) { 	alert("Espera unos segundos o revisa los permisos."); return; }

		const mensaje = `
👤 ${nombre}
🏠 ${direccion}
📋 Pedido:
${texto}`;

		const CHOCOLATE = 34635291704

		window.open(`https://api.whatsapp.com/send?phone=${CHOCOLATE}\
		&text=${encodeURIComponent(mensaje)}`, "_blank");
	}
}




