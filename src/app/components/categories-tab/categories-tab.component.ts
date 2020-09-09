import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category, CategoryWithAnswers } from 'src/app/shared/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { Router } from '@angular/router';
import { ScriptContextService } from 'src/app/services/scriptContext/script-context.service';

@Component({
  selector: 'app-categories-tab',
  templateUrl: './categories-tab.component.html',
  styleUrls: ['./categories-tab.component.css']
})
export class CategoriesTabComponent implements OnInit {
  private _contentScriptJustClosedSubscription: Subscription;
  categoriesWithAnswersObservable: Observable<Observable<CategoryWithAnswers>[]>
  step = 0;

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _changeDetector: ChangeDetectorRef,
    public scriptContext: ScriptContextService,
    categoryService: CategoryService
  ) {
    this.categoriesWithAnswersObservable = categoryService.readCategoriesWithAnswers();
  }

  ngOnInit(): void {
    // sempre que o usuário fechar contentScript, a seleção voltará para a primeira categoria
    if(this.scriptContext.isContentScript) {
      this._contentScriptJustClosedSubscription = this.scriptContext.contentScriptJustClosed.subscribe( () => {
        this.step = 0;

        // como as mudanças partem de um outro contexto, é necessário que forcemos a detecção de mudanças, para que haja também atualização no template
        this._changeDetector.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this._contentScriptJustClosedSubscription?.unsubscribe()
  }

  setStep(index: number) {
    this.step = index;
  }

  nextCategory() {
    this.step++;
  }

  prevCategory() {
    this.step--;
  }

  // provisório
  openDialog(categoryObservable: Observable<CategoryWithAnswers>) {
    categoryObservable.pipe(
      take(1),
      tap( (category: CategoryWithAnswers) => {
        this._dialog.open(DeleteCategoryDialogComponent, {data: {categoryID: category.id}});
      })
    ).subscribe()
  }

  navigateToEditCategory(categoryObservable: Observable<Category>) {
    categoryObservable.pipe(take(1)).subscribe( category => {
      this._router.navigate(["/home/edit-category"], {state: {category}})
    })
  }
}
