import { Routes } from '@angular/router';
import {TokenFormComponent} from "./components/token-form/token-form.component";
import {RepositoryListComponent} from "./components/repository-list/repository-list.component";
import {RepositoryDetailsComponent} from "./components/repository-details/repository-details.component";
import {tokenPresenceGuard} from "./guards/token-presence.guard";

export const routes: Routes = [
  { path: '', component: TokenFormComponent },
  { path: 'repositories', component: RepositoryListComponent, canMatch: [tokenPresenceGuard] },
  { path: ':owner/:repositoryName', component: RepositoryDetailsComponent, canMatch: [tokenPresenceGuard] },
  { path: '**', redirectTo: ''},
];
