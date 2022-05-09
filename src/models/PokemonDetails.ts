import Pokemon from "./Pokemon";
import Stats from "./Stats";

export default interface PokemonDetails extends Pokemon {
  stats: Array<Stats>; //przetrzymać staty (effort, base_stats, name) 1. element to te 3 informacje czyli zrobic interfejs??  
  avatar: string;
  sprites?: Array<string>; //nie potrzeba
  weight?: number; //waga 
  moves?: Array<string>; // za duzo danych
  base_experience: number; // loading bar 608 -> do 700dać https://pokemondb.net/pokebase/175767/what-non-legendary-pokemon-has-the-highest-base-exp-yield
  color?:string;
}
