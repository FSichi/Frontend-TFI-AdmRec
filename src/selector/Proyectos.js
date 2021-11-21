
export const getProyectosByID = ( id, proyectos ) => {

    return proyectos.find( proyecto => proyecto.id === id);
}

export const getProyectosByName = ( name, proyectos ) => {
    
    if(name === ''){
        return [];
    }
    
    name = name.toLowerCase();
    return proyectos.filter( proyecto => proyecto.nombre.toLowerCase().includes(name) );

}

export const getProyectosByCliente = ( cliente, proyectos ) => {

    if(cliente === ''){
        return [];
    }
    
    return proyectos.filter( proyecto => proyecto.ClienteId === cliente );

}

export const getProyectosByCliente2 = ( cliente, proyectos ) => {

    if(cliente === ''){
        return [];
    }
    
    return proyectos.filter( proyecto => proyecto.clienteID === cliente );

}