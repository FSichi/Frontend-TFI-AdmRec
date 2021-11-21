
export const getClientesByID = (id, clientes) => {

    return clientes.find(cliente => cliente.id === id);

}

export const getClientesByName = (name, clientes) => {

    if (name === '') {
        return [];
    }

    name = name.toLowerCase();
    return clientes.filter(cliente => cliente.apellidoyNombre.toLowerCase().includes(name));

}


export const getClientesByRazonSocial = (rz, clientes) => {

    if (rz === '') {
        return [];
    }

    if(!clientes){
        return [];
    }

    return clientes.filter(cliente => cliente.apellidoyNombre === rz);
}


export const getClientesByCuitCuil = (number, clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return clientes.filter(cliente => cliente.cuit_cuil.toLowerCase().includes(number));

}

export const verificarClienteByCuitCuil = (number, clientes) => {

    var b = false

    if (number === '') {
        return b;
    }

    clientes.forEach(cliente => {

        if (cliente.cuit_cuil === number) {
            b = true;
        }

    });

    return b;

}

export const getClientesByCuitCuilExact = (number, clientes) => {

    if (number === '') {
        return [];
    }

    number = number.toLowerCase();
    return clientes.find(cliente => cliente.cuit_cuil === number);

}


export const getClientesByAll = (search, clientes) => {


    if (search === '') {
        return [];
    }

    if (search[0] !== '0' &&
        search[0] !== '1' &&
        search[0] !== '2' &&
        search[0] !== '3' &&
        search[0] !== '4' &&
        search[0] !== '5' &&
        search[0] !== '6' &&
        search[0] !== '7' &&
        search[0] !== '8' &&
        search[0] !== '9'
    ) {

        return getClientesByName(search, clientes);

    }

    return getClientesByCuitCuil(search, clientes);

}