import { CanMatchFn } from '@angular/router';
import { GithubApiService } from "../services/github-api.service";
import { inject } from "@angular/core";

export const tokenPresenceGuard: CanMatchFn = () => {
  return !!inject(GithubApiService).token
};
