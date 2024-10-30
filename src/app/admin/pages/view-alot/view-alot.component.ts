import { Component, OnInit } from '@angular/core';

import { AllService } from 'src/app/Api/all.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';
 
@Component({
  selector: 'app-view-alot',
  templateUrl: './view-alot.component.html',
  styleUrls: ['./view-alot.component.css']
})
export class ViewAlotComponent implements OnInit {

  updateForm!:FormGroup;
  allalotsssCount:any=[];

  constructor(private api:AllService,private route:Router,private fb:FormBuilder,
    private swet: SweetsalertsServicesService
  ){
    this.updateForm = this.fb.group({
      patientName: [''],
      nurseName: [''],
      formDate: [''],
      toDate: [''],
    })
  }


  
  updateNurse() {
    this.api.allotupdate(this.id, this.nurseByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
      this.swet.SucessToast(`Alottement Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
      // Handle error
    });
  }

  nursesCount: any[] = [];  // Initialize as an array to store the single nurse
  paginatedNurses: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  userId:any
  ngOnInit(): void {
    // const userIdString = localStorage.getItem('id');
    // this.userId = userIdString ? parseInt(userIdString, 10) : null;
    // console.log( 'admin id', this.userId);
    this.getalotss();
  }



  getalotss(){
    this.api.getallalotnursesForAdmin().subscribe((res:any)=>{
      this.allalotsssCount = res.data;
      this.totalPages = Math.ceil(this.allalotsssCount.length / this.itemsPerPage);
      this.setPage(1);
      console.log('nurse count', this.allalotsssCount)
    })
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedNurses = this.allalotsssCount.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }


  id:any;
  nurseByIdData:any=[];
  allotedById(data: any) {
  this.id = data;
  this.api.allotedById(data).subscribe((res: any) => {
    this.nurseByIdData = res.data;
  })
}

// allotsDeleted(itemDlt: any): void {
//   this.api.deletealot(itemDlt.id).subscribe(
//     () => {
//       window.location.reload()
//     },
//     (error) => {
//       console.error('Error deleting dispatched', error);
//     }
//   );
// }




allotsDeleted(itemDlt: any) {
  this.api.deletealot(itemDlt.id).subscribe((res: any) => {
    if (res.success) {
      this.allalotsssCount = res.data;
      this.swet.SucessToast('allotment Deleted successfully!');
      // Close the modal using plain JavaScript
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const bootstrapModal = new (window as any).bootstrap.Modal(modalElement); // Use bootstrap from window object
        bootstrapModal.hide(); // Hide modal after success
      }

      window.location.reload(); // Reload the page to refresh the data
     
    } else {
      this.swet.SucessToast(`${res.message}`);
    }
  });
}


}
