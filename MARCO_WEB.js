// Mi WeWasa/WasaWe de Reparto 2.0.1 15725
//
// TITULO DE LA PESTAÑA DE LA WEB
//
function PESTAÑA_TITULO(a) { document.title = a; }
//
// FONDO ALEATORIO DEL TRABAJO PARA NO ABURRIR
//
function FONDO_ALEATORIO() {
	const numero = Math.floor(Math.random() * 6) + 1; 	// 1 al 6
	const fondo = `./imgs/wasa_fondo${numero}.jpeg`; 	// Ruta del fondo

    document.body.style.background =            MENSAJE_FONDO_COLOR_ENTRADA;
	document.body.style.backgroundImage =       `url(${fondo})`;
    document.body.style.backgroundRepeat =      "no-repeat";
    document.body.style.backgroundPosition =    "center";
    document.body.style.backgroundAttachment =  "fixed";
    document.body.style.backgroundSize =        "cover";

	console.log(`🖼️ Fondo cargado: wasa_fondo${numero}.jpeg`);
}
//
// BANNER
//
function BANNER() {
	document.body.style.paddingTop = "3.5rem";				// SEPARACION ENTRE EL BANNER Y LOS MENSAJES

    const banner = document.createElement("div");
    banner.style.background = 			BANNER_FONDO_COLOR;
    banner.style.color =				BANNER_TEXTO_COLOR;
    banner.style.display = 				"flex";
    banner.style.justifyContent = 		"space-between";
    banner.style.alignItems = 			"center";			// Objetos centrados
    banner.style.padding = 				"0.4rem 0.4rem";	// Separación
    banner.style.position = 			"fixed";
	banner.style.left = 				"0";				// Posición Izquierda
	banner.style.right = 				"0"; 				// Posición Derecha
	banner.style.top = 					"0";				// Posición Arriba
// 	banner.style.zIndex = 				"9999";				// Posición Abajo

    const PERFIL_FOTO = document.createElement("button");
    PERFIL_FOTO.style.backgroundImage =     `url(./imgs/wasa_foto_perfil.png)`;
    PERFIL_FOTO.style.backgroundRepeat =    "no-repeat";
    PERFIL_FOTO.style.backgroundPosition =  "center";
    PERFIL_FOTO.style.backgroundSize =      "cover";

    PERFIL_FOTO.style.width = 			"3rem";				// Ancho
    PERFIL_FOTO.style.height = 			"3rem";				// Largo
    PERFIL_FOTO.style.borderRadius = 	"50%";				// Radio del borde
    PERFIL_FOTO.style.border = 			BASE_BORDES;		// Visibilidad de los bordes

	const PERFIL = document.createElement("div");
	PERFIL.style.display = 				"flex";
	PERFIL.style.flexDirection = 		"column";
	PERFIL.style.alignItems = 			"flex-start";

	const titulo = document.createElement("button");
	titulo.textContent = 				`Repartidor Víctor "Wexex"`;
	titulo.style.color = 				BANNER_TEXTO_COLOR;	// Color
	titulo.style.background = 			"none";				// Fondo transparente
	titulo.style.fontFamily = 			BASE_TEXTO_FUENTE;	// Fuente
	titulo.style.fontSize = 			"0.95rem";			// Tamaño
	titulo.style.border = 				BASE_BORDES;		// Visibilidad de los bordes
	titulo.style.fontWeight = 			"bold";				// En NEGRITA

	const subtitulo = document.createElement("button");
	subtitulo.textContent = 			`Tu repartidor de confianza.`;
	subtitulo.style.color = 			BANNER_TEXTO_COLOR;				// Color
	subtitulo.style.background = 		"none";
	subtitulo.style.fontFamily = 		BASE_TEXTO_FUENTE;
	subtitulo.style.fontSize = 			"0.75rem";
	subtitulo.style.border = 			BASE_BORDES;

    const izquierda = document.createElement("div");
    izquierda.style.display = 			"flex";
    izquierda.style.alignItems = 		"center";
    izquierda.style.gap = 				"0.5rem";

    const derecha = document.createElement("button");
    derecha.id = 						"reloj";
    derecha.textContent = 				"";
    derecha.style.color = 				BANNER_TEXTO_COLOR;
    derecha.style.background = 			"none";
    derecha.style.fontFamily = 			BASE_TEXTO_FUENTE;
    derecha.style.fontSize = 			"0.8rem";
    derecha.style.border = 				BASE_BORDES;

	derecha.style.display = 			"flex";
	derecha.style.padding = 			"0.0rem 1.0rem";	// Separación
	derecha.style.margin = 				"1.0rem 0.0rem";	// Margenes de la imagen

    // Construcción del PERFIL
	PERFIL.appendChild(titulo);			// Titulo
	PERFIL.appendChild(subtitulo);		// Subtitulo

	document.body.prepend(banner);		// Banner
    izquierda.appendChild(PERFIL_FOTO); // Foto
    izquierda.appendChild(PERFIL);		// Perfil: titulo y subtitulo

    banner.appendChild(izquierda); 		// A la izquierda del banner
    banner.appendChild(derecha);		// A la derecha del banner

    setInterval(() => {
        const HORA_LOCAL = new Date();
        const hh = HORA_LOCAL.getHours().toString().padStart(2, '0');
        const mm = HORA_LOCAL.getMinutes().toString().padStart(2, '0');
        const ss = HORA_LOCAL.getSeconds().toString().padStart(2, '0');
        derecha.textContent = `${hh}:${mm}:${ss}`;
    }, 1000);

}
//
// PIE DE LA WEB
//
function PIE() {
    const PIE = document.createElement("button");
    PIE.innerHTML = `\
© 2025 Repartidor Victor Wexex\n
<span style='display:inline-block; transform:scaleX(1);'> 🛵 </span>\
<span style='display:inline-block; transform:scaleX(-1);'> 📦 </span>\
Servicio de reparto\
<span style='display:inline-block; transform:scaleX(1);'> 📦 </span>\
<span style='display:inline-block; transform:scaleX(-1);'> 🛵 </span>\
`;
    PIE.style.color =               MENSAJE_FONDO_COLOR_BOTON;
    PIE.style.backgroundColor =     MENSAJE_FONDO_COLOR_ENTRADA;
    PIE.style.fontSize =            "1.0rem";
    PIE.style.whiteSpace = 		    BASE_TEXTO_ESPACIO_BLANCO;
    PIE.style.textAlign =           "center";
    TEMA_WEWASA(PIE);
    PIE.style.width =               BASE_ANCHO;
    PIE.style.lineHeight =          "0.7";
	PIE.style.padding = 			"0.6rem";

    //     PIE.style.position = 			"fixed";


    document.body.appendChild(PIE);
}
//
// ESTRUCTURA DE LA WEB, MI WEWASA
//
function MARCO_WEB(){
    PESTAÑA_TITULO(`Repartidor Víctor "Wexex"`);
    FONDO_ALEATORIO();
    BANNER();

}
