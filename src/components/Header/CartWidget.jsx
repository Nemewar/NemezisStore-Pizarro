import { AiOutlineShoppingCart } from "react-icons/ai"

export const CartWidget = () => {

  const styleCart = {
    display: "flex",
    alignItems: "flex-end",
    gap: "0.5rem"
  }

  return (
    <>
      <div style={styleCart}>
        <AiOutlineShoppingCart size={35} /><span>0</span>
      </div>
    </>
  )
}
