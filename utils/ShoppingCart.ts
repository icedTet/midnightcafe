import { GenericProduct, PreferenceModifiers } from "./Items";


export type ShoppingCartItem = {
  product: GenericProduct;
  preferences: PreferenceModifiers;
  quantity: number;
};
export class ShoppingCart {
  private static instance: ShoppingCart;
  private items: ShoppingCartItem[];
  private constructor() {
    this.items = [];
  }
  public static getInstance(): ShoppingCart {
    if (!ShoppingCart.instance) {
      ShoppingCart.instance = new ShoppingCart();
    }
    return ShoppingCart.instance;
  }
  public addItem(item: GenericProduct, preferences: PreferenceModifiers): void {
    const existingItem = this.items.find(
      (i) =>
        i.product.id === item.id &&
        JSON.stringify(i.preferences) === JSON.stringify(preferences)
    );
    if (!existingItem) {
      this.items.push({
        product: item,
        preferences,
        quantity: 1,
      });
    } else {
      existingItem.quantity++;
    }
  }
  public removeItem(item: ShoppingCartItem): void {
    const index = this.items.findIndex(
      (i) =>
        i.product.id === item.product.id &&
        JSON.stringify(i.preferences) === JSON.stringify(item.preferences)
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  public getItems() {
    return this.items;
  }
}
