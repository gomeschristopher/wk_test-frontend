import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";

@Component({
    templateUrl: './client-form-modal.component.html'
})
export class ClientFormModalComponent {
    @Input() client: Client;
    isLoading = false;
    errMsg: string;

    constructor(private activeModal: NgbActiveModal,
        private clientService: ClientService) { }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.client.id) {
            this.clientService.updateClient(this.client, this.client.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.clientService.saveClient(this.client)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onDelete() {
        if (confirm('Deseja realmente excluir esse cliente?')) {
            this.isLoading = true;
            this.clientService.deleteClient(this.client.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }
}