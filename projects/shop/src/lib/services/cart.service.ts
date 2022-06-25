import { Injectable } from "@angular/core";
import { CartModel } from "../models/cart.model";
import { cache } from "bfast";
import { UserService } from "smartstock-core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  async getCarts(): Promise<CartModel[]> {
    const user = await this.userService.currentUser();
    if (!user) {
      return [];
    }
    return cache({ database: user.id, collection: "cart" }).getAll();
  }

  async addToCart(cart: CartModel): Promise<any> {
    const user = await this.userService.currentUser();
    if (!user) {
      this.router
        .navigate(["/account/login"], {
          queryParams: {
            url: this.router.url
          }
        })
        .catch(console.log);
      return;
    }
    const cartCache = cache({ database: user.id, collection: "cart" });
    const oldCart = await cartCache.get(cart.id);
    if (oldCart) {
      return this.incrementCart(cart.id, cart.quantity);
    }
    return cartCache.set(cart.id, cart);
  }

  async removeToCart(id: string): Promise<any> {
    const user = await this.userService.currentUser();
    return cache({ database: user.id, collection: "cart" }).remove(id);
  }

  async incrementCart(id: string, quantity: number): Promise<any> {
    const user = await this.userService.currentUser();
    const cacheCart = cache({ database: user.id, collection: "cart" });
    const oldCart: CartModel = await cacheCart.get(id);
    oldCart.quantity += quantity;
    return cacheCart.set(id, oldCart);
  }

  async clearCart(): Promise<any> {
    const user = await this.userService.currentUser();
    return cache({ database: user.id, collection: "cart" }).clearAll();
  }
}
