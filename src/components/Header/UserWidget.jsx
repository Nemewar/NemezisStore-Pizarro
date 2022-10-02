import { HiUser } from "react-icons/hi"

export const UserWidget = () => {
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <HiUser size={35} />
                <span style={{
                    fontSize: "1.8rem"
                }}>Ingresar</span>
            </div>
        </>
    )
}
