import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { StoreComponent } from '../store/store.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { UserComponent } from "../../userContext/user/user/user.component";
import { ProfilComponent } from "../profil/profil.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavigationComponent, StoreComponent, RouterOutlet, HeaderComponent, UserComponent, ProfilComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
