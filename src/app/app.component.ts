import { Component, OnInit, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';
import { ActivityWallet } from './services/shyft-api.services';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav'
import {CdkMenu, CdkMenuItem} from '@angular/cdk/menu';

@Component({
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor, MatMenuModule, MatButtonModule, MatSidenavModule, CdkMenu, CdkMenuItem ],
  selector: 'billeterasol-root',
  standalone: true,

  template: `    
    
    
    <main>
    <mat-drawer-container class="example-container">
    <mat-drawer mode="side" opened>
    <p>SOLEFI</p>
    <div class="example-menu" cdkMenu>
    <button class="example-menu-item" cdkMenuItem>Dashboard</button>
    <a [routerLink]="['']" button class="example-menu-item" cdkMenuItem>Tokens</a>
    <a [routerLink]="['collectibles']" button class="example-menu-item" cdkMenuItem>NFTs</a>
    <a [routerLink]="['activity']" button class="example-menu-item" cdkMenuItem>Activity</a>
    <a [routerLink]="['defi']" button class="example-menu-item" cdkMenuItem>Defi</a>
    <button class="example-menu-item" cdkMenuItem>Airdrops</button>
    </div>
    <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
    </div>
    </mat-drawer>
    <mat-drawer-content class="mat-app-background">
    <router-outlet></router-outlet>
  </mat-drawer-content>
    </mat-drawer-container>
    </main>
    
  `,
})
export class AppComponent implements OnInit{
  private readonly _activityWallet = inject(ActivityWallet);
  private readonly _connectionStore = inject(ConnectionStore);
  
  ngOnInit() {
    this._connectionStore.setEndpoint(this._activityWallet.getEndpoint());
  }
}

