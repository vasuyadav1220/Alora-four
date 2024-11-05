import { Component, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';


@Component({
  selector: 'app-nurse-alote-view',
  templateUrl: './nurse-alote-view.component.html',
  styleUrls: ['./nurse-alote-view.component.css']
})
export class NurseAloteViewComponent implements OnInit , AfterViewInit {

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
      this.updateForm.patchValue({ caregiverSignature: base64Data });
    }
  }

  nursename:any;
  nurseID:any;
  updateForm!:FormGroup;
  profileData:any=[];
  rehan:any;

  constructor(private api:AllService,private route:Router,private fb:FormBuilder,
  private swet :SweetsalertsServicesService
  ){
    this.nursename=localStorage.getItem('nurse_name')
    this.nurseID=localStorage.getItem('caregiverid')
    
    this.updateForm = this.fb.group({
      caregiverName: [''],
      email: [''],
      address: [''],
      caregiverNote: [''],
      caregiverSignature:[''],
    })
  }

  userId:any
  ngOnInit(): void {
    this.getalotss();
  }

  adminId:any;

  getalotss(){
    this.api.caregivercreategetbyid(this.adminId).subscribe((res:any)=>{
      this.profileData = res.data;
      console.log('profile data',this.profileData)
    })
  }
  updateProfile(){
    this.api.putcaregivercreateidsdata(this.nurseID, this.updateForm.value).subscribe((res:any)=>{
      console.log(res);
      this.swet.SucessToast(`Profile Update Successfully !`);
      this.ngOnInit();
    }, (error) => {
      console.error(error);
    });
  }



}


