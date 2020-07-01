import { AuthService } from "./../../auth/auth.service";
import { EventEmitter, OnDestroy } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  authSub: Subscription;
  userAuthorized: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.userAuthorized.subscribe((authorized) => {
      this.userAuthorized = authorized;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onSideNavToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
