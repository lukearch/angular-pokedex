import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlSpecies: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const name = this.activatedRoute.snapshot.params['name'];
    const pokemon = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${name}`
    );
    const species = this.pokeApiService.apiGetPokemon(
      `${this.urlSpecies}/${name}`
    );

    return forkJoin([pokemon, species]).subscribe((res: any) => {
      this.pokemon = res;
    });
  }
}
