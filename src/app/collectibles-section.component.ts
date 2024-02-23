import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { NftList } from './shyft-api.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';



@Component({
    selector: 'billeterasol-collectibles-section',
    imports: [MatTableModule, MatCard, MatButton],
    standalone: true,
    template: `
    <mat-card class=" px-4 py-8 bg-black">
      <h2 class="text-center justify text-3xl mb-4">Collectibles</h2>

      @if (!allNfts()) {
        <p class="text-center">conect your wallet.</p>
      } @else if (allNfts()?.length === 0) {
        <p class="text-center">no NFTs.</p>
      } @else  {
        <table mat-table [dataSource]="allNfts() ?? []">
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element"><img [src]="element.image_uri"/></td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
        
      }
      
    </mat-card>
  `,
    
})

export class CollectiblesSectionComponent {
    private readonly _nftList = inject(NftList);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    
    
    readonly allNfts = computedAsync(
        () => this._nftList.getAllNfts(this._publicKey()?.toBase58()),
    
    );

    displayedColumns: string[] = ['symbol', 'imagen_uri' ];

}