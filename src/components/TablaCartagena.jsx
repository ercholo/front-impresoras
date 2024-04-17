import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasCartagena = [
  createData('03ADCOM01', 0, 'RG03','172.30.30.247','I032'),
  createData('03ATTOM01', 0, 'RG03','172.30.30.246','I03T'),
  createData('03ALSAL01', 0, 'RG03','172.30.30.245','I031'),
  createData('03ALAV101', 0, 'RG03','172.30.30.248','I035'),
  createData('03ALAV102', 0, 'RG03','172.30.30.249','I036')
]

export const TablaCartagena = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasCartagena.find(printer => {
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
        {
          impresorasCartagena.map((impresora) => (
            <tr key={impresora?.nameImpresora}>
              <td>{impresora?.nameImpresora}</td>
              <td>{impresora?.numTrabajos}</td>
              <td>{<BotonActualizar printer={impresora?.nameImpresora} recibirDatos={recibirDatosActualizados} />}</td>
              <td>{<BotonPausa printer={impresora?.nameImpresora} />}</td>
              <td>{<BotonReanuda printer={impresora?.nameImpresora} />}</td>
              <td>{<BotonEstado printer={impresora?.nameImpresora} />}</td>
              <td>{<BotonDesviar printer={impresora?.nameImpresora} />}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
});

TablaCartagena.displayName = 'TablaCartagena';