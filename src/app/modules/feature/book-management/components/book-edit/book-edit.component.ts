import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/modules/core/models/api-response.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getBookDetail();
  }

  initForm(): void {
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  getBookDetail(): void {
    this.bookService.GetBook(this.getId).subscribe((res:ApiResponse) => {
      if (res && res.isSuccess) {
        this.updateForm.setValue({
          name: res.data['name'],
          price: res['data']['price'],
          description: res['data']['description']
        });
      }
    });
  }

  onUpdate(): any {
    this.bookService.updateBook(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.router.navigateByUrl('/book/list');
      }, (err) => {
        console.log(err);
      });
  }
}
