import { Client } from "./Client";
import { OrderItem } from "./OrderItem";

export class Order {
    id: number;
    client: Client;
    items: OrderItem[] = [];
    date: string;
    value: number;
}