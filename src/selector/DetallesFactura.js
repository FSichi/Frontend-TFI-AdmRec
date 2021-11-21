export const getDetallesByFacturaID = ( id, detalles ) => {

    var detallesFacturas = [];
    
    if(id === ''){
        return [];
    }
    
    detalles.forEach(detalle => {
        
        if(detalle.idFactura === id){
            detallesFacturas.push(detalle);
        }
    });
    
    return detallesFacturas;

}
