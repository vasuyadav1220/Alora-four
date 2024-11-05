import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';


@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.css']
})
export class CaregiverComponent  implements OnInit{

  constructor( private route :Router,
    private api:AllService,
    private swet: SweetsalertsServicesService
   ){

  }
  ngOnInit(): void {
    this.getcaregiver()  
  }

  patientsCount:any=[]
  


  getcaregiver() {
    this.api.getcaregivers().subscribe((res: any) => {
      this.patientsCount = res.data
      console.log("getcaregiver", this.patientsCount)
      // this.filteredClients = [...this.patientsCount];
      // this.totalPages = Math.ceil(this.patientsCount.length / this.itemsPerPage);
      // this.setPage(1);
      // console.log('Filtered patient count', this.patientsCount);
    });
  }


  caregiver(){
    this.route.navigate(["/Admin/Addcaregiver"]);
  }


  itemDelete(itemDlt: any): void {
    this.api.deleteCareGiver(itemDlt.id).subscribe(
      () => {
      //  window.location.reload();
      this.swet.delete(`Deleted Caregiver Successfully`);
      this.ngOnInit();
        console.log('item deleted successfully');
      },
      (error) => {
        console.error('Error deleting item', error);
      }
    );
  }


viewcaregiverProfile(clientId: string) {
  this.route.navigate(['/Admin/caregiverprofilenew', { id: clientId }]);
}

  uploadDocument(id:any){
    console.log(id);
    window.open(id)
    }
}
