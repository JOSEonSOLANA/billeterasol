import { Component } from '@angular/core';
//import { toSignal } from '@angular/core/rxjs-interop';
//import { WalletStore } from '@heavy-duty/wallet-adapter';
import { DashboardSectionComponent } from '../sections/dashboard-section.component';

//import { computedAsync } from 'ngxtension/computed-async';
//import { SolBalance } from '../services/shyft-api.services';

//import { Chart } from 'chart.js';

@Component({
    selector: 'billeterasol-dashboard-page',
    template: `
    <billeterasol-dashboard-section ></billeterasol-dashboard-section>
    `,
    standalone: true,
    imports: [DashboardSectionComponent]
})
export class DashboardPageComponent {
    
}
