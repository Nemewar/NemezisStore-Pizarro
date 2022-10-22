import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import "./modal.css"

export const Modal = () => {

    const { modalVisible,
        setModalVisible } = useContext(ModalContext);

    return (
        <>
            {(modalVisible) &&
                <div className="overlay">

                    <div className="contenedor-modal">

                        <div className="encabezado-modal">
                            <h3>Titulo</h3>
                        </div>

                        <button
                            className="boton-cerrar"
                            onClick={() => setModalVisible(false)}
                        >
                            X
                        </button>

                    </div>

                </div>
            }


        </>
    )
}
