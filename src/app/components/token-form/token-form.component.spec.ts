import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TokenFormComponent } from './token-form.component';
import { GithubApiService } from '../../services/github-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TokenFormComponent', () => {
  let component: TokenFormComponent;
  let fixture: ComponentFixture<TokenFormComponent>;
  let githubApiService: jasmine.SpyObj<GithubApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const githubApiServiceSpy = jasmine.createSpyObj('GithubApiService', ['validateToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        TokenFormComponent
      ],
      providers: [
        { provide: GithubApiService, useValue: githubApiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TokenFormComponent);
    component = fixture.componentInstance;
    githubApiService = TestBed.inject(GithubApiService) as jasmine.SpyObj<GithubApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when the token is empty', () => {
    component.tokenForm.controls['token'].setValue('');
    expect(component.tokenForm.invalid).toBeTruthy();
  });

  it('should be valid when the token is provided', () => {
    component.tokenForm.controls['token'].setValue('valid_token');
    expect(component.tokenForm.valid).toBeTruthy();
  });

  it('should call GithubApiService.validateToken and navigate on successful submission', () => {
    component.tokenForm.controls['token'].setValue('valid_token');
    githubApiService.validateToken.and.returnValue(of({}));
    component.onSubmit();

    expect(githubApiService.validateToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/repositories']);
    expect(component.errorMessage).toBeUndefined();
    expect(component.tokenForm.enabled).toBeTrue();
  });

  it('should display an error message and re-enable the form on failed submission', () => {
    component.tokenForm.controls['token'].setValue('invalid_token');
    githubApiService.validateToken.and.returnValue(throwError(() => new Error('Invalid token')));
    component.onSubmit();

    expect(githubApiService.validateToken).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid token. Please try again.');
    expect(component.tokenForm.enabled).toBeTrue();
  });
});
