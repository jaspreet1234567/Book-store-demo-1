import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/api-response.interface';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private router: Router,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.coreService.login(this.loginForm.value).subscribe((respoonse: ApiResponse) => {
      if (respoonse.isSuccess && respoonse.data) {
        localStorage.setItem('auth-token', respoonse.data);
        this.router.navigate(['/book/list']);
        return;
      }
      console.log('Invalid username or email');
    });
  }
}
