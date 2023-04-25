import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InspectionService } from 'src/app/services/inspection.service';

@Component({
  selector: 'app-add-inspections',
  templateUrl: './add-inspections.component.html',
  styleUrls: ['./add-inspections.component.css']
})
export class AddInspectionsComponent implements OnInit {
  myForm: FormGroup;
  data: any;
  submited = false;

  constructor(private formBuilder: FormBuilder,
              private inspectionService: InspectionService,
              private toastr: ToastrService){}

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      //companyId: ['', Validators.required],
      brokerCode: ['', [Validators.required]],
      productCode: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      inspectionNumber: ['', [Validators.required]]
  });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
  }


  onSubmit(){
    this.submited = true;
    if(this.myForm.invalid) return;

    this.inspectionService.addInspection(this.myForm.value).subscribe((data) => {
      this.data = data;
      this.toastr.success('Registered successfully!', 'Bingo');
      this.resetForm();
    },
    error => {
        this.toastr.error(error.message, 'Erro');

    })
  }

  resetForm(){
    this.myForm.reset();
    this.submited = false;
  }


}
