import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Answer } from 'src/app/shared/models/answer.model';
import { AnswerService } from 'src/app/shared/services/answer/answer.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAnswerDialogComponent } from '../delete-answer-dialog/delete-answer-dialog.component';
import { Router } from '@angular/router';
import { ScriptContextService } from 'src/app/shared/services/scriptContext/script-context.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-answers-tab',
  templateUrl: './answers-tab.component.html',
  styleUrls: ['./answers-tab.component.css']
})
export class AnswersTabComponent implements OnInit {
  private _contentScriptJustClosedSubscription: Subscription;
  tooltipShowDelay = new FormControl(1000);
  answersObservable: Observable<Answer[]>;
  step = 0;

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _changeDetector: ChangeDetectorRef,
    private _domSanitizer: DomSanitizer,
    public scriptContext: ScriptContextService,
    public searchService: SearchService,
    answerService: AnswerService,
  ) {
    this.answersObservable = answerService.readAnswers();
  }

  ngOnInit(): void {
    // sempre que o usuário fechar contentScript, a seleção voltará para a primeira resposta
    if(this.scriptContext.isContentScript) {
      this._contentScriptJustClosedSubscription = this.scriptContext.C3BCDialogJustClosed.subscribe( () => {
        this.step = 0;

        // como as mudanças partem de um outro contexto, é necessário que forcemos a detecção de mudanças, para que haja também atualização no template
        this._changeDetector.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this._contentScriptJustClosedSubscription?.unsubscribe();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextAnswer() {
    this.step++;
  }

  prevAnswer() {
    this.step--;
  }

  openDialog(answerID: string) {
    this._dialog.open(DeleteAnswerDialogComponent, {data: {answerID}});
  }

  navigateToEditAnswer(answer: Answer) {
    //Aqui, estamos navegando e mandando dados para a página chamada
    this._router.navigate(["/home/edit-answer"], {state: {answer}});
  }

  // ajuda a prevenir erros de Cross Site Scripting Security (XSS) ao limpar os valores para serem seguros para uso
  byPassHTML(html: string) {
    return this._domSanitizer.bypassSecurityTrustHtml(html);
  }
}
