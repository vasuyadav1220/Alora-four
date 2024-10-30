import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-view-client-document',
  templateUrl: './view-client-document.component.html',
  styleUrls: ['./view-client-document.component.css']
})
export class ViewClientDocumentComponent implements OnInit {

  constructor ( private api:AllService ){}
  ngOnInit(): void {
    this.getPatients() ;
    this.getPatientProfile();
    this.getPatientclientdata()
   }

  patientsCount:any[]=[];
  clientbyidata:any[]=[];
  clientbyidatass:any[]=[];


  getPatients() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCount = res.data
    });
  }


  getPatientProfile(): void {
    this.api.clientDocumentbyid().subscribe((res: any) => {
      console.log('Client Profile:', res.data);
      this.clientbyidata= res.data;
    });
  }

  getPatientclientdata(): void {
    this.api.clientDocumentbyidexpired().subscribe((res: any) => {
      console.log('Client Profile:', res.data);
      this.clientbyidatass= res.data;
    });
  }



  id:any;
  docByIdData:any=[];
docById(data: any) {
  this.id = data;
  this.api.getClientDoc(data).subscribe((res: any) => {
    this.docByIdData = res.data;
  })
}



docByIdDatass:any=[];
docByIdss(data: any) {
this.id = data;
this.api.getClientDocexpiry(data).subscribe((res: any) => {
  this.docByIdData = res.data;
})
}



}
