import axios, { AxiosInstance } from "axios";

class pokemonApi{
    protected api: AxiosInstance = axios.create({ baseURL:"https://pokeapi.co/api"});

    // export function fetchPokemons() 
    // {
    //   return axios.get("/v2/pokemon/");
    // }
   public async getPokemons() {
      const response = await this.api.get<any>("/v2/pokemon"); //domyślnie Pokemon[]
      return response;
   }
   
   public async getPokemon(id:number) {
      const response = await this.api.get<any>(`/v2/pokemon/${id}`); //domyślnie Pokemon
      return response;
   }


}

export default pokemonApi;

  
