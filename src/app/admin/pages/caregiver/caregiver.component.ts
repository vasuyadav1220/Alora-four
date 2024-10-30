import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.css']
})
export class CaregiverComponent  implements OnInit{

  constructor( private route :Router,
    private api:AllService
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


  uploadDocument(id:any){
    console.log(id);
    window.open(id)
    }
}
