import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ComicsComponent } from './comics/comics.component';
import { CardComicsComponent } from './card-comics/card-comics.component';
import { ListComicsComponent } from './list-comics/list-comics.component';
import {CardComicsSnackBarComponent} from "./snackBar/card-comics-snack-bar/card-comics-snack-bar.component";
import {
    MAT_SNACK_BAR_DATA,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatMenuModule, MatSnackBarModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import { ComicsDetailComponent } from './comics-detail/comics-detail.component';
import { CarrouselHerosComponent } from './carrousel-heros/carrousel-heros.component';
import {NguCarouselModule} from "@ngu/carousel";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ComicsComponent,
    CardComicsComponent,
    ListComicsComponent,
    CardComicsSnackBarComponent,
    ComicsDetailComponent,
    CarrouselHerosComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        HttpClientModule,
        NguCarouselModule
    ],
  providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }],
  bootstrap: [AppComponent],
    entryComponents:[CardComicsSnackBarComponent]
})
export class AppModule { }
