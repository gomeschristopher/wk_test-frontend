import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductFormModalComponent } from "../shared/components/product-form-modal/product-form-modal.component";
import { Product } from "../shared/models/Product";
import { ProductService } from "../shared/services/product.service";

@Component({
    templateUrl: './product.component.html'
})
export class ProductComponent {
    isLoading = false;
    products: Product[];
    errMsg: string;

    constructor(private modalService: NgbModal,
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

    onOpenProductFormModal(product: Product = new Product()) {
        const modalRef = this.modalService.open(ProductFormModalComponent);
        modalRef.componentInstance.product = { ...product };
        modalRef.result.then(() => {
            this.getProducts();
        }, () => { });
    }
}