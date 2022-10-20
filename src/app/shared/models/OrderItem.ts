import { Product } from "./Product";

export class OrderItem {
    id: number;
    product: Product;
    quantity: number = 1;
    value: number;
}