import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GithubApiService} from "../../services/github-api.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-token-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel
  ],
  templateUrl: './token-form.component.html',
  styleUrl: './token-form.component.scss'
})
export class TokenFormComponent {
  tokenForm: FormGroup;
  errorMessage?: string;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _githubApiService: GithubApiService) {
    this.tokenForm = this._fb.group({
      token: [this._githubApiService.token ?? '', Validators.required]
    });
  }

  onSubmit() {
    if (this.tokenForm.invalid) return;

    this.tokenForm.disable();
    this._githubApiService.token = this.tokenForm.value.token;

    this._githubApiService.validateToken().subscribe({
      next: () => {
        this._router.navigate(['/repositories']);
      },
      error: (e) => {
        this.errorMessage = 'The Token you provided is invalid.';
        this.tokenForm.controls['token'].setErrors({invalid: true});
        this.tokenForm.enable();
      },
      complete: () => {
        this.tokenForm.enable();
      }
    });
  }
}
