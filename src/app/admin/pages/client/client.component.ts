import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  updateForm!: FormGroup;
  leadData: any;
  constructor(
    private api: AllService,
    private route: Router,
    private fb: FormBuilder,
    private swet: SweetsalertsServicesService
  ) { }
  addclient() {
    this.route.navigate(['/Admin/Addclient'])
  }
  url = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  patientsCount: any[] = [];
  paginatedDoctors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  dataSend: any

  ngOnInit(): void {
    this.getPatients();
    this.getcaregiver();
  }

  getPatients() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCount = res.data.filter((item: any) => item.leadStatus).reverse();
      this.filteredClients = [...this.patientsCount];
      this.totalPages = Math.ceil(this.patientsCount.length / this.itemsPerPage);
      this.setPage(1);
      console.log('Filtered patient count', this.patientsCount);
    });
  }
filteredClients: any[] = [];
patientsCountss:any[]=[];
searchTerm: string = '';
filterClients() {
  this.filteredClients = this.patientsCount.filter(client =>
    client.servicetype.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.note.toLowerCase().includes(this.searchTerm.toLowerCase())   
  );
}
uploadDocument(id:any){
  console.log(id);
  window.open(id)
  }
  setPage(page: number) {
  this.currentPage = page;
  const startIndex = (page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedDoctors = this.patientsCount.slice(startIndex, endIndex);
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
toggleVerified(data: any) {
  var id = data.id;
  this.dataSend = {
    leadStatus: !data.leadStatus // Toggle between true and false
  };
  this.api.leadsttsusupdated(id, this.dataSend).subscribe(res => {
    if (res) {
      this.getPatients();
      const accountStatus = res.data.leadStatus;
      const doctorName = res.data.name;
      if (accountStatus) {
        this.swet.SucessToast(`${doctorName} Lead approved successfully`);
      } else {
        this.swet.SucessToast(`${doctorName} Lead disapproved successfully`);
      }
    }
  });
}


viewClientProfile(clientId: string) {
  this.route.navigate(['/Admin/Clientprofile_view', { id: clientId }]);
}
getcaregiver() {
  this.api.getcaregivers().subscribe((res: any) => {
    this.patientsCountss = res.data
    console.log("getcaregiver", this.patientsCount)
  });
}


updateleadebyidss(id: string, data: any): void {
  this.api.updateleadebyidss(id, data).subscribe((res: any) => {
    console.log('Client updateleadebyidss:', res.data);
    this.getPatients(); 
  }, (error) => {
    console.error('Error updating lead:', error);
  });
}
// updateCaregiver(clientId: string, caregiverId: string): void {
//   const data = {
//     caregiverId: caregiverId 
//   };
//   this.updateleadebyidss(clientId, data);
// }
//        


updateCaregiver(clientId: string, caregiverId: string,caregiverName: string): void {
  const data = {
    caregiverId: caregiverId ? Number(caregiverId) : null, // Convert to number or set to null if empty
    caregiverName: caregiverName 
  };
  this.updateleadebyidss(clientId, data);
}

updateCaregiverSelection(clientId: string, event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const caregiverId = selectElement.value;
  const caregiverName = selectElement.options[selectElement.selectedIndex].text;
  this.updateCaregiver(clientId, caregiverId,caregiverName);
}

}


