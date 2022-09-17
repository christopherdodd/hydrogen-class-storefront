import { useCart } from '@shopify/hydrogen';

export default function CartBubble() {

  const { totalQuantity } = useCart();

  if(totalQuantity < 1) {
    return null;
  }

  return (
    <span>({ totalQuantity })</span>
  )
}