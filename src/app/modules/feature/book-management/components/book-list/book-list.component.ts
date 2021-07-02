import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiResponse } from 'src/app/modules/core/models/api-response.interface';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  modalRef: BsModalRef;

  toBeDeleteBookId: number;
  toBeDeleteBookIndex: number;

  bookList: Book[] = [];

  constructor(
    private bookService: BookService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.loadBookList();
  }

  loadBookList(): void {
    this.bookService.GetBooks().subscribe((response: ApiResponse) => {
      if (response.isSuccess && response.data) {
        this.bookList = response.data;
      }
    },
      (err) => {
        console.log(err);
      },
      () => {

      });
  }

  delete(id: number, index: number): void {
    this.bookService.deleteBook(id).subscribe((res: ApiResponse) => {
      if (res && res.isSuccess) {
        this.bookList.splice(index, 1);
      }
    });
  }

  openConfirmationModal(id: number, index: number, template: TemplateRef<any>) {
    this.toBeDeleteBookId = id;
    this.toBeDeleteBookIndex = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.delete(this.toBeDeleteBookId, this.toBeDeleteBookIndex);
  }

  decline(): void {
    this.modalRef.hide();
  }
}
