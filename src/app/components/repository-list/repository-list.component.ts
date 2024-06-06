import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {AsyncPipe, DatePipe, DecimalPipe, ViewportScroller} from "@angular/common";
import {RepositoryListCardComponent} from "../repository-list-card/repository-list-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RepositoryListService} from "./repository-list.service";

@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatCardActions,
    MatAnchor,
    DatePipe,
    RepositoryListCardComponent,
    MatPaginator,
    AsyncPipe,
    DecimalPipe
  ],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.scss'
})
export class RepositoryListComponent implements OnInit{

  constructor(
    public repositoryListService: RepositoryListService,
    private _viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.repositoryListService.get();
  }

  handlePageEvent(event: PageEvent) {
    if (!event.previousPageIndex || event.previousPageIndex < event.pageIndex) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  nextPage() {
    this.repositoryListService.fetchNextPage();
    this._viewportScroller.scrollToPosition([0, 0])
  }

  prevPage() {
    this.repositoryListService.fetchPreviousPage();
    this._viewportScroller.scrollToPosition([0, 0])
  }
}
