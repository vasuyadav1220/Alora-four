import { Component, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
  }

  clearSignature(): void {
    this.signaturePad.clear();
  }

  saveSignature(): void {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const base64Data = this.signaturePad.toDataURL();
      console.log("Signature saved as:", base64Data);
      // Store the base64Data for later use
      this.leadform.patchValue({ clientSignature: base64Data });
    }
  }

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

  clientID:any;
  ngOnInit(): void {
    this.clientID=localStorage.getItem('patient_id')

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('Client ID:', this.userId);
      this.getPatientProfile(); 
    });

    this.leadform  = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      servicetype: [''],
      note: [''],
      medicaidId: [''],
      contactNumber: [''],
      address: [''],
      attachDoc: [''],
      docExpiryDate: [''],
      clientNote: [''],
      dayaBeforeExpiration: [''],
      permanentPriorityNotes: [''],
      Administrator: [''],
      leadCreatedDate: [''],
      gender: [''],
      City: [''],
      State: [''],
      zipCode: [''],
      profile: [''],
      clientSignature:['']
    });
  }

  profileData:any=[];

  getPatientProfile(): void {
    this.service.patientByID(this.userId).subscribe((res: any) => {
      console.log('Client Profile:', res.data);
      this.profileData = res.data;
    });
  }

  onSubmit(): void {
    if (this.leadform .valid) {
      this.service.addlead(this.leadform .value).subscribe((res: any) => {
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('Form added', res);
      });
    }
  }

  leadeupdateapi(): void {
    // alert("To change your personal data please contact us");
    console.log("After Lead data", this.leadform .value);
    if (this.leadform .invalid) {
      return; 
    } else {
      try {
        const formData = new FormData();
        formData.append('profile', this.imgs);
        console.log("profile data",this.imgs);
        const arr = [
          'name',
          'email',
          'servicetype',
          'note',
          'medicaidId',
          'contactNumber',
          'address',
          'attachDoc',
          'docExpiryDate',
          'clientNote',
          'dayaBeforeExpiration',
          'permanentPriorityNotes',
          'Administrator',
          'leadCreatedDate',
          'gender',
          'City',
          'State',
          'zipCode',
          'clientSignature'
        ];
        for (const key of arr) {
          if (key === 'clientNote' || key === 'details') { 
            formData.append(key, JSON.stringify(this.leadform .get(key)?.value));
          } else {
            formData.append(key, this.leadform .get(key)?.value);
          }
        }
        console.log("post api");
        this.service.putleadupdate(this.clientID, formData).subscribe(
          (res: any) => {
            this.swet.SucessToast(`Profile Updated Successfully`);
            
            console.log('Updated Lead Profile:', res.data);
            this.ngOnInit()
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
