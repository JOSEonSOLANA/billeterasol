import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { TokensList } from '../shyft-api.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from '../transfer-modal.component';
import { MatButton } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';
import { BuyModalComponent } from '../buy-modal.component';
import { ReceiveModalComponent } from '../receive-modal.component';
@Component({
    selector: 'billeterasol-tokenslist-section',
    imports: [MatTableModule, MatCard, MatButton, DecimalPipe],
    standalone: true,
    styleUrls: ['../../styles.scss'],
    template: `
    <mat-card class=" px-4 py-8 blur-background">
      @if (!allTokens()) {
        <p class="text-center text-white">conect your wallet.</p>
      } @else if (allTokens()?.length === 0) {
        <p class="text-center text-white">no Activity.</p>
      } @else  {
        <div class="my-button-row center">
        <button mat-raised-button color="primary" (click)="onTransfer()">SEND   </button>
        <button mat-raised-button color="primary" (click)="onBuy()">BUY    </button>
        <button mat-raised-button color="primary" (click)="onReceive()">RECEIVE</button>
        </div>
        <div style="border-top: 20px solid transparent;"></div> 
        <table mat-table [dataSource]="allTokens() ?? []" class=" bg-blue-800">
          
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element"><img [src]="element.info.image" [width]="50"/></td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">{{ element.info.name }}</td>
          </ng-container>

          <ng-container matColumnDef="balance">
            <th mat-header-cell *matHeaderCellDef ></th>
            <td mat-cell *matCellDef="let element">{{ element.balance | number }}</td>
          </ng-container>

          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">{{ element.info.symbol }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>   
    }  
      
    </mat-card>
  `,
    
})

export class TokensListSectionComponent {
    private readonly _tokensList = inject(TokensList);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    private readonly _matDialog = inject(MatDialog);

    readonly allTokens = computedAsync(
        () => this._tokensList.getAllTokens(this._publicKey()?.toBase58()),
    
    );

    displayedColumns: string[] = ['image', 'name', 'balance', 'symbol' ];

    onTransfer() {
      this._matDialog.open(TransferModalComponent);
    }

    onBuy(){
      this._matDialog.open(BuyModalComponent);
    }

    onReceive(){
      this._matDialog.open(ReceiveModalComponent);
    }
    
}