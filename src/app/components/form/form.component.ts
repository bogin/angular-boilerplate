import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validInteger } from 'src/app/form-validaors/integer.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardSize: ['', [Validators.required, Validators.min(1), validInteger()]],
      totalBombs: ['', [Validators.required, Validators.min(1), validInteger()]]
    });
  }

  onSubmit() {
    if (this.boardForm?.valid) {
    }
  }
}
