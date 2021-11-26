
export const contarProyectos = (proyectos) => {

    return proyectos.length;

}

export const contarClientes = (clientes) => {

    return clientes.length;

}

export const contarFacturas = (facturas) => {

    return facturas.length;

}

export const contarIngresos = (facturas) => {

    if (facturas.length === 0) {
        return 0;
    }

    var ingresos = 0;

    facturas.forEach(factura => {
        ingresos = ingresos + parseInt(factura.total);
    });

    return ingresos;

}


/* ------------------------------------------------------- */

export const separarEstadoProyectos = (proyectos) => {

    var estados = [

        {
            id: '1',
            proyectos: []
        },
        {
            id: '2',
            proyectos: []
        }
    ];

    proyectos.forEach(proyecto => {

        if (proyecto.estado === 'Desarrollo') {
            estados[0].proyectos.push(proyecto);
        } else {
            estados[1].proyectos.push(proyecto);
        }

    });

    return estados;

}

export const separarClientes = (clientes, proyectos) => {

    var clientesFilter = [];
    var clientesFilterSize = [];

    var client = {
        user: {},
        cantidad: 0
    }

    var ac = 0;

    clientes.forEach(cliente => {

        client = {
            user: {},
            cantidad: 0
        }

        ac = 0;

        proyectos.forEach(proyecto => {

            if (proyecto.ClienteId === cliente.id) {
                ac++;
            }

        });

        client.user = cliente;
        client.cantidad = ac;

        clientesFilter.push(client);

    });

    /* REVISAR ORDENAMIENTO */

    clientesFilter.sort(function compareNumbers(a, b) {
        return a - b;
    });

    if (clientes.length > 3) {

        clientesFilterSize.push(clientesFilter[0]);
        clientesFilterSize.push(clientesFilter[1]);
        clientesFilterSize.push(clientesFilter[2]);

        return clientesFilterSize;

    } else {

        return clientesFilter
    }

}