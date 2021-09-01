import React, { useEffect, useState, useContext, Fragment } from 'react';

// importar cliente axios
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
//import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';

const Clientes = () => {

const [clientes, guardarClientes]=useState([]);

const consultarAPI = async ()=>{
    const clientesConsulta = await clienteAxios.get('/clientes');
    //guardar en el state
    guardarClientes(clientesConsulta.data);
  }

//Hook use Effect
useEffect( () => {
  consultarAPI();
},[clientes]);
  
    return (
        <>
          <h1>Clientes</h1>
          <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
          <ul className='listlado-clientes'> 
          {clientes.map(cliente => (
            <Cliente 
            key={cliente._id}
            cliente={cliente}
            />
          ))}
          </ul> 
        </>
    )
}

export default Clientes
