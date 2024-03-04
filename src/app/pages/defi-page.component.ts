import { Component } from '@angular/core';
import { DefiSectionComponent } from '../sections/defi-section.component';

@Component({
    selector: 'billeterasol-defi-page',
    template: `
    <billeterasol-defi-section></billeterasol-defi-section>
    `,
    standalone: true,
    imports: [DefiSectionComponent]
})

export class DefiPageComponent {}