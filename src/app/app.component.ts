import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {GithubApiService} from "./services/github-api.service";
import {AsyncPipe} from "@angular/common";
import {LoaderComponent} from "./components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavContent, MatSidenavContainer, AsyncPipe, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'github-issue-explorer';
  constructor() {
  }
}
