import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {MediumsComponent} from "./mediums/mediums.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {Role} from "./_models/Role";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ClientsComponent} from "./clients/clients.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ConsultationsComponent} from "./consultations/consultations.component";
import {CurrentConsultationComponent} from "./current-consultation/current-consultation.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee, Role.Client]},
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mediums',
    component: MediumsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee, Role.Client]},
    children: [
      {
        path: ':id',
        component: MediumsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Employee, Role.Client]},
      }
    ]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },
  {
    path: 'stats',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee, Role.Client]}
  },
  {
    path: 'users/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee, Role.Client]} // TODO: change to Employee only
  },
  {
    path: 'consultations/current',
    component: CurrentConsultationComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]},
  },
  {
    path: 'consultations',
    component: ConsultationsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee, Role.Client]},
    children: [
      {
        path: ':id',
        component: ConsultationsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Employee, Role.Client]},
      },
      {
        path: 'user/:id',
        component: ConsultationsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Employee]},
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
