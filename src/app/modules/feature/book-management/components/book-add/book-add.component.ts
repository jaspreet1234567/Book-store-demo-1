import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/modules/core/models/api-response.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.bookService.AddBook(this.bookForm.value).subscribe((response: ApiResponse) => {
      if (response.isSuccess) {
        this.router.navigate(['/book/list']);
      }
    });
  }
}
