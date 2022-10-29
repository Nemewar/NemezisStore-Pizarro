import "./contacto.css"
import Swal from 'sweetalert2'
import { useForm } from "../../hooks/useForm"

export const Contacto = () => {


    const { nombres, telefono, correo, mensaje, onFormState, onReset } = useForm({
        nombres: "",
        telefono: "",
        correo: "",
        mensaje: ""
    })

    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        Swal.fire(
            'Mensaje enviado!',
            '',
            'success'
        )
        onReset()
    }

    return (
        <div className="container-form">
            <form
                onSubmit={onHandleSubmit}
                className="form-contact"
            >
                <fieldset>
                    <div className="legend">
                        <legend>
                            Contáctanos llenando todos los campos
                        </legend>
                    </div>
                    <div className="contenedor-campos">
                        <div className="campo">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="nombres"
                                value={nombres}
                                onChange={onFormState}
                                required
                            />
                        </div>
                        <div className="campo">
                            <label>Telefono</label>
                            <input
                                type="number"
                                min={1}
                                name="telefono"
                                value={telefono}
                                onChange={onFormState}
                                required
                            />
                        </div>
                        <div className="campo correo">
                            <label>Correo</label>
                            <input
                                type="email"
                                name="correo"
                                value={correo}
                                onChange={onFormState}
                                required
                            />
                        </div>
                        <div className="campo textarea">
                            <label>Mensaje</label>
                            <textarea
                                name="mensaje"
                                value={mensaje}
                                onChange={onFormState}
                                required
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className="contenedor-boton">
                        <button
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
