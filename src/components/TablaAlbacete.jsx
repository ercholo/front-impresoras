import { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto,) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasAlbacete = [
  createData('08ALAV101',0,'RG08','172.30.41.240','0801'),
  createData('08ALAV102',0,'RG08','172.30.41.241','0802'),
  createData('08ALAV201',0,'RG08','172.30.41.242','0821'),
  createData('08ALAV202',0,'RG08','172.30.41.243','0822'),
  createData('08ALDEV01',0,'RG08','172.30.41.244','08D1'),
  createData('08ALEXP01',0,'RG08','172.30.41.245','08E1'),
  createData('08ALJEF01',0,'RG08','172.30.41.246','0803')
]

export const TablaAlbacete = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasAlbacete.find(printer => {
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
        {impresorasAlbacete.map((impresora) => (
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


TablaAlbacete.displayName = 'TablaAlbacete';