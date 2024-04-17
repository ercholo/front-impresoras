import { useKeycloak } from '@react-keycloak/web';
import { useNavigate, } from "react-router-dom";

export const PaginaPrincipal = () => {

    const keycloack = useKeycloak();
    const navigate = useNavigate();

    return (
        <>
            <h2 className='p-2' style={{ textAlign: "center" }}>GESTOR IMPRESORAS HEFAME</h2>
            <hr />

            <div className='container-sm p-1'>
                <div className="row justify-content-center">
                    <div className="row justify-content-center p-4">
                        <div className='col-auto p-2'>
                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/albacete")}
                            >
                                Albacete
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/alicante")}
                            >
                                Alicante
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/almeria")}
                            >
                                Almería
                            </button>

                            <button className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/barcelona")}
                            >
                                Barcelona
                            </button>
                        </div>
                    </div>

                    <div className="row justify-content-center p-4">
                        <div className='col-auto p-2'>
                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/cartagena")}
                                disabled={false}
                            >
                                Cartagena
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/gerona")}
                                disabled={false}
                            >
                                Gerona
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/granada")}
                                disabled={false}
                            >
                                Granada
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/madrid")}
                                disabled={false}
                            >
                                Madrid
                            </button>
                        </div>
                    </div>

                    <div className="row justify-content-center p-4">
                        <div className='col-auto p-2'>
                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/malaga")}
                                disabled={false}
                            >
                                Málaga
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/melilla")}
                                disabled={false}
                            >
                                Melilla
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/santomera")}
                                disabled={false}
                            >
                                Santomera
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/tortosa")}
                                disabled={false}
                            >
                                Tortosa
                            </button>

                            <button
                                className='btn btn-warning btn-lg my-2'
                                onClick={() => navigate("/ribarroja")}
                                disabled={false}
                            >
                                Ribarroja
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
