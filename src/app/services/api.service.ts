import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async obtenerDatos(url: string){
    
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4a477b8114msh330295ddd9db064p1321e0jsn9f6a828c1df7',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        mode: 'no-cors'
	}
    };

try {
	const response = await fetch(url, options);
    const juego = await response.json();
  return juego;
} catch (error) {
	console.error(error);
}
}

filtrarPlataforma(plataforma: string)
{
    return this.obtenerDatos(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${plataforma}`);
}

filtrarGenero (genero: string)
{
    return this.obtenerDatos(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genero}`);
}

descripcionJuego (id: number)
{
    return this.obtenerDatos (`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`);
}

ordenarJuegos(ordenarPor: string)
{
    //release-date, popularity, alphabetical or relevance
    //Usar el filtro de popularity para devolver los juegos mas populares
    return this.obtenerDatos (`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${ordenarPor}`);
}

ordenarPersonalizado (genero: string, plataforma: string, sort: string)
{
    if(plataforma != " ")
    {
        if(genero != " ")
        {
            if(sort != " ")
            { 
                return this.obtenerDatos(`https://www.freetogame.com/api/games?platform=${plataforma}&category=${genero}&sort-by=${sort}`);
            }
            else
            {
                return this.obtenerDatos (`https://www.freetogame.com/api/filter?tag=${genero}&platform=${plataforma}`);
            }
        }
        else if (sort != " ")
        {
            return this.obtenerDatos(`https://www.freetogame.com/api/games?platform=${plataforma}&sort-by=${sort}`);
        }
        else
        {
            return this.filtrarPlataforma(plataforma);
        }
    }
    else 
    {
        if(sort != " ")
        {
            return this.obtenerDatos(`https://www.freetogame.com/api/games?category=${genero}&sort-by=${sort}`);
        }
        else
        {
            return this.filtrarGenero(genero);
        }
    }
    //return this.obtenerDatos (`https://www.freetogame.com/api/filter?tag=${filtro}&platform=${plataforma}&sort-by=${sort}`);
}
}
