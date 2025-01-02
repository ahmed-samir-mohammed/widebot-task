import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <p>
      profile works!
    </p>
  `,
  styles: ``
})
export class ProfileComponent {
  constructor(private route: ActivatedRoute) {}

}
