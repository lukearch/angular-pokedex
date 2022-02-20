import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private titleHandler: Title
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  public capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  get getPokemon() {
    const name = this.activatedRoute.snapshot.params['name'];
    const pokemon = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${name}`
    );
    const species = this.pokeApiService.apiGetPokemon(
      `${this.urlSpecies}/${name}`
    );

    return forkJoin([pokemon, species]).subscribe(
      (res: any) => {
        this.pokemon = res;
        this.titleHandler.setTitle(
          `Pokedex | ${this.capitalizeFirstLetter(this.pokemon[0].name)}`
        );
        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }
}
