import { Component } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent {


  constructor(
    private api: AllService
  ) {
    const userIdString = localStorage.getItem('caregiverid');
    console.log("id client ", userIdString) 
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
   }

  patientsCounts:any=[];
  patientsCount:any=[];
  activeClientsCount:any

  ngOnInit(): void {
    this.getgetleadss();
    this.getPatients();
    this.getDocumentByNurseId();
    this.getPatientProfile()
    throw new Error('Method not implemented.');
    
  }

  document:any[]=[];
  documentss:any[]=[];
  getDocumentByNurseId(){
    this.api.getDocumentByNurseId().subscribe((res:any)=>{
      console.log(res);
      this.document=res.data;
    })
  }

  userId: any;
  clientbyidata:any=[];
  getPatientProfile(): void {
    this.api.getclientdocumentbynurseids(this.userId).subscribe((res: any) => {
      console.log('Client Profile:', res.data);
      this.clientbyidata= res.data;
    });
  }

  getgetleadss() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCounts = res.data.length;
      console.log( "fg",this.patientsCounts)
    })
  }

  getPatients() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCount = res.data.filter((item: any) => item.leadStatus);
      this.activeClientsCount = this.patientsCount.length;
      console.log('Filtered patient count', this.patientsCount);
    });
  }
}
