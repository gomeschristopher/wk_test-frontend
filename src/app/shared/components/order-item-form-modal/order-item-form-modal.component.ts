import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { OrderItem } from "../../models/OrderItem";

import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: './order-item-form-modal.component.html'
})
export class OrderItemFormModalComponent {
    isLoading = false;
    errMsg: string;
    products: Product[];
    orderItem: OrderItem;

    constructor(private activeModal: NgbActiveModal,
        private productService: ProductService) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.isLoading = true;
        this.productService.getProducts()
            .subscribe(products => {
                this.products = products;
                this.isLoading = false;
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }

    onCancel() {
        this.activeModal.dismiss();
    }

    productFormatter = (product: Product) => product.name;

    searchproducts: OperatorFunction<string, readonly { id; name }[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter((term) => term.length >= 2),
            map((term) => this.products.filter((product) => new RegExp(term, 'mi').test(product.name)).slice(0, 10)),
        );

    onSave() {
        this.orderItem.value = this.orderItem.product.value * this.orderItem.quantity;
        this.activeModal.close(this.orderItem);
    }
}