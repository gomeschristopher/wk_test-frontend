import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

import { Client } from "../../models/Client";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import { ClientService } from "../../services/client.service";
import { OrderService } from "../../services/order.service";
import { OrderItemFormModalComponent } from "../order-item-form-modal/order-item-form-modal.component";

@Component({
    templateUrl: './order.form-modal.component.html'
})
export class OrderFormModalComponent implements OnInit {
    @Input() order: Order;
    isLoading = false;
    errMsg: string;
    clients: Client[];

    constructor(private activeModal: NgbActiveModal,
        private orderService: OrderService,
        private clientService: ClientService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        this.getClients();
    }

    getClients() {
        this.isLoading = true;
        this.clientService.getClients()
            .subscribe(clients => {
                this.clients = clients;
                this.isLoading = false;
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }
    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.order.id) {
            this.orderService.updateOrder(this.order, this.order.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.orderService.saveOrder(this.order)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onDelete() {
        if (confirm('Deseja realmente excluir esse pedido?')) {
            this.isLoading = true;
            this.orderService.deleteOrder(this.order.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onRemoveOrderItem(orderItem: OrderItem) {
        this.order.items.splice(this.order.items.indexOf(orderItem), 1);
        this.updateOrderValue();
    }

    updateOrderValue() {
        this.order.value = this.order.items.map(t => t.value).reduce((acc, value) => acc + value, 0);
    }

    onOpenNewOrderItemFormModal() {
        const modalRef = this.modalService.open(OrderItemFormModalComponent, { size: 'sm' });
        modalRef.componentInstance.orderItem = new OrderItem;
        modalRef.result.then(orderItem => {
            this.order.items.push(orderItem);
            this.updateOrderValue();
        }, () => { });
    }

    clientFormatter = (client: Client) => client.name;

    searchClients: OperatorFunction<string, readonly { id; name }[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter((term) => term.length >= 2),
            map((term) => this.clients.filter((client) => new RegExp(term, 'mi').test(client.name)).slice(0, 10)),
        );
}