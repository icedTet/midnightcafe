export class ShoppingCart {
  private static instance: ShoppingCart;
  private items: any[] = [];
  private constructor() {}
  public static getInstance(): ShoppingCart {
    if (!ShoppingCart.instance) {
      ShoppingCart.instance = new ShoppingCart();
    }
    return ShoppingCart.instance;
  }
  public addItem(item: any): void {
    this.items.push(item);
  }
  public getItems(): any[] {
    return this.items;
  }
}
