import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginValid = true;
  logForm: FormGroup;

  constructor(private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(){
    this.logForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.logForm.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    this.authService.login(this.logForm.value).subscribe((result) => {
      if(result.token){
        localStorage.setItem('token',result.token);
        this.router.navigate(['/list-inspections']);
        this.toastr.success('', 'Wellcome!');
      }else if (result.error && result.error.message) {
        this.toastr.error(result.error, 'Error');
      }

    },
    (error) => {
      if (error.status === 404) {
        this.toastr.error('Invalid credentials', 'Error');
      } else {
        this.toastr.error('An error occurred', 'Error');
      }
      console.error(error);
    });

  }

}
