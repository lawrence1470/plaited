import { createContext, ReactNode, useState } from "react";
import { formatCurrency } from "react-native-format-currency";

export const OrderContext = createContext<any>(null);

export default function OrderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recipeId, setRecipeId] = useState<any>(null);
  const [ingredientsInCart, setIngredientsInCart] = useState([]);

  function removeFromCart(id: any) {
    const removedList = ingredientsInCart.filter(
      (ingredient: any) => ingredient.id !== id
    );
    setIngredientsInCart(removedList);
  }

  function clearCart() {
    setIngredientsInCart([]);
  }

  function addToCart(ingredient: any) {
    // @ts-ignore
    setIngredientsInCart([...ingredientsInCart, ingredient]);
  }

  function isIngredientInCart(id: any) {
    return ingredientsInCart.some((ingredient: any) => ingredient.id === id);
  }

  const totalEstimatedPriceInCents = ingredientsInCart.reduce(
    (acc: number, ingredient: any) => {
      // all units are in cents
      if (ingredient?.estimatedCost?.value) {
        return acc + ingredient.estimatedCost.value;
      } else {
        return acc;
      }
    },
    0
  );

  const totalEstimatedPriceInDollars = formatCurrency({
    amount: Number((totalEstimatedPriceInCents / 100).toFixed(2)),
    code: "USD",
  })[0];

  return (
    <OrderContext.Provider
      value={{
        setRecipeId: setRecipeId,
        recipeId: recipeId,
        ingredientsInCart,
        setIngredientsInCart,
        removeFromCart,
        isIngredientInCart,
        addToCart,
        clearCart,
        totalEstimatedPriceInDollars,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
