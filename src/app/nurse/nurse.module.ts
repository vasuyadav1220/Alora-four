import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { ViewPatientComponent } from './pages/view-patient/view-patient.component';
import { NurseHomeComponent } from './pages/nurse-home/nurse-home.component';
import { NurseDashboardComponent } from './pages/nurse-dashboard/nurse-dashboard.component';
import { NursePatientComponent } from './shared/nurse-patient/nurse-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPatientDetailsComponent } from './pages/view-patient-details/view-patient-details.component';
import { NurseAloteViewComponent } from './pages/nurse-alote-view/nurse-alote-view.component';
import { ViewReportComponent } from './pages/view-report/view-report.component';
import { AddReportComponent } from './shared/add-report/add-report.component';
import { DocumentComponent } from './document/document.component';


@NgModule({
  declarations: [
    NurseComponent,
    ViewPatientComponent,
    NurseHomeComponent,
    NurseDashboardComponent,
    NursePatientComponent,
    ViewPatientDetailsComponent,
    NurseAloteViewComponent,
    ViewReportComponent,
    AddReportComponent,
    DocumentComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NurseModule { }
