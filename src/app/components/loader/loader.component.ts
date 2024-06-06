import {Component, Input} from '@angular/core';
import {GithubApiService} from "../../services/github-api.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  constructor(protected githubApiService: GithubApiService) { }
}
