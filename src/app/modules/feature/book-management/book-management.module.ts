import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookManagementRoutingModule } from './book-management-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookEditComponent } from './components/book-edit/book-edit.component';


@NgModule({
  declarations: [BookListComponent, BookAddComponent, BookEditComponent],
  imports: [
    CommonModule,
    BookManagementRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookManagementModule { }
