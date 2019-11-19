import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ComicsComponent} from "./comics/comics.component";
import {ComicsDetailComponent} from "./comics-detail/comics-detail.component";
import {HerosComponent} from "./heros/heros.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {UpdateComicsComponent} from "./update/update-comics/update-comics.component";
import {UpdateHeroComponent} from "./update/update-hero/update-hero.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {MaBDthequeComponent} from "./ma-bdtheque/ma-bdtheque.component";
import {MesEnvieComponent} from "./mes-envie/mes-envie.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'comics/:isbn', component: ComicsDetailComponent },
  { path: 'comicsEdit/:isbn', component: UpdateComicsComponent },
  { path: 'heros', component: HerosComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'heroEdit/:id', component: UpdateHeroComponent },
  { path: 'maBDtheque', component: MaBDthequeComponent },
  { path: 'mesEnvie', component: MesEnvieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
