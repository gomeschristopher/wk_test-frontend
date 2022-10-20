import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OrderFormModalComponent } from "../shared/components/order-form-modal/order.form-modal.component";
import { Order } from "../shared/models/Order";
import { OrderService } from "../shared/services/order.service";

@Component({
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
    isLoading = false;
    orders: Order[];
    errMsg: string;

    constructor(private modalService: NgbModal,
        private orderService: OrderService) {}

    getOrders() {
        this.isLoading = true;
        this.orderService.getOrders()
        .subscribe(orders => {
            this.orders = orders;
            this.isLoading = false;
        }, errMsg => {
            this.errMsg = errMsg;
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
        this.getOrders();
    }
    
    onOpenOrderFormModal(order: Order = new Order()) {
        const modalRef = this.modalService.open(OrderFormModalComponent);
        modalRef.componentInstance.order = { ...order };
        modalRef.result.then(() => {
            this.getOrders();
        }, () => { });
    }
}