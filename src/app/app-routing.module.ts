import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ComicsComponent} from "./comics/comics.component";
import {ComicsDetailComponent} from "./comics-detail/comics-detail.component";
import {HerosComponent} from "./heros/heros.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {UpdateComponent} from "./update/update.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'comics/:isbn', component: ComicsDetailComponent },
  { path: 'comicsEdit/:id', component: UpdateComponent },
  { path: 'heros', component: HerosComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
