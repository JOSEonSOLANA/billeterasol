import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { OrcaNftList } from '../services/orca-shyft.services';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';



@Component({
    selector: 'billeterasol-orca-section',
    imports: [MatTableModule, MatCard, MatButton],
    standalone: true,
    styleUrls: ['../../styles.scss'],
    template: `
    <mat-card class=" px-4 py-8 blur-background text-white">
      <h2 class="text-center justify text-3xl mb-4">Collectibles</h2>

      @if (!OrcaNfts()) {
        <p class="text-center">conect your wallet.</p>
      } @else if (OrcaNfts()?.length === 0) {
        <p class="text-center">no NFTs.</p>
      } @else  {
        <table mat-table [dataSource]="OrcaNfts() ?? []" class=" bg-blue-800 text-white">
          <ng-container matColumnDef="key">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element"><img [src]="element.key" [width]="200"/></td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element" class="text-white">{{ element.name }}</td>
          </ng-container>
          
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element" class="text-white">{{ element.description }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
        
      }
      
    </mat-card>
  `,
    
})

export class OrcaSectionComponent {
    private readonly _OrcaNftList = inject(OrcaNftList);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
    
    
    readonly OrcaNfts = computedAsync(
        () => this._OrcaNftList.getOrcaNfts(this._publicKey()?.toBase58()),
    
    );

    displayedColumns: string[] = ['key', 'name', 'description' ];

    }
    
      