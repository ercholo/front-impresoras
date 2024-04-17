import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from './';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Creamos las filas
const impresorasMelilla = [
  createData('17ADCOM01', 0, 'RG17', '172.30.95.243','17A1'),
  createData('17ALAV101', 0, 'RG17', '172.30.95.247','1701'),
  createData('17ALAV102', 0, 'RG17', '172.30.95.242','1702'),
  createData('17ALDEV01', 0, 'RG17', '172.30.95.245','17D1'),
  createData('17ALGVO01', 0, 'RG17', '172.30.95.248','17A3'),
  createData('17ALJEF01', 0, 'RG17', '172.30.95.245','17J1'),
  createData('17ATTOM01', 0, 'RG17', '172.30.95.246','17T1')
]

export const TablaMelilla = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasMelilla.find(printer => {
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
        {impresorasMelilla.map((impresora) => (
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

TablaMelilla.displayName = 'TablaMelilla';