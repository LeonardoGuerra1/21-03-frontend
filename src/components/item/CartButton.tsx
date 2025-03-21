import { useEffect, useState } from "react";
import cartBorderIcon from "../../assets/icons/cart.svg"
import cartIcon from "../../assets/icons/cart_filled.svg"
import { useCartStore } from "../../stores/useCartStore";
import { Album } from "../../models/Album";

interface CartButtonProps {
  item: Album
}

function CartButton({ item }: CartButtonProps) {
  const [added, setAdded] = useState(false);
  const cart = useCartStore().list
  const addItem = useCartStore().addItem
  const removeItem = useCartStore().removeItem

  const handleClick = () => {
    if (added) {
      const result = removeItem(item.s_id)
      if (result) setAdded(false)
    } else {
      const result = addItem(item)
      if (result) setAdded(true)
    }
  }

  useEffect(() => {
    setAdded(cart.some(i => i.id === item.id))
  }, [cart]);

  return (
    <button className="cursor-pointer" onClick={handleClick} disabled={false}>
      <img src={added ? cartIcon : cartBorderIcon} alt="Favorite button" />
    </button>
  );
}

export default CartButton;