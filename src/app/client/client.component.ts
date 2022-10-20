import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientFormModalComponent } from "../shared/components/client-form-modal/client-form-modal.component";
import { Client } from "../shared/models/Client";
import { ClientService } from "../shared/services/client.service";

@Component({
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
    isLoading = false;
    clients: Client[];
    errMsg: string;

    constructor(private modalService: NgbModal,
        private clientService: ClientService) {}

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

    onOpenClientFormModal(client: Client = new Client) {
        const modalRef = this.modalService.open(ClientFormModalComponent);
        modalRef.componentInstance.client = { ...client };
        modalRef.result.then(() => {
            this.getClients();
        }, () => {});
    }
}