import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}
const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    descreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    descreaseProductQuantity(cartProduct.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGE E INFO */}
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-sm">{cartProduct.quantity}</span>
            <Button
              className="h-7 w-7"
              size={"icon"}
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTÃO DELETAR */}
      <Button
        size={"icon"}
        variant={"ghost"}
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
