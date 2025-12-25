import React, { useCallback, useEffect, useState, memo } from 'react';
import {
    BotonActualizar,
    BotonEstado,
    BotonPausa,
    BotonReanuda,
    BotonDesviar,
    BotonTrabajosDetallados,
    BotonPurgarCola,
    BotonPaginaPrueba
} from '../ui/components';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasGranada = [
  createData('18ALAV101', 0, 'RG18', '172.30.120.246','1801'),
  createData('18ALAV102', 0, 'RG18', '172.30.120.242','1802'),
  createData('18ALAV201', 0, 'RG18', '172.30.120.246','1821'),
  createData('18ALAV202', 0, 'RG18', '172.30.120.242','1822'),
  createData('18ALDEV01', 0, 'RG18', '172.30.120.247','18D1'),
  createData('18ALEXP01', 0, 'RG18', '172.30.120.245','18E1'),
  createData('18ALJEF01', 0, 'RG18', '172.30.120.248','1803'),
  createData('18ATTOM01', 0, 'RG18', '172.30.120.249','I09J'),
  createData('18ATTOM02', 0, 'RG18', '172.30.120.244','I09G'),
  createData('18ALETQ01', 0, 'RG18', '172.30.120.80','E181')
]
 
export const TablaGranada = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasGranada.find(printer => {
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
          <th scope="col">Ver Trabajos</th>
          <th scope="col">Purgar</th>
          <th scope="col">Pág. Prueba</th>
        </tr>
      </thead>
      <tbody>
        {impresorasGranada.map((impresora) => (
          <tr key={impresora?.nameImpresora}>
            <td>{impresora?.nameImpresora}</td>
            <td>{impresora?.numTrabajos}</td>
            <td>{<BotonActualizar printer={impresora?.nameImpresora} recibirDatos={recibirDatosActualizados} />}</td>
            <td>{<BotonPausa printer={impresora?.nameImpresora} />}</td>
            <td>{<BotonReanuda printer={impresora?.nameImpresora} />}</td>
            <td>{<BotonEstado printer={impresora?.nameImpresora} />}</td>
            <td>{<BotonDesviar printer={impresora?.nameImpresora} />}</td>
            <td>{<BotonTrabajosDetallados printer={impresora?.nameImpresora} />}</td>
            <td>{<BotonPurgarCola printer={impresora?.nameImpresora} onPurgar={() => recibirDatosActualizados()} />}</td>
            <td>{<BotonPaginaPrueba printer={impresora?.nameImpresora} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

TablaGranada.displayName = 'TablaGranada';