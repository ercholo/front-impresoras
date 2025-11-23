import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';
import { BotonTrabajosDetallados } from '../ui/components/BotonTrabajosDetallados';
import { BotonPurgarCola } from '../ui/components/BotonPurgarCola';
import { BotonPaginaPrueba } from '../ui/components/BotonPaginaPrueba';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresorasRibarroja = [
  createData('11ALDEV01', 0, 'RG11', '172.30.102.233','1102'),
  createData('11ALENT01', 0, 'RG11', '172.30.102.232','1101'),
  createData('11ALENT02', 0, 'RG11', '172.30.102.197','11A2'),
  createData('11ALEST01', 0, 'RG11', '172.30.102.239','1105'),
  createData('11ALJEF01', 0, 'RG11', '172.30.102.234','1108'),
  // createData('11ALEST02', 0, 'RG11', '172.30.102.236'),
  createData('11ALFRI01', 0, 'RG11', '172.30.102.238','1104'),
  createData('11ALPKG01', 0, 'RG11', '172.30.102.235','1103'),
  createData('11ALSAF01', 0, 'RG11', '172.30.102.240','1106'),
  createData('11ALSAF02', 0, 'RG11', '172.30.102.241','1107')
]

export const TablaRibarroja = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasRibarroja.find(printer => {
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
        {impresorasRibarroja.map((impresora) => (
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

TablaRibarroja.displayName = 'TablaValencia';