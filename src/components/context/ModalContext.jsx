import { createContext, useState } from "react";
import { Modal } from "../ModalLogin/Modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <ModalContext.Provider value = {{
            modalVisible,
            setModalVisible
        }}>
            {children}
        </ModalContext.Provider>
    )

}