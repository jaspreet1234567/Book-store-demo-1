import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestHeadersService } from './interceptors/request-headers.service';


@NgModule({
  declarations: [HeaderBarComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreRoutingModule
  ],
  exports: [
    HeaderBarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHeadersService,
      multi: true
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule { }
