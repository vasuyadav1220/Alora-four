
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-caregiverprofilenew',
  templateUrl: './caregiverprofilenew.component.html',
  styleUrls: ['./caregiverprofilenew.component.css']
})
export class CaregiverprofilenewComponent {




  leadform !: FormGroup;
  userId: any;
  url = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  imgs!: File;
    imagesBox = '../../../../../../assets/img/product/product1.jpg'

  constructor(
    private fb: FormBuilder,
    private service: AllService,
    private route: ActivatedRoute,
    private swet: SweetsalertsServicesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('Client ID:', this.userId);
      this.getClientProfile(this.userId); 
    });

    this.leadform  = this.fb.group({
      caregiverName:[''],
      email:[''],
      address:[''],
      caregiverNote:[''],
      password:[''],
      // electronicSignature:[''],
    });
  }

  // onSubmit(): void {
  //   if (this.leadform .valid) {
  //     this.service.addlead(this.leadform .value).subscribe((res: any) => {
  //       this.swet.SucessToast(`Generate Lead Successfully`);
  //       console.log('Form added', res);
  //     });
  //   }
  // }

  getClientProfile(id: string): void {
    this.service.caregivercreategetbyid(id).subscribe((res: any) => {
      this.leadform .patchValue(res.data); // Assuming the response has the client data
      console.log('Client Profile:', res.data);
    });
  }


leadeupdateapi(): void {
  if (this.leadform .invalid) {
    return; 
  } else {
    try {
      const formData = new FormData();
      // formData.append('electronicSignature', this.imgs);
      // console.log("profile data",this.imgs);
      const arr = [
        'caregiverName',
        'email',
        'address',
        'caregiverNote',
        'password'
      ];
      for (const key of arr) {
        if (key === 'clientNote' || key === 'details') { 
          formData.append(key, JSON.stringify(this.leadform .get(key)?.value));
        } else {
          formData.append(key, this.leadform .get(key)?.value);
        }
      }
      console.log("post api");
      this.service.putcaregivercreateidsdata(this.userId, formData).subscribe(
        (res: any) => {
          this.swet.SucessToast(`Profile Updated Successfully`);
          console.log('Updated Lead Profile:', res.data);
        },
        (error) => {
          console.error('Error updating lead profile:', error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

  
Onupload(event: any) {
  if (event.target.files.length > 0) {
    this.imgs = event.target.files[0];
  }
  if (event.target.files && event.target.files[0]) {
    const filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagesBox = event.target.result;
      }
      reader.readAsDataURL(event.target.files[i]);
    }
  }
}



}
