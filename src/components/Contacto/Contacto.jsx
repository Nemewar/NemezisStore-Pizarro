import { useState } from "react"
import "./contacto.css"
import Swal from 'sweetalert2'

export const Contacto = () => {

    const [form, setForm] = useState({
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
        setForm({
            nombres: "",
            telefono: "",
            correo: "",
            mensaje: ""
        })
    }

    const onHandleChange = (ev) => {
        setForm({
            ...form,
            [ev.target.name]: ev.target.value
        })
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
                                value={form.nombres}
                                onChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="campo">
                            <label>Telefono</label>
                            <input
                                type="number"
                                min={1}
                                name="telefono"
                                value={form.telefono}
                                onChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="campo correo">
                            <label>Correo</label>
                            <input
                                type="email"
                                name="correo"
                                value={form.correo}
                                onChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="campo textarea">
                            <label>Mensaje</label>
                            <textarea
                                name="mensaje"
                                value={form.mensaje}
                                onChange={onHandleChange}
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
