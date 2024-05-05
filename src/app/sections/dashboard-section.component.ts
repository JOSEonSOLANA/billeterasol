import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { SolBalance } from '../services/shyft-api.services';
import { toSignal } from '@angular/core/rxjs-interop';
//import { Chart } from 'chart.js';


@Component({
    selector: 'billeterasol-dashboard-section',
    imports: [MatCard ],
    template: `
    <mat-card class="blur-background text-white">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Wallet Balance</h5>  
                        <p class="card-text">&nbsp;{{  account1()?.balance }} SOL</p>      
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <canvas id="walletChart"></canvas>  
            </div>
        </div>
    </mat-card>
    `,
    standalone: true,
})

export class DashboardSectionComponent {
    
    private readonly _solBalance = inject(SolBalance);
    private readonly _walletStore1 = inject(WalletStore);
    private readonly _publicKey1 = toSignal(this._walletStore1.publicKey$);
    
    readonly account1 = computedAsync(
      () => this._solBalance.getAccount2(this._publicKey1()?.toBase58()),
      { requireSync: false, initialValue: null},
    );

    //const balance = this.account1()?.balance;
}