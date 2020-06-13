import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-career-new',
  templateUrl: './career-new.component.html',
  styleUrls: ['./career-new.component.css']
})
export class CareerNewComponent implements OnInit {

  newCareerForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    centro: new FormControl(null, Validators.required)
  })

  constructor(
    private location: Location,
    private careerService: CareerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

  onSubmit(){
    let data = this.newCareerForm.value;
    console.log(data);
    this.careerService.fnPostNewCareer(data)
    .then(res => {
      this.toastr.success(res);
      this.newCareerForm.reset();
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

}
