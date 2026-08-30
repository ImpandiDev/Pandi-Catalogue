
// Definir las variables del sitio web

// Configuración de entorno
// Cambiar a 'dev' para desarrollo local o 'prod' para producción
// Para desarrollo: cambiar a 'dev'
// Para producción: cambiar a 'prod'
const ENVIRONMENT = 'prod'; // Cambiar aquí: 'dev' o 'prod'

// URLs base según el entorno
const BASE_URLS = {
    dev: "http://127.0.0.1:8000",
    prod: "https://impandi.pythonanywhere.com"
};

const BASE_URL = BASE_URLS[ENVIRONMENT];

//Información de la empresa
const config = {
    shortName: "IMPANDI",
    fullName: "EMPRESA IMPANDI DE IMPORTACIONES S. A.",
    email: "clientes@impandi.com",
    mainColor: "#b72026",
    buttonsColor: "#333",
    culturaFecha: 'es-EC',

    //Logo
    isoTipo: "/images/isotipo.jpg",
    logo: "/images/logo.png",
    logoWidthDesktop: 210,
    logoHeightDesktop: 84,

    //Íconos
    iconBaseColor: "#333",
    iconSideColor: "#b72026",

    //Extra
    rightsYear: 2024,
    whatsappNumber: "593995693935",
    whatsappMessage: "Hola, me gustaría recibir más información sobre",
    courier: "Servientrega",

    // <= 150 el envio cueta 6
    courierPrecioSegmentoUno: 5.22,
    minEnvioSegmentoUno: 150.00,
    // > 150 y <= 200 el envio es 4
    courierPrecioSegmentoDos: 3.48,
    minEnvioSegmentoDos: 200.00,
    // > de 200 es gratis
    courierPrecioSegmentoTres: 0,

    compraMinima: 50.00,
    compraMinimaMayorista: 200.00,
    iva: 15.00,
    tasaMinorista: 1.1, //El 10% extra
    tasaMayorista: 1, //Precio base

    //Api - Productos
    obtenerTodosLosProductos: `${BASE_URL}/productos/obtenerTodos`,
    obtenerProductos: `${BASE_URL}/productos/obtenerProductos`,
    obtenerProducto: `${BASE_URL}/productos/obtenerProducto`,
    obtenerProductosRelacionados: `${BASE_URL}/productos/obtenerProductosRelacionados`,
    obtenerMarcas: `${BASE_URL}/productos/obtenerMarcas`,
    obtenerEtiquetas: `${BASE_URL}/productos/obtenerEtiquetas`,
    obtenerProductosPorLista: `${BASE_URL}/productos/obtenerProductosPorLista`,

    //Api - Autenticación Cliente
    login: `${BASE_URL}/auth/client/login`,
    authRegister: `${BASE_URL}/auth/client/register`,
    authUpdate: `${BASE_URL}/auth/client/update`,
    recuperarContrasena: `${BASE_URL}/auth/client/recoverPassword`,
    updatePassword: `${BASE_URL}/auth/client/updatePassword`,
    obtenerPedidosDeDatil: `${BASE_URL}/auth/client/obtenerPedidosDatil`,

    //Api - Pedidos
    crearCompra: `${BASE_URL}/productos/crearCompra`,

    //Api - Admin
    obtenerClientes: `${BASE_URL}/auth/admin/obtenerClientes`,
    cambiarEstadoRegistrado: `${BASE_URL}/auth/admin/cambiarEstadoRegistrado`,
    eliminarCliente: `${BASE_URL}/auth/admin/eliminarCliente`,
    registrarCliente: `${BASE_URL}/auth/admin/registrarCliente`,
    cambiarTipoUsuario: `${BASE_URL}/auth/admin/cambiarTipoUsuario`,
    cargarProductosDesdeDatil: `${BASE_URL}/productos/cargarProductosDesdeDatil`,
    obtenerPedidosPorUsuario: `${BASE_URL}/productos/obtenerComprasPorUsuario`,
    obtenerCompras: `${BASE_URL}/productos/obtenerCompras`,
    obtenerCompraPorCodigo: `${BASE_URL}/productos/obtenerCompraPorCodigo`,
    editarCompra: `${BASE_URL}/productos/editarCompra`,
    eliminarCompra: `${BASE_URL}/productos/eliminarCompra`,

    //Api - Contactos
    obtenerContactos: `${BASE_URL}/auth/contacto/obtenerContactos`,
    crearContacto: `${BASE_URL}/auth/contacto/crearContacto`,
    actualizarContacto: `${BASE_URL}/auth/contacto/actualizarContacto`,
    eliminarContacto: `${BASE_URL}/auth/contacto/eliminarContacto`,
    cambiarEstadoContacto: `${BASE_URL}/auth/contacto/cambiarEstadoContacto`,

    //Api - Vendedor
    obtenerClientesPorVendedor: `${BASE_URL}/auth/admin/obtenerClientesPorVendedor`,

    //Api - Marketing
    cargarListaDeCorreosActivos: `${BASE_URL}/marketing/mailing/cargarListaDeCorreosActivos`,
    cargarListaDeCorreosInactivos: `${BASE_URL}/marketing/mailing/cargarListaDeCorreosInactivos`,
    obtenerSuscripciones: `${BASE_URL}/marketing/mailing/obtenerSuscripciones`,

    // Información del entorno (útil para debugging)
    environment: ENVIRONMENT,
    baseUrl: BASE_URL
};



// Exportar las variables
export default config;
