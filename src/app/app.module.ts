import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './core/home/home.component';
import { InvocedetailComponent } from './core/invocedetail/invocedetail.component';
import { RatetermsComponent } from './core/rateterms/rateterms.component';
import { CostsComponent } from './core/costs/costs.component';
import { OperationresultComponent } from './core/operationresult/operationresult.component';
import { AppbarComponent } from './shared/appbar/appbar.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvocedetailComponent,
    RatetermsComponent,
    CostsComponent,
    OperationresultComponent,
    AppbarComponent,
    AuthenticationComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
