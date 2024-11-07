import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  addDocumentForm:FormGroup;
  userId: any;
 
  message: string = '';
  success: boolean = false;
  nurseEmail: string | null = null;


  sendForSignature(document: any) {
    if (!this.nurseEmail) {
      this.message = 'Nurse email not found in local storage';
      this.success = false;
      return;
    }

    const file = this.urlToFile(document.document);

    // Disable button and initiate API call
    document.isSent = true;
    this.api.uploadDocument(file).subscribe({
      next: (response) => {
        const transientDocumentId = response.transientDocumentId;

        this.api.createAgreement(transientDocumentId, this.nurseEmail!).subscribe({
          next: () => {
            this.message = 'Agreement created successfully!';
            this.success = true;
          },
          error: (err) => {
            this.message = 'Error creating agreement: ' + err.message;
            this.success = false;
            document.isSent = false; // Re-enable button on error
          }
        });
      },
      error: (err) => {
        this.message = 'Error uploading document: ' + err.message;
        this.success = false;
        document.isSent = false; // Re-enable button on error
      }
    });
  }

  urlToFile(url: string): File {
    const blob = new Blob([url], { type: 'application/pdf' });
    return new File([blob], 'document.pdf', { type: blob.type });
  }

  // sendForSignature(document: any) {
  //   // Assuming `document.document` is the file URL
  //   const file = this.urlToFile(document.document);
  //   const recipientEmail = this.nurseEmail; // Modify to get dynamically if needed

  //   this.api.uploadDocument(file).subscribe({
  //     next: (response) => {
  //       const transientDocumentId = response.transientDocumentId;

  //       // Create the agreement with the obtained transientDocumentId
  //       this.api.createAgreement(transientDocumentId, recipientEmail).subscribe({
  //         next: (agreementResponse) => {
  //           this.message = 'Agreement created successfully!';
  //           this.success = true;
  //         },
  //         error: (err) => {
  //           this.message = 'Error creating agreement: ' + err.message;
  //           this.success = false;
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       this.message = 'Error uploading document: ' + err.message;
  //       this.success = false;
  //     }
  //   });
  // }

  // Helper function to convert URL to File object
  // urlToFile(url: string): File {
  //   const blob = new Blob([url], { type: 'application/pdf' }); // Adjust MIME type as necessary
  //   return new File([blob], 'document.pdf', { type: blob.type });
  // }

  constructor(private api:AllService,private swet:SweetsalertsServicesService){
    const userIdString = localStorage.getItem('id');
    // this.nurseEmail = localStorage.getItem('email');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.addDocumentForm=new FormGroup({
      document:new FormControl('',Validators.required),
      expiryDate:new FormControl('',Validators.required),
      caregiverId:new FormControl(this.userId),
      nursecomment:new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.getDocumentByNurseId();
    this.getDocumentByNurseIdArchivessss();
    this.nurseEmail = localStorage.getItem('email');
  }

  document:any[]=[];
  documentss:any[]=[];
  getDocumentByNurseId(){
    this.api.getDocumentByNurseId().subscribe((res:any)=>{
      console.log(res);
      this.document=res.data;
    })
  }

  getDocumentByNurseIdArchivessss(){
    this.api.getDocumentByNurseIdArchivess().subscribe((res:any)=>{
      console.log(res);
      this.documentss=res.data;
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
          'caregiverId',
          'nursecomment'
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
          this.swet.SucessToast(`Caregiver created successfully`);
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


  

  

}
