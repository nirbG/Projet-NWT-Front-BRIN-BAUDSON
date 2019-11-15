import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ComicsComponent} from "./comics/comics.component";
import {ComicsDetailComponent} from "./comics-detail/comics-detail.component";
import {HerosComponent} from "./heros/heros.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {UpdateComicsComponent} from "./update/update-comics/update-comics.component";
import {UpdateHeroComponent} from "./update/update-hero/update-hero.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'comics/:isbn', component: ComicsDetailComponent },
  { path: 'comicsEdit/:isbn', component: UpdateComicsComponent },
  { path: 'heros', component: HerosComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'heroEdit/:id', component: UpdateHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
