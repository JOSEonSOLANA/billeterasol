import { Component } from '@angular/core';
import { OrcaSectionComponent} from "../sections/orca-section.component"

@Component({
    selector: 'billeterasol-snipper-page',
    template: `
    <billeterasol-orca-section></billeterasol-orca-section>
    `,
    standalone: true,
    imports: [OrcaSectionComponent]
})

export class OrcaPageComponent {}