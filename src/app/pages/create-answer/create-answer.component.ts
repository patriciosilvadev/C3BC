import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer.model';
import { AnswerService } from 'src/app/shared/services/answer/answer.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { QuillModule } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js'

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.css']
})
export class CreateAnswerComponent implements OnInit {
  answerFormGroup: FormGroup;
  categoriesObservable: Observable<Category[]>;
  richEditorConfig: QuillModule;
  useCustomInvalidClass: boolean;
  @ViewChild('answerName') answerNameInputElement: ElementRef;

  constructor(
    private _answerService: AnswerService,
    private _notificationService: NotificationService,
    private _router: Router,
    categoryService: CategoryService,
    formBuilder: FormBuilder
  ) {
    this.categoriesObservable = categoryService.readCategories();

    this.answerFormGroup = formBuilder.group({
      name: [ , Validators.required],
      categories: [ , Validators.required],
      content: [ , Validators.required]
    })

    this.richEditorConfig = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],            // botões toggle
          ['link'],
          ['code-block'],
          // [{ 'indent': '-1'}, { 'indent': '+1' }],
          ['clean'],                                  // botão para remover formatação
          ['emoji']
        ]
      },
      "emoji-shortname": true,
      "emoji-textarea": false,
      "emoji-toolbar": true,
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Usar setTimeout evita problemas com detecção de mudanças. Essa técnica é documentada aqui: https://angular.io/guide/component-interaction#!#parent-to-view-child
    setTimeout(() => this.answerNameInputElement.nativeElement.focus(), 0);
  }

  createAnswer() {
    const categoryIDs = this.answerFormGroup.value.categories?.map( category => category.id )
    const newAnswer: Omit<Answer, "id"> = { name: this.answerFormGroup.value.name, content: this.answerFormGroup.value.content, categoryIDs }

    this._answerService.createAnswer(newAnswer)
      .then(() => {
        this._router.navigate(["/home"]);
        this._notificationService.notify('Resposta adicionada com sucesso.')
      })
      .catch(error => this._notificationService.notify(error, 7, 'top'));
  }

  onSelectionChanged = (event) =>{
    if(event.range == null){
      this.onBlur();
    }
  }

  onBlur = () =>{
    this.useCustomInvalidClass = true;
  }
}
