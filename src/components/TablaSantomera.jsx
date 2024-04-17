import React, { useCallback, useEffect, useState, memo } from 'react';
import { BotonActualizar, BotonEstado, BotonPausa, BotonReanuda, BotonDesviar } from '.';

//Funcion para crear las futuras filas (rows)
function createData(nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto) {
  return { nameImpresora, numTrabajos, numAlmacen, ip, nombreCorto };
}

//Llamada a la funcion que genera las filas pasándole datos de relleno iniciales
const impresoraSantomera = [
  createData('01ALAV101', 0, 'RG01', '172.30.2.51', 'AV11'),
  createData('01ALAV102', 0, 'RG01', '172.30.2.50', 'I02Z'),
  createData('01ALAV201', 0, 'RG01', '172.30.2.52', 'AV21'),
  createData('01ALAV202', 0, 'RG01', '172.30.2.56', 'I02C'),
  createData('01ALDEV01', 0, 'RG01', '172.30.2.91', 'I02B'),
  createData('01ALENT01', 0, 'RG01', '172.30.2.40', '01T1'),
  createData('01ALJEF01', 0, 'RG01', '172.30.2.58', '0103'),
  createData('01ALPSI01', 0, 'RG01', '172.30.2.46', 'I022'),
  createData('01ALPYE01', 0, 'RG01', '172.30.2.5', '01P1'),
  createData('01ALPYE02', 0, 'RG01', '172.30.2.34', 'I027'),
  createData('01ALSAA01', 0, 'RG01', '172.30.2.23', 'IO2U'),
  createData('01ALSAF01', 0, 'RG01', '172.30.2.33', 'I02D'),
  createData('01ALSAL01', 0, 'RG01', '172.30.2.12', 'I03R'),
  createData('01ATTOM01', 0, 'RG01', '172.30.2.35', 'I02F'),
  createData('01ATTOM02', 0, 'RG01', '172.30.2.120', 'I02J'),
  createData('01ALPLA01', 0, 'RG01', '172.30.2.66', 'I02P')
]

export const TablaSantomera = memo(() => {

  const [, setValor] = useState({});

  const recibirDatosActualizados = useCallback((data) => {

    impresoraSantomera.find(printer => {
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
        {impresoraSantomera.map((impresora) => (
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

TablaSantomera.displayName = 'TablaSantomera';