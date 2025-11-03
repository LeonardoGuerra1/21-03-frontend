import { useEffect, useMemo, useRef, useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import cartIcon from "../../assets/icons/cart.svg"
import addIcon from "../../assets/icons/add.svg"
import removeIcon from "../../assets/icons/remove.svg"
import deleteIcon from "../../assets/icons/delete.svg"
import { CartItem } from "../../models/CartItem";
import checkoutIcon from "../../assets/icons/checkout.svg"
import { useClickAway } from "../../hooks/useClickAway";
import { useOpen } from "../../hooks/useOpen";

function NavCartButton() {
  const [openCart, setOpenCart] = useState(false);
  const { render, show, clickable } = useOpen(openCart)
  
  const cart = useCartStore().list
  const resume = useMemo(() => cart.reduce((a, b) => a + (b.quantity * b.item.price), 0), [cart])

  useEffect(() => {
    if (cart.length === 0) setOpenCart(false)
  }, [cart]);

  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const clean = useClickAway(divRef, () => setOpenCart(false))
    return clean
  }, []);

  return (
    <div className="relative">
      <button
        className="px-2 h-11 rounded-full cursor-pointer flex justify-center items-center hover:bg-white/10 disabled:opacity-60"
        disabled={cart.length === 0 || !clickable}
        onClick={() => setOpenCart(prev => !prev)}
      >
        <img
          src={cartIcon}
          alt="Cart icon"
          className="w-9 h-9"
        />
      </button>

      {render && (
        <div className={`absolute top-full right-0 w-[350px] max-h-[400px] ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"} origin-top-right duration-200`} ref={divRef}>
          <div className="w-full h-full rounded z-50 ring-3 ring-white/10 bg-dark">
            <ul className="w-full px-2 max-h-[360px] divide-y-2 divide-white/30 overflow-y-scroll">
              {cart.map(item => <LiCartItem key={item.id} item={item} /> )}
            </ul>
            <CartResume resume={resume} />
          </div>
        </div>
      )}
    </div>
  );
}

export default NavCartButton;

//==============================================================================================================================================================
//==============================================================================================================================================================

interface CartResumeProps {
  resume: number
}

const CartResume = ({ resume }: CartResumeProps) => {
  return (
    <div className="w-full pl-6 border-t-4 border-white/20 flex justify-between items-center">
      <span className="text-lg">
        Subtotal: ${resume.toFixed(2)}
      </span>
      <button className="cursor-pointer px-6 py-2 flex justify-center items-center gap-x-3 hover:gap-x-1 duration-100 hover:bg-green-200/7">
        <img
          src={checkoutIcon}
          alt=""
        />
        <span className="text-lg">
          Buy
        </span>
      </button>
    </div>
  )
}

//==============================================================================================================================================================
//==============================================================================================================================================================

interface CartItemProps {
  item: CartItem
}

const LiCartItem = ({ item }: CartItemProps) => {
  const updateQuantityOn = useCartStore().updateQuantityOn
  const removeItem = useCartStore().removeItem
  const [fade, setFade] = useState(false);
  const handleRemove = () => {
    setFade(true)
    setTimeout(() => {
      removeItem(item.id)
    }, 500)
  }

  return (
    <li className={`h-27 flex justify-between items-center relative overflow-hidden ${fade ? "max-h-0 opacity-0" : "max-h-100"} duration-300`}>
      <img
        src={item.item.image}
        alt={item.item.name}
        className="w-22 h-22 object-cover rounded"
      />

      <span className="w-39 text-sm h-10 overflow-ellipsis overflow-hidden">
        {item.item.name}
      </span>

      <CartItemAmounts
        current={item.quantity}
        max={item.item.stock}
        onUpdateAmount={(quantity) => updateQuantityOn(item.id, quantity)}
      />
      <CartItemDelete onDelete={handleRemove} />
    </li>
  )
}

//==============================================================================================================================================================
//==============================================================================================================================================================

interface CartItemAmountsProps {
  current: number
  max: number
  onUpdateAmount: (quantity: number) => void
}

const CartItemAmounts = ({ current, max, onUpdateAmount }: CartItemAmountsProps) => {
  return (
    <div className="w-15 flex justify-center items-center">
      <button
        className="p-0.2 hover:bg-white/20 rounded-full cursor-pointer"
        onClick={() => onUpdateAmount(current + 1)}
        disabled={current === max}
      >
        <img
          src={addIcon}
          alt="Add"
          className=""
        />
      </button>
      <input
        type="number"
        value={current}
        className="w-6 outline-0 text-center cursor-auto"
        readOnly
      />
      <button
        className="p-0.2 hover:bg-white/20 rounded-full cursor-pointer"
        onClick={() => onUpdateAmount(current - 1)}
        disabled={current === 1}
      >
        <img
          src={removeIcon}
          alt="Remove"
          className=""
        />
      </button>
    </div>
  )
}

//==============================================================================================================================================================
//==============================================================================================================================================================

interface CartItemDeleteProps {
  onDelete: () => void
}

const CartItemDelete = ({ onDelete }: CartItemDeleteProps) => {
  return (
    <button
      className="absolute top-2 right-0 hover:bg-red-500/30 rounded-full p-0.3 cursor-pointer"
      onClick={() => onDelete()}
    >
      <img
        src={deleteIcon}
        alt="Delete"
        className="w-4"
      />
    </button>
  )
}