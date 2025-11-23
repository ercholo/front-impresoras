import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from './';
import { BotonTrabajosDetallados } from '../ui/components/BotonTrabajosDetallados';
import { BotonPurgarCola } from '../ui/components/BotonPurgarCola';
import { BotonPaginaPrueba } from '../ui/components/BotonPaginaPrueba';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasTortosa = [
  createData('16ALAV101', 0, 'RG16', '172.30.141.243','1601'),
  createData('16ALAV201', 0, 'RG16', '172.30.141.245','1621'),
  createData('16ALAV102', 0, 'RG16', '172.30.141.244','1602'),
  createData('16ALAV202', 0, 'RG16', '172.30.141.246','1622'),
  createData('16ALDEV01', 0, 'RG16', '172.30.141.247','16D1'),
  createData('16ALEXP01', 0, 'RG16', '172.30.141.248','16E1'),
  createData('16ALJEF01', 0, 'RG16', '172.30.141.249','1603')
]

export const TablaTortosa = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasTortosa.find(printer => {
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
        {impresorasTortosa.map((impresora) => (
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

TablaTortosa.displayName = 'TablaTortosa';