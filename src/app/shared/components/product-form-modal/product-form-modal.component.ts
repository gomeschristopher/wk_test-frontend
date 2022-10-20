import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";

@Component({
    templateUrl: './Product-form-modal.component.html'
})
export class ProductFormModalComponent {
    @Input() product: Product;
    isLoading = false;
    errMsg: string;

    constructor(private activeModal: NgbActiveModal,
        private productService: ProductService) { }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.product.id) {
            this.productService.updateProduct(this.product, this.product.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.productService.saveProduct(this.product)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onDelete() {
        if (confirm('Deseja realmente excluir esse produto?')) {
            this.isLoading = true;
            this.productService.deleteProduct(this.product.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }
}