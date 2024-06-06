import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatAnchor, MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {AsyncPipe, DatePipe, SlicePipe, ViewportScroller} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RepositoryDetailsService} from "./repository-details.service";
import {RepositoryListCardComponent} from "../repository-list-card/repository-list-card.component";
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatTooltip} from "@angular/material/tooltip";
import {debounce} from "rxjs";

@Component({
  selector: 'app-repository-details',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    DatePipe,
    MatPaginator,
    AsyncPipe,
    RepositoryListCardComponent,
    MatCardActions,
    MatAnchor,
    MatIcon,
    SlicePipe,
    MatChip,
    MatChipListbox,
    MatCardHeader,
    MatTooltip
  ],
  templateUrl: './repository-details.component.html',
  styleUrl: './repository-details.component.scss'
})
export class RepositoryDetailsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    protected repositoryDetailsService: RepositoryDetailsService,
    private _viewportScroller: ViewportScroller
  ) { }

  ngOnInit() {
    const owner = this._route.snapshot.paramMap.get('owner');
    const name = this._route.snapshot.paramMap.get('repositoryName');

    if (!owner || !name) {
      this._router.navigate(['/repositories']);
      return;
    }

    this.repositoryDetailsService.repoOwner = { owner, name };
    this.repositoryDetailsService.get();
  }

  handlePageEvent(event: PageEvent) {
    if (!event.previousPageIndex || event.previousPageIndex < event.pageIndex) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  nextPage() {
    this.repositoryDetailsService.fetchNextPage();
    this._viewportScroller.scrollToPosition([0, 0])

  }

  prevPage() {
    this.repositoryDetailsService.fetchPreviousPage();
    this._viewportScroller.scrollToPosition([0, 0])
  }

}
