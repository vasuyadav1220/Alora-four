import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  certificateForm: FormGroup;
  userId: any;


  constructor(private fb: FormBuilder, private api: AllService, private swet: SweetsalertsServicesService) {
    const userIdString = localStorage.getItem('id');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.certificateForm = this.fb.group({
      caregiverCertificate: [''],
      caregiverId: [this.userId],
      descriprtion: ['']
    });
  }

  onSubmit() {
    this.api.addCertificate(this.certificateForm.value).subscribe((res: any) => {
      this.ngOnInit();
    })
  }

  imgs!: File;
  imagesBox = '../../../../../../assets/img/product/product1.jpg'

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

  addCertificate() {
    if (this.certificateForm.invalid) {
      return;
    } else {
      try {
        const formData: any = new FormData();
        formData.append('caregiverCertificate', this.imgs);

        const arr = [
          'caregiverId',
          'descriprtion'
        ];

        for (const key of arr) {
          formData.append(key, this.certificateForm.get(key)?.value);
        }
        console.log("post api fire", this.certificateForm);

        this.api.addCertificate(formData).subscribe((res: any) => {
          console.log(res);
          this.ngOnInit();
          this.swet.SucessToast(`Certificate added successfully`);
          // this.route.navigate(['Admin/view_patients']);
        },
          (err) => {
            console.log(err);
          });

      } catch (err) {
        console.log(err);
      }
    }
  }

  ngOnInit(): void {
this.getCertificates()
  }

  certificateData:any[]=[];
  getCertificates(){
    this.api.getCertificate().subscribe((res:any)=>{
      console.log(res);
      this.certificateData=res.data;
    })
  }
}
