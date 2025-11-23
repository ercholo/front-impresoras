import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';
import { BotonTrabajosDetallados } from '../ui/components/BotonTrabajosDetallados';
import { BotonPurgarCola } from '../ui/components/BotonPurgarCola';
import { BotonPaginaPrueba } from '../ui/components/BotonPaginaPrueba';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Creamos las filas
const impresorasMadrid = [
  createData('04ALDEV01', 0, 'RG04', '172.30.132.212','I04B'),
  createData('04ALCSK01', 0, 'RG04', '172.30.132.217','I04S'),
  createData('04ATTOM01', 0, 'RG04', '172.30.132.210','I04A'),
  createData('04ALEXP01', 0, 'RG04', '172.30.132.219','I04P'),
  createData('04ALEXP02', 0, 'RG04', '172.30.132.213'),
  createData('04ALJEF01', 0, 'RG04', '172.30.132.216','I04J'),
  createData('04ALJEF02', 0, 'RG04', '172.30.132.211','I04T'),
  createData('04COGER01', 0, 'RG04', '172.30.133.68'),
  createData('04COGER02', 0, 'RG04', '172.30.132.215','I04C'),
  createData('04COVEN01', 0, 'RG04', '172.30.132.214','I04G'),
  createData('04ADCOM01', 0, 'RG04', '172.30.132.221','I04H'),
  createData('04ALREC01', 0, 'RG04', '172.30.132.220','I04Z'),
]

export const TablaMadrid = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresorasMadrid.find(printer => {
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
        {impresorasMadrid.map((impresora) => (
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

TablaMadrid.displayName = 'TablaMadrid';