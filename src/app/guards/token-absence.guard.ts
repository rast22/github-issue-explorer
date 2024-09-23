import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {GithubApiService} from "../services/github-api.service";

export const tokenAbsenceGuard: CanActivateFn = (route, state) => {
  return !inject(GithubApiService).token

};
