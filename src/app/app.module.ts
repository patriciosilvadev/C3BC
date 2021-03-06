import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from "src/environments/environment";

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AnswersTabComponent } from './components/answers-tab/answers-tab.component';
import { CategoriesTabComponent } from './components/categories-tab/categories-tab.component';
import { HeaderComponent } from './components/header/header.component';
import { DeleteAnswerDialogComponent } from './components/delete-answer-dialog/delete-answer-dialog.component';
import { DeleteCategoryDialogComponent } from './components/delete-category-dialog/delete-category-dialog.component';
import { CreateAnswerComponent } from './pages/create-answer/create-answer.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { EditAnswerComponent } from './pages/edit-answer/edit-answer.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { SearchComponent } from './components/search/search.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { QuillModule } from 'ngx-quill'

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnswersTabComponent,
    CategoriesTabComponent,
    HeaderComponent,
    DeleteAnswerDialogComponent,
    DeleteCategoryDialogComponent,
    CreateAnswerComponent,
    CreateCategoryComponent,
    EditAnswerComponent,
    EditCategoryComponent,
    SearchComponent
  ],
  imports: [
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
