import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubApiService } from '../../services/github-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-token-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.scss']
})
export class TokenFormComponent implements OnDestroy{
  tokenForm: FormGroup;
  errorMessage?: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _githubApiService: GithubApiService) {
    this.tokenForm = this._fb.group({
      token: [this._githubApiService.token ?? '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.tokenForm.invalid) return;

    this.tokenForm.disable();
    this._githubApiService.token = this.tokenForm.value.token;

    this.subscription.add(
      this._githubApiService.validateToken().subscribe({
        next: () => {
          this._router.navigate(['/repositories']);
        },
        error: () => {
          this.errorMessage = 'The Token you provided is invalid.';
          this.tokenForm.controls['token'].setErrors({ invalid: true });
          this.tokenForm.enable();
        },
        complete: () => {
          this.tokenForm.enable();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
