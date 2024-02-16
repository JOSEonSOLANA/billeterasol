import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent} from '@heavy-duty/wallet-adapter-material';


@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor ],
  selector: 'billeterasol-root',
  template: `
    <header class="py-8">
      <h1 class="text-5xl text-center mb-4">Wallet</h1>

      <div class="flex justify-center mb-4">
      <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Tokens</a>
          </li>
          <li>
            <a [routerLink]="['activity']" mat-raised-button>Activity</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
