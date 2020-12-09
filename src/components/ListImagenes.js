import React from 'react';
import Imagen from './Imagenes';

const ListImagenes = ({imagenes}) =>{
    return(
        <div className="col-12 p-5 row">
            {imagenes.map(imagen =>(
                <Imagen 
                    key= {imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    )
}

export default ListImagenes;