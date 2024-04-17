import { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasAlmeria = [
  createData('07ADCOM01',0,'RG07','172.30.70.242','I07E'),
  createData('07ALESP01',0,'RG07','172.30.70.248','I07C'),
  createData('07ALPAR01',0,'RG07','172.30.70.249','I07D'),
  createData('07ALJEF01',0,'RG07','172.30.70.246','I07J')
]

export const TablaAlmeria = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasAlmeria.find(printer => {
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
          impresorasAlmeria.map((impresora) => (
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

TablaAlmeria.displayName = 'TablaAlmeria';