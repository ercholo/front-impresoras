import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Creamos las filas
const impresorasMalaga = [
  createData('19ALREC01', 0, 'RG19','172.30.91.245','I19G'),
  createData('19ALEXP01', 0, 'RG19','172.30.91.246','I19X'),
  createData('19ALJEF01', 0, 'RG19','172.30.91.250','I19J'),
  createData('19ATTOM01', 0, 'RG19','172.30.91.244','I19T'),
  createData('19ATTOM02', 0, 'RG19','172.30.91.248'),
  createData('19ADCOM01', 0, 'RG19','172.30.91.247','I19A'),
  createData('19ALETQ01', 0, 'RG19','172.30.91.140','E191'),
  createData('19ALETQ03', 0, 'RG19','172.30.91.143','E193'),
  createData('19ALETQ05', 0, 'RG19','172.30.91.237','E195')
]

export const TablaMalaga = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasMalaga.find(printer => {
      //Si la impresora coincide y los datos son distintos de los que ya teníamos entonces tralarí 
      if (data?.impresora === printer?.nameImpresora) {
        printer.numTrabajos = data?.valor
      }
      setValor(() => data)
    });
  }, []);

  useEffect(() => {
    recibirDatosActualizados();
  }, [recibirDatosActualizados]);

  return (

    <table className="table table-hover">
      <thead>
        <tr>
        <th scope="col">Impresora</th>
          <th scope="col">Trabajos</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Pausar</th>
          <th scope="col">Reanudar</th>
          <th scope="col">Estado</th>
          <th scope="col">Desviar</th>
        </tr>
      </thead>
      <tbody>
        {impresorasMalaga.map((impresora) => (
          <tr key={impresora?.nameImpresora}>
          <td>{impresora?.nameImpresora}</td>
          <td>{impresora?.numTrabajos}</td>
          <td>{<BotonActualizar printer={impresora?.nameImpresora} recibirDatos={recibirDatosActualizados} />}</td>
          <td>{<BotonPausa printer={impresora?.nameImpresora} />}</td>
          <td>{<BotonReanuda printer={impresora?.nameImpresora} />}</td>
          <td>{<BotonEstado printer={impresora?.nameImpresora} />}</td>
          <td>{<BotonDesviar printer={impresora?.nameImpresora} />}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
});

TablaMalaga.displayName = 'TablaMalaga';