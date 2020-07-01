import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  authSub: Subscription;
  userAuthorized: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userAuthorized.subscribe((authorized) => {
      this.userAuthorized = authorized;
    });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    this.sideNavToggle.emit();
  }
}
