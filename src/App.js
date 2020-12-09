import {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListImagenes from './components/ListImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [ totalPaginas, guardarTotalPaginas] = useState(1);
  
  useEffect(()=>{
    const consultarAPI= async () =>{
      if(busqueda ==='') return;

    const imagenesPorPagina= 30;
    const key= '19460649-b8129705531b508d7b2d40798';
    const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

    const respuesta= await fetch(url);
    const resultado= await respuesta.json();
    
    guardarImagenes(resultado.hits);

    const calcularTotaldePaginas= Math.ceil(resultado.totalHits / imagenesPorPagina)
    guardarTotalPaginas(calcularTotaldePaginas);

    const saltar= document.querySelector('.jumbotron');
    saltar.scrollIntoView({behavior: 'smooth'})
    }
    consultarAPI();
  },[busqueda, paginaActual])

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPaginas) return;

    guardarPaginaActual(nuevaPaginaActual)
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListImagenes
          imagenes={imagenes}
        />
        { (paginaActual===1) ? null : (
          <button 
          type="button"
          onClick={paginaAnterior}
          className="btn btn-info mr-1">&laquo; Anterior 
          </button>
        )}
        
        { (paginaActual === totalPaginas) ? null : (
          <button 
          type="button"
          onClick={paginaSiguiente}
          className="btn btn-info">Siguiente &raquo;
        </button>
        )}
      </div>
    </div>
  );
}

export default App;
