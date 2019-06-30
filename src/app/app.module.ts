import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AboutComponent} from './about/about.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBar,
  MatSnackBarContainer,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {HomeComponent} from './home/home.component';
import {MediumsComponent} from './mediums/mediums.component';
import {PageHeaderComponent} from './_components/page-header/page-header.component';
import {LoginComponent} from './login/login.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminComponent} from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {WithCredentialsInterceptor} from "./_helpers/with-credentials-interceptor";
import {AlertComponent} from './_components/alert/alert.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ClientsComponent} from './clients/clients.component';
import {FilterByPipe} from './_pipes/filter-by.pipe';
import { ModalMediumComponent } from './mediums/modal-medium/modal-medium.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {AgmCoreModule} from "@agm/core";
import { CapitalizePipe } from './_pipes/capitalize.pipe';
import { ConsultationsComponent } from './consultations/consultations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BarChartComponent } from './_components/bar-chart/bar-chart.component';
import { TimeAgoPipe } from './_pipes/time-ago.pipe';
import { ModalConsultationComponent } from './consultations/modal-consultation/modal-consultation.component';
import { TalentPipe } from './_pipes/talent.pipe';
import { CurrentConsultationComponent } from './current-consultation/current-consultation.component';

@NgModule({
  entryComponents: [
    ModalMediumComponent,
    ModalConsultationComponent,
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    MediumsComponent,
    PageHeaderComponent,
    LoginComponent,
    AdminComponent,
    AlertComponent,
    PageNotFoundComponent,
    ClientsComponent,
    FilterByPipe,
    ModalMediumComponent,
    ProfileComponent,
    RegisterComponent,
    CapitalizePipe,
    ConsultationsComponent,
    StatisticsComponent,
    BarChartComponent,
    TimeAgoPipe,
    ModalConsultationComponent,
    TalentPipe,
    CurrentConsultationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    AgmCoreModule.forRoot({
      apiKey: '*****'
    }),
    MatChipsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule,
    MatSnackBar,
    {provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}

    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
