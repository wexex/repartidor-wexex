// Mi WeWasa/WasaWe de Reparto 2.0.0 15725
//
// CALCULADOR DE DISTANCIA
//
function CALCULADOR_DISTANCIA() {

		// cambiar las constantes por un array
		const PRECIO_KM = 		0.55;
		const PRECIO_COMIDA = 	0.40;
		const PRECIO_RECADOS = 	0.45;
		const PRECIO_PAQUETE = 	0.50;

		const mensaje = document.createElement("button");
		mensaje.innerHTML = 				`<strong> 🧮 Calculador de distancia:</strong>\n`;
		mensaje.style.fontFamily =  		BASE_TEXTO_FUENTE;
		mensaje.style.fontSize =        	BASE_TEXTO_TAMANIO;
		mensaje.style.color =             	BASE_TEXTO_COLOR;
		mensaje.style.whiteSpace = 			BASE_TEXTO_ESPACIO_BLANCO;
		mensaje.style.textAlign = 			BASE_TEXTO_ALINEAMIENTO;
		mensaje.style.backgroundColor = 	BASE_COLOR_FONDO;
		mensaje.style.width =             	BASE_ANCHO;
		mensaje.style.borderRadius =      	BASE_BORDES_RADIO;
		mensaje.style.border =            	BASE_BORDES;
		mensaje.style.padding =           	BASE_RELLENO;
		mensaje.style.margin =            	BASE_MARGEN;
		mensaje.style.boxSizing = 			BASE_DIV_LIMITE_CAJA;


		document.body.appendChild(mensaje);

		const DISTANCIA = document.createElement("input");
		DISTANCIA.type = 						"text";
// 		DISTANCIA.value =  						"0"
		DISTANCIA.placeholder = 				"0.0 kilómetros de distancia";
		DISTANCIA.style.color =             	MENSAJE_TEXTO_COLOR;
		DISTANCIA.style.backgroundColor = 		MENSAJE_FONDO_COLOR_ENTRADA;
		DISTANCIA.style.fontFamily = 			BASE_TEXTO_FUENTE;
		DISTANCIA.style.width = 				"17rem";
		DISTANCIA.style.borderRadius =      	BASE_BORDES_RADIO;
		DISTANCIA.style.border =            	BASE_BORDES;
		DISTANCIA.style.padding =           	BASE_RELLENO;
		DISTANCIA.style.margin =            	"0.2rem 0.1rem";
		DISTANCIA.style.boxSizing = 			BASE_DIV_LIMITE_CAJA;
		DISTANCIA.style.accentColor = 			MENSAJE_TEXTO_COLOR;

		mensaje.appendChild(DISTANCIA);

		function CALCULAR_DISTANCIA(valor) {
			const KMS = (valor * PRECIO_KM);

			const RECADO =  (KMS + PRECIO_RECADOS).toFixed(2);
			const PAQUETE = (KMS + PRECIO_PAQUETE).toFixed(2);
			const COMIDA =  (KMS + PRECIO_COMIDA).toFixed(2);

			TIPOS_TRANSPORTE.innerHTML = `\
<strong>Comida:</strong> \t${COMIDA} €\
\n\
<strong>Recado:</strong> \t${RECADO} €\
\n\
<strong>Paquete:</strong>\t${PAQUETE} €\
`;
		}

		const BOTON_ANCHO_MAS_MENOS = "2.0rem";
		const BOTON_TAMANIO_MAS_MENOS = `calc(${BASE_TEXTO_TAMANIO} + 0.3rem)`;


		// ➕ Botón sumar
		const btnMas = document.createElement("button");
		btnMas.innerHTML = 					`🔼`;
		btnMas.style.fontSize =        		BOTON_TAMANIO_MAS_MENOS;
		btnMas.style.fontFamily =      		BASE_TEXTO_FUENTE;
		btnMas.style.color =             	"white";
		btnMas.style.backgroundColor = 		"transparent";
		btnMas.style.borderRadius =      	BASE_BORDES_RADIO;
		btnMas.style.border =            	BASE_BORDES;
		btnMas.style.padding =           	"0.3rem";
		btnMas.style.margin =            	"auto";
		btnMas.style.width = 				BOTON_ANCHO_MAS_MENOS;

		btnMas.onclick = () => {
			let valor = parseFloat(DISTANCIA.value || "0");
			valor += 0.1;
			DISTANCIA.value = valor.toFixed(1);
			CALCULAR_DISTANCIA(valor);
		};

		mensaje.appendChild(btnMas);

		// ➖ Botón restar
		const btnMenos = document.createElement("button");
		btnMenos.innerHTML = 				`🔽`;
		btnMenos.style.fontSize =        	BOTON_TAMANIO_MAS_MENOS;
		btnMenos.style.fontFamily =      	BASE_TEXTO_FUENTE;
		btnMenos.style.color =             	"white";
		btnMenos.style.backgroundColor = 	"transparent";
		btnMenos.style.borderRadius =      	BASE_BORDES_RADIO;
		btnMenos.style.border =            	BASE_BORDES;
		btnMenos.style.padding =           	"0.3rem";
		btnMenos.style.margin =            	"auto";
		btnMenos.style.width = 				BOTON_ANCHO_MAS_MENOS;

		btnMenos.onclick = () => {
			let valor = parseFloat(DISTANCIA.value || "0");
			if (valor > 0) valor -= 0.1;

			if (valor <= 0) {
				DISTANCIA.value = "";
				CALCULAR_DISTANCIA(0);
				return;
			}

			DISTANCIA.value = valor.toFixed(1);
			CALCULAR_DISTANCIA(valor);
		};

		mensaje.appendChild(btnMenos);


		const TIPOS_TRANSPORTE = document.createElement("button");
		TIPOS_TRANSPORTE.style.fontFamily =  		BASE_TEXTO_FUENTE;
		TIPOS_TRANSPORTE.style.fontSize =        	BASE_TEXTO_TAMANIO;
		TIPOS_TRANSPORTE.style.color =             	MENSAJE_TEXTO_COLOR;
		TIPOS_TRANSPORTE.style.backgroundColor = 	MENSAJE_FONDO_COLOR_ENTRADA;
		TIPOS_TRANSPORTE.style.whiteSpace = 		BASE_TEXTO_ESPACIO_BLANCO;
		TIPOS_TRANSPORTE.style.textAlign = 			BASE_TEXTO_ALINEAMIENTO;
		TIPOS_TRANSPORTE.style.width =             	"21.7rem";
		TIPOS_TRANSPORTE.style.borderRadius =      	BASE_BORDES_RADIO;
		TIPOS_TRANSPORTE.style.border =            	BASE_BORDES;
		TIPOS_TRANSPORTE.style.padding =           	BASE_RELLENO;
		TIPOS_TRANSPORTE.style.margin =            	"0.1rem";

		mensaje.appendChild(TIPOS_TRANSPORTE);

		CALCULAR_DISTANCIA(0.0);

}
