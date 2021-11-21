
export const obtenerTipoFactura = (tipoFactura) => {

    var tipoFacturaFinal = '';

    switch (tipoFactura) {
        case '1':
            tipoFacturaFinal = 'A'
            break;
        case '2':
            tipoFacturaFinal = 'B'
            break;
        case '3':
            tipoFacturaFinal = 'C'
            break;
    
        default:
            break;
    }

    return tipoFacturaFinal;

}


export const generarFactura = (proyectos, cliente, tipoFac, medioPago) => {

    var tf = '';
    var mp = '';

    switch (tipoFac) {
        case '1':
            tf = 'A'
            break;
        case '2':
            tf = 'B'
            break;
        case '3':
            tf = 'C'
            break;
        default:
            break;
    }

    switch (medioPago) {
        case '1':
            mp = 'Efectivo'
            break;
        case '2':
            mp = 'Tarjeta'
            break;

        default:
            break;
    }

    var totalPresupuesto = 0;
    var totalIVA = 0;

    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    
    var hh = today.getHours();
    var mn = today.getMinutes();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mn < 10) {
        mn = '0' + mn;
    }

    var fechaFinal = yyyy + '-' + mm + '-' + dd + ' || ' + hh + ':' + mn ;


    proyectos.forEach(proyecto => {
        totalPresupuesto = totalPresupuesto + proyecto.cotizacion;
    });

    totalIVA = totalPresupuesto * 0.21;

    var factura = {
        total: totalPresupuesto,
        medioPago: mp,
        fecha: fechaFinal,
        razonSocial: cliente.nombre,
        iva: '21 %',
        montoIVA: totalIVA,
        TipoFactura: tf,
    }

    return factura

}


export const generarDetallesFactura = (proyectos, cliente, factura) => {

    var detalles = [];

    proyectos.forEach(proyecto => {

        var detalle = {
            id: (Math.floor(Math.random() * (1000 - 1)) + 1),
            idFactura: factura.id,
            idProyecto: proyecto.id,
            cantidad: 1,
            descripcion: proyecto.nombre,
            precioUnitario: proyecto.cotizacion * 0.79,
            subTotal: proyecto.cotizacion * 0.79
        }

        detalles.push(detalle)
    });

    return detalles;

}