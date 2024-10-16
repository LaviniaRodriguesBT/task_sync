import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-type-selection',
  templateUrl: './user-type-selection.component.html',
  styleUrls: ['./user-type-selection.component.css']
})
export class UserTypeSelectionComponent {
  constructor(private router: Router) {}
  selectUserType(type: string) {
    this.router.navigate(['/account/sign-in'], { queryParams: { accessType: type } });
  }
}
