import { Component, ViewChild, ElementRef, AfterViewInit,OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit , AfterViewInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;
  profileData: any;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
  }

  ngOnInit(): void {
   this.getPatientProfile();
   this.getPatientclientdata()
   this.getMySign();
  }

  getMySign(): void {
    this.api.patientByID(this.userId).subscribe((res: any) => {
      console.log('Client Profile:', res.data);
      this.profileData = res.data.clientSignature;
    });
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
      this.addDocumentForm.patchValue({ clientSignature: base64Data });
    }
  }

  addDocumentForm:FormGroup;
  userId: any;
  clientbyidata:any=[];
  clientbyidatass:any[]=[];
  
  constructor(private api:AllService,private swet:SweetsalertsServicesService){
    const userIdString = localStorage.getItem('patient_id');
    console.log("id client ", userIdString) 
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.addDocumentForm=new FormGroup({
      document:new FormControl('',Validators.required),
      expiryDate:new FormControl('',Validators.required),
      clientSignature:new FormControl('',Validators.required),
      clientId:new FormControl(this.userId),
      clientcomment:new FormControl('',Validators.required),
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
          'clientSignature',
          'clientcomment'
        ];

    
        for (const key of arr) {
          formData.append(key, this.addDocumentForm.get(key)?.value);
        }
        console.log("post api fire", this.addDocumentForm);
        // console.log("formdata api fire", formData.getAll('image'));
        // console.log("formdata api fire", formData.getAll('doctorId'));
  
        // Call the postDoctors method without headers
        this.api.addDocument(formData).subscribe((res: any) => {
          console.log(res);
          const patientName = res.data.name;  // Get the doctor's name from the response
          this.swet.SucessToast(`Caregiver ${patientName} created successfully`);
          this.addDocumentForm.reset();
          this.ngOnInit()
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

  getPatientProfile(): void {
    this.api.clientDocumentbyid().subscribe((res: any) => {
      this.addDocumentForm .patchValue(res.data); // Assuming the response has the client data
      console.log('Client Profile:', res.data);
      this.clientbyidata= res.data;
    });
  }

  getPatientclientdata(): void {
    this.api.clientDocumentbyidexpired().subscribe((res: any) => {
      this.addDocumentForm .patchValue(res.data); // Assuming the response has the client data
      console.log('Client Profile:', res.data);
      this.clientbyidatass= res.data;
    });
  }


  

  
}
