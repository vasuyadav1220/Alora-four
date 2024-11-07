import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
// import { ToastrService } from 'ngx-toastr';
import { Observable,BehaviorSubject  } from 'rxjs';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AllService extends HttpService {

  private apiUrl = 'https://api.in1.adobesign.com/api/rest/v6';
  private accessToken = '3AAABLblqZhDKdk2UgVMQ8xtr2WsOKdRGGx4rtkmk1Z5US51uVfBcrYC0DBfSJ5uBSMpEHQ_EGNZ3DJ0gwKTP1MVo9YlqLp0V';

  uploadDocument(file: File) {
    const url = `${this.apiUrl}/transientDocuments`;

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    // Prepare form data
    const formData = new FormData();
    formData.append('File', file);
    formData.append('File-Name', file.name);

    // Make POST request
    return this.http.post<{ transientDocumentId: string }>(url, formData, { headers });
  }

  createAgreement(transientDocumentId: string, recipientEmail: string) {
    const url = `${this.apiUrl}/agreements`;
  
    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
  
    // Prepare request body
    const body = {
      fileInfos: [
        {
          transientDocumentId: transientDocumentId
        }
      ],
      name: 'Sample Agreement',
      participantSetsInfo: [
        {
          memberInfos: [
            {
              email: recipientEmail
            }
          ],
          order:1,
          role: 'SIGNER'
        }
      ],
      
      signatureType: 'ESIGN',
      state: 'IN_PROCESS'
    };
  
    // Make POST request
    return this.http.post(url, body, { headers });
  }
  

  constructor(public override http:HttpClient,
    // private _tos:ToastrService
  ) {
    super(http)
   }


 


   superAdminLogin(data: any) {
    return this.post(superAdminEndPoints.superAdminLogin,data)
   }

   doctorsForSuperAdmin(){
    return this.get(superAdminEndPoints.getdoctors)
   }
   getEmailAdmin(){
    return this.get(superAdminEndPoints.getEmail)
   }
   addemailAdmin(data: any){
    return this.post(superAdminEndPoints.addemail,data)
   }


   
   
   deletedoctorsForSuperAdmin(id:any){
    return this.delete(superAdminEndPoints.deletedoctor + id)
   }

   adminsById(id:any){
    return this.get(superAdminEndPoints.deletedoctor + id )
   }

   ststusdoctorsForSuperAdmin(id:any, data:any){
    return this.patch(superAdminEndPoints.approveDoctor + id , data)
   }
  //  postDoctors(data:any){
  //   return this.post(superAdminEndPoints.doctorsAdd, data)
  //  }



//    postDoctors(data: any) {
//     const headers = new HttpHeaders({
//         'Content-Type': 'multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p' // Custom boundary
//     });

//     return this.http.post(superAdminEndPoints.doctorsAdd, data, { headers });
// }

postDoctors(data: any) {
  const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'  // Correct content type for file upload

      // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'

  });

  return this.http.post(superAdminEndPoints.doctorsAdd, data, { headers });
}





   nursesForSuperAdmin(){
    return this.get(superAdminEndPoints.getnurses)
   }

  //  adminId:any;


   nursesForAdmin(){
     const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getNursesForAdmin + adminId )
   }

   getallalotnursesForAdmin(){
    return this.get(superAdminEndPoints.getallalotssgetNursesForAdmin)
   }

   Getallreports(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getallreports + adminId)
   }
   


   adnursesForSuperAdmin(data:any){
    return this.post(superAdminEndPoints.addnurses, data)
   }

   addslote(data:any){
    return this.post(superAdminEndPoints.addslotpost, data)
   }
   patientsForSuperAdmin(){
    return this.get(superAdminEndPoints.getpatients)
   }

   patientsForAdmin(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getPatientsForAdmin + adminId )
   }

   patientsForNurse(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.getPatientsForNurse + adminId )
   }

   
   patientById(id:any){
    return this.get(superAdminEndPoints.patientById + id )
   }

   getPatientDetailsByName(patientId: string): Observable<any> {
    // return this.http.get(`${this.baseUrl}/patientsbyname/${name}`);
    return this.get(superAdminEndPoints.patientForDtl + patientId )
  }

   private patientDetailDataSubject = new BehaviorSubject<any>(null);
   patientDetailData$ = this.patientDetailDataSubject.asObservable();
 
   setPatientDetailData(data: any) {
     this.patientDetailDataSubject.next(data);
   }
 
   getPatientDetailData() {
     return this.patientDetailDataSubject.getValue();
   }

   updatePatientById(id: any, updatedData: any) {
    return this.http.put(`https://alora-plus.vercel.app/api/v1/patient/${id}`, updatedData);
  }

   deletepatient(id:any){
    return this.delete(superAdminEndPoints.patientById + id )
   }


   nurseById(id:any){
    return this.get(superAdminEndPoints.nursesById + id )
   }

   allotedById(id:any){
    return this.get(superAdminEndPoints.allotedByIdById + id )
   }
   

   updateNurseById(id: any, updatedData: any) {
    return this.http.put(`https://alora-plus.vercel.app/api/v1/nurse/${id}`, updatedData);
  }

  allotupdate(id: any, updatedData: any) {
    return this.http.put(`https://alora-plus.vercel.app/api/v1/allot/${id}`, updatedData);
  }


  adminupdate(id: any, updatedData: any) {
    return this.http.put(`https://alora-plus.vercel.app/api/v1/doctor/${id}`, updatedData);
  }



   deleteNurse(id:any){
    return this.delete(superAdminEndPoints.nursesById + id )
   }

   deletePatient(id:any){
    return this.delete(superAdminEndPoints.leadupdate + id )

   }



   addpatientsForSuperAdmin(data: any) {
    const headers = new HttpHeaders({
        // 'Content-Type': 'multipart/form-data'  // Correct content type for file upload
  
        // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
  
    });
  
    return this.http.post(superAdminEndPoints.addpatients, data, { headers });
  }



   deletealot(id:any){
    return this.delete(superAdminEndPoints.allotById + id )
   }

   clockIn(nurseId: number,nurseName: any): Observable<any> {
    return this.post( superAdminEndPoints.clockInNurse , { nurseId, nurseName });
  }

  clockOut(nurseId: number,nurseName: any): Observable<any> {
    return this.post( superAdminEndPoints.clockOutNurse , { nurseId, nurseName });
  }

  clockStatus(){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.clockStatusForAdmin + adminId )
   }
   
   clockStatusPost(payload: any){
    return this.post(superAdminEndPoints.clockStatus,payload)
   }

   additionalServicePost(data: any){
    return this.post(superAdminEndPoints.addtionalservice,data)
   }

   addreportssss(data: any){
    return this.post(superAdminEndPoints.addreports,data)
   }

   

   additionalServiceGet(){
    return this.get(superAdminEndPoints.addtionalserviceGet)
   }


  //  showSuccess(p0: string) {
  //   this._tos.success('Hello World!', 'Toastr fun!');
  // }

  //  showSuccess(msg : string, status:string) {
  //   this._tos.success(msg, status,{
  //     positionClass : 'toast-top-center',
  //     progressBar: true,
  //     closeButton: true, // Show close button
  //     newestOnTop: true, 
  //   });
  // }
  // showError(msg: string, status: string) {
  //   this._tos.error(msg, status, {
  //     positionClass: 'toast-top-center',
  //     progressBar: true,
  //     closeButton: true,
  //     newestOnTop: true,
  //   });
  // }


  // addlead(data:any){
  //   return this.post(superAdminEndPoints.addleads, data)
  //  }

   
   addlead(data: any) {
    const headers = new HttpHeaders({
    });
    return this.http.post(superAdminEndPoints.addleads, data, { headers });
  }

   getleadss(){
    return this.get(superAdminEndPoints.getleads)
   }

   leadsttsusupdated(id:any, data:any){
    return this.patch(superAdminEndPoints.updateleadestatusleads + id , data)
   }


  
public leadData: any;


   leadupdate(id:any){
    return this.get(superAdminEndPoints.leadupdate + id )
   }

   caregivercreategetbyid(id:any){
    const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.caregivercreateids + adminId )
   }

   caregiverProfileViewForAdmin(id:any){
    // const adminId = localStorage.getItem('id');
    return this.get(superAdminEndPoints.caregivercreateids + id )
   }

   deleteCareGiver(id:any){
    return this.delete(superAdminEndPoints.caregivercreateids + id )
   }

   patientByID(id:any){
    const patientId = localStorage.getItem('patient_id');
    return this.get(superAdminEndPoints.leadupdate + patientId )
   }

   putleadupdate(id:any, data:any) {
    const headers = new HttpHeaders({
    });
  
    return this.http.put(superAdminEndPoints.leadupdatedata +id , data, { headers });
  }

  putcaregivercreateidsdata(id:any, data:any) {
    const headers = new HttpHeaders({
    });
  
    return this.http.put(superAdminEndPoints.caregivercreateidsdata + id , data, { headers });
  }


  verifyClientByNurse(id:any, data:any) {
    const headers = new HttpHeaders({
    });
  
    return this.http.put(superAdminEndPoints.verifyClientFromNurse + id , data, { headers });
  }

  



  createcaregiver(data: any) {
    const headers = new HttpHeaders({
    });
    return this.http.post(superAdminEndPoints.caregivercreate, data, { headers });
  }

  getcaregivers(){
    return this.get(superAdminEndPoints.caregiverget)
  }

  addPlansss(data: any) {
    const headers = new HttpHeaders({
    });
    return this.http.post(superAdminEndPoints.addPlans, data, { headers });
  }

 

  //  putleadupdate(id:any, data:any){
  //   return this.put(superAdminEndPoints.leadupdatedata + id ,data )
  //  }
   

   setLeadData(data: any) {
    this.leadData = data;
  }

  getLeadData() {
    return this.leadData;
  }

  getPlans(){
    return this.get(superAdminEndPoints.getPlans)
  }

 

  deletePlans(id:any){
    return this.delete(superAdminEndPoints.deletePlans + id)
  }

  getgetFacilitys(){
    return this.get(superAdminEndPoints.getFacility)
  }


  addFacilitys(data:any){
    return this.post(superAdminEndPoints.addFacility, data)
   }

   addfacilitycategorysss(data:any){
    return this.post(superAdminEndPoints.addfacilitycategorys, data)
   }

   getfacilitycategorysss(){
    return this.get(superAdminEndPoints.getfacilitycategorys)
  }

  
 

   addDocument(data: any) {
    const headers = new HttpHeaders({
    });
    return this.http.post(superAdminEndPoints.addDocument, data, { headers });
  }

  verifyClient(data:any){
    return this.patch(superAdminEndPoints.addDocument,data)
  }
  

 clientDocumentbyid(){
    const patientId = localStorage.getItem('patient_id');
    return this.get(superAdminEndPoints.getbyidclientDocumentactive + patientId )
   }


   clientDocumentbyidexpired(){
    const patientId = localStorage.getItem('patient_id');
    return this.get(superAdminEndPoints.getbyidclientDocumentexpire + patientId )
   }

   updateleadebyidss(id:any, data:any) {
    const headers = new HttpHeaders({
    });
    return this.http.put(superAdminEndPoints.updateleadebyid +id , data, { headers });
  }

  getDocumentByNurseId() {
    const nurseId = localStorage.getItem('caregiverid');
    return this.get(`${superAdminEndPoints.getDocumentByNurseId}${nurseId}`);
  }


  getDocumentByNurseIdArchivess() {
    const nurseId = localStorage.getItem('caregiverid');
    return this.get(`${superAdminEndPoints.getDocumentByNurseIdArchive}${nurseId}`);
  }
  

  getNurseDoc(id:any){
    return this.get(superAdminEndPoints.getDocumentByNurseId + id)
  }

  getclientdocumentbynurseids(id:any){
    return this.get(superAdminEndPoints.getclientdocumentbynurseid + id)
  }

  
  getClientDoc(id:any){
    return this.get(superAdminEndPoints.getbyidclientDocumentactive + id)
  }

  getClientDocexpiry(id:any){
    return this.get(superAdminEndPoints.getbyidclientDocumentexpire + id)
  }

  getNurseDocexpiry(id:any){
    return this.get(superAdminEndPoints.getDocumentByNurseIdArchive + id)
  }
  

  getNurseLeads(id:any){
    const nurseId = localStorage.getItem('caregiverid');
    return this.get(superAdminEndPoints.nurseLeads + nurseId)
  }

  addCertificate(data:any){
    const headers = new HttpHeaders({
    });
    return this.http.post(superAdminEndPoints.certificate , data , { headers });
    // return this.post(superAdminEndPoints.certificate,data)
  }

  getCertificate(){
   return this.get(superAdminEndPoints.certificateGet)
  }

}
