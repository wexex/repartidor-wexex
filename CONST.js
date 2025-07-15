// Mi WeWasa/WasaWe de Reparto 2.0.0 15725


// CONSTANTES de ESTILO BASE
const BASE_TEXTO_COLOR =       		"white";
const BASE_COLOR_FONDO =       		"#144D37";

const BASE_TEXTO_CONTENIDO =   		"ARTICULO"
const BASE_TEXTO_TAMANIO =     		"0.85rem";
const BASE_TEXTO_FUENTE	=      		"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const BASE_ANCHO = 					"23rem"
const BASE_BORDES_RADIO =      		"0.5rem"
const BASE_BORDES =            		"none";
const BASE_RELLENO =           		"0.3rem 0.4rem";
const BASE_MARGEN =            		"0.4rem 0.0rem";

const BASE_TEXTO_ESPACIO_BLANCO = 	"pre-wrap";			// ✅ permite saltos de línea"
const BASE_TEXTO_ALINEAMIENTO = 	"left";				// ✅ alinea el texto como WhatsApp"

const BASE_DIV_LIMITE_CAJA = 		"border-box";


const BANNER_TEXTO_COLOR = 			"white";
const BANNER_FONDO_COLOR = 			"#144d37";

const MENSAJE_TEXTO_COLOR = 		BANNER_TEXTO_COLOR;
const MENSAJE_FONDO_COLOR = 		BANNER_FONDO_COLOR;

const MENSAJE_TEXTO_COLOR_BOTON = 	"white";
const MENSAJE_FONDO_COLOR_BOTON = 	"#21C063";

const MENSAJE_TEXTO_COLOR_ENTRADA = "white";
const MENSAJE_FONDO_COLOR_ENTRADA = "#424445";


const MENU_LOCAL_RELLENO =          "0.4rem 0.4rem";
const MENU_LOCAL_MARGEN =           "0.2rem 0.2rem";


//
// MI TEMA WEWASA
//
function TEMA_WEWASA(a) {
    a.style.borderRadius =      BASE_BORDES_RADIO;
    a.style.border =            BASE_BORDES;
    a.style.padding =           BASE_RELLENO;
    a.style.margin =            BASE_MARGEN;
}

//
// MI TEMA WEWASA MENU DEL LOCAL
//
function TEMA_WEWASA_MENU_LOCAL(a) {
    a.style.borderRadius =      BASE_BORDES_RADIO;
    a.style.border =            BASE_BORDES;
    a.style.padding =           BASE_RELLENO;
    a.style.margin =            "0.4rem 0.2rem";
}
