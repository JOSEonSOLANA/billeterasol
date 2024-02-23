import { Component, computed, inject } from "@angular/core";
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { WalletStore, injectTransactionSender } from "@heavy-duty/wallet-adapter";
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { MatDialogRef } from "@angular/material/dialog";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinner} from "@angular/material/progress-spinner"
import { TokensList } from "./shyft-api.services";
import { computedAsync } from "ngxtension/computed-async";
import { toSignal } from "@angular/core/rxjs-interop";

@Component ({
    selector: 'billeterasol-transfer-modal',
    template: `
        <div class="px-8 pt-16 pb-8">
            <h2 class="text-3xl text-center mb-8">Transfer tokens</h2>

            <billeterasol-transfer-form
                
                (tokens2)="allTokens2() ?? []"
                (sendTransfer)="onSendTransfer($event)"
                (cancelTransfer)="onCancelTransfer()"
            ></billeterasol-transfer-form>

            @if (isRunning()) {
                <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity 50 flex">

                <mat-progress-spinner
                    color="primary"
                    mode="indeterminate"
                    diameter="64"
                ></mat-progress-spinner>
                <p class="capitalize text-xl">{{ transactionStatus() }}...</p>
                </div>
            }
        </div>`,
    standalone: true,
    imports: [TransferFormComponent, MatProgressSpinner, TransferModalComponent],
})
export class TransferModalComponent {
    //private readonly _matSnackBar = inject(MatSnackBar);
    private readonly _matDialogRef = inject(MatDialogRef);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _transactionSender = injectTransactionSender();
    private readonly _tokensList = inject(TokensList);

    readonly transactionStatus = computed(() => this._transactionSender().status);
    readonly isRunning = computed(
        () =>
            this.transactionStatus() === 'sending' ||
            this.transactionStatus() === 'confirming' ||
            this.transactionStatus() === 'finalizing',
    );

    readonly allTokens2 = computedAsync(() => this._tokensList.getAllTokens(this._publicKey()?.toBase58()),);
    

    onSendTransfer(payload: TransferFormPayload) {
        this._matDialogRef.disableClose = true;

        
        this._transactionSender
            .send(({  publicKey }) =>
                createTransferInstructions ({
                    senderAddress: publicKey.toBase58(),
                    receiverAddress: payload.receiverAddress,
                    mintAddress: payload.mintAddress,
                    amount: payload.amount,
                    fundReceiver: true,
                    memo: payload.memo,
            }) )
            .subscribe({
                next: (signature) => console.log(`Firma: ${signature}`),
                error: error => console.error(error),
                complete: () => console.log('Transaction complete'),
            })
    }
    onCancelTransfer() {
        this.onCancelTransfer;
    }
}