export const getFacturasByID = ( id, facturas ) => {

    return facturas.find( factura => factura.id === id);
}

export const getFacturasByRazonSocial = ( name, facturas ) => {
    
    if(name === ''){
        return [];
    }
    
    name = name.toLowerCase();
    return facturas.filter( factura => factura.razonSocial.toLowerCase().includes(name) );

}
