import { Component, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-verify-document',
  templateUrl: './nurse-verify-document.component.html',
  styleUrls: ['./nurse-verify-document.component.css']
})

export class NurseVerifyDocumentComponent implements OnInit, AfterViewInit {

  file: File | null = null;
  recipientEmail: string = '';
  message: string = '';
  success: boolean = false;

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.file = target.files[0];
    }
  }

  onSubmit() {
    if (this.file && this.recipientEmail) {
      this.api.uploadDocument(this.file).subscribe({
        next: (response) => {
          const transientDocumentId = response.transientDocumentId;

          // Create the agreement with the obtained transientDocumentId
          this.api.createAgreement(transientDocumentId, this.recipientEmail).subscribe({
            next: (agreementResponse) => {
              this.message = 'Agreement created successfully!';
           this.swet.SucessToast(`${this.message}`);
              this.success = true;
            },
            error: (err) => {
              this.message = 'Error creating agreement: ' + err.message;
              this.success = false;
            }
          });
        },
        error: (err) => {
          this.message = 'Error uploading document: ' + err.message;
          this.success = false;
        }
      });
    } else {
      this.message = 'Please provide both file and recipient email.';
      this.success = false;
    }
  }


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
        this.addDocumentForm.patchValue({ nurseVerifySignature: base64Data });
      }
    }

  ngOnInit(): void {
    this.getPatientProfile();
    this.getNursesign()
   }
   addDocumentForm:FormGroup;
   verifyClientForm:FormGroup;
   userId: any;
   clientbyidata:any=[];
   clientbyidatass:any[]=[];

   constructor(private api:AllService,private swet:SweetsalertsServicesService,private route:Router){
     const userIdString = localStorage.getItem('caregiverid');
     console.log("id client ", userIdString) 
     this.userId = userIdString ? parseInt(userIdString, 10) : null;
     this.addDocumentForm=new FormGroup({
       document:new FormControl('',Validators.required),
     })

     this.verifyClientForm = new FormGroup({
      caregiverSignature:new FormControl(''),
      nursecommentverified:new FormControl('')
     })
   }

   id: any;
   @ViewChild('closeModal') closeModal!: ElementRef;

    setClientId(clientId: any) {
      this.id = clientId; // Set the client ID when "Verify" is clicked
    }

   verifyClient(){
    this.api.verifyClientByNurse(this.id ,this.verifyClientForm.value).subscribe((res:any)=>{
      // this.closeModal.nativeElement.click();
      this.swet.SucessToast(`Client verified successfully`);
          // this.route.navigate(['nurse/leads']);
    })
   }
 
  adminId:any;
  profileData:any=[];
   
  getNursesign(){
    this.api.caregivercreategetbyid(this.adminId).subscribe((res:any)=>{
      this.profileData = res.data.caregiverSignature;
      console.log('profile data',this.profileData)
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
   addDocument() {
     console.log("addDocument", this.addDocumentForm.value);
     if (this.addDocumentForm.invalid) {
       return;
     } else {
       try {
         console.log("Doctor data", this.addDocumentForm.value);
         const formData: any = new FormData();
         formData.append('document', this.imgs);
         const arr = [
           'expiryDate',
           'clientId',
         ];
         for (const key of arr) {
           formData.append(key, this.addDocumentForm.get(key)?.value);
         }
         console.log("post api fire", this.addDocumentForm);
         this.api.addDocument(formData).subscribe((res: any) => {
           console.log(res);
           const patientName = res.data.name;  
           this.swet.SucessToast(`Caregiver ${patientName} created successfully`);
         },
         (err) => {
           console.log(err);
         });
       } catch (err) {
         console.log(err);
       }
     }
   }
   getPatientProfile(): void {
     this.api.getclientdocumentbynurseids(this.userId).subscribe((res: any) => {
       this.addDocumentForm .patchValue(res.data); // Assuming the response has the client data
       console.log('Client Profile:', res.data);
       this.clientbyidata= res.data;
     });
   }
}
