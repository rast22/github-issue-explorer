import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ShortNumberPipe} from "../../pipes/short-number.pipe";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-repository-list-card',
  standalone: true,
  imports: [
    DatePipe,
    MatAnchor,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
    ShortNumberPipe,
    MatIcon
  ],
  templateUrl: './repository-list-card.component.html',
  styleUrl: './repository-list-card.component.scss'
})
export class RepositoryListCardComponent {
    @Input() name: string = '';
    @Input() ownerUsername: string = '';
    @Input() ownerUrl: string = '';
    @Input() description: string = '';
    @Input() primaryLanguage: string = '';
    @Input() stargazerCount: number = 0;
    @Input() createdAt: string = '';
    @Input() url: string = '';
    @Input() onDetailsPage: boolean = false;
}
