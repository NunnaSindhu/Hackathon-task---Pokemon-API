// create html elements using dom

document.body.innerHTML = `
<header><h1>POKEMON API</h1></header><br>
<div class="input-container">
<input type="search" class="search-box" placeholder="Search here for pokemon..."><br><br>
<button class="searchbtn">Search</button>
<button class="clearbtn">Clear</button>
</div>
<div class="main-container">  
</div>
`;

//DOM Objects
//select the element to display the results
const displayResult = document.querySelector(".main-container");

//select the input element for search
const searchInput = document.querySelector(".search-box");
const searchButton = document.querySelector(".searchbtn");

//clear the search results
const clearButton = document.querySelector(".clearbtn");

//get data from pokemon api
const getData = async () => {
  try {
    let pokemondata = [];
    let resultData;
    for (let id = 1; id <= 50; id++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      resultData = await response.json();     
      displayPokemon(resultData);
      pokemondata.push(resultData);
    }
    return pokemondata;
  } catch (error) {
    displayResult.innerHTML= error;
  }
};

//create displayPokemon function

const displayPokemon = (resultData) => {
  let pokeAbility = resultData.abilities;
  let pokeMove = resultData.moves;
  displayResult.innerHTML += `
    <div class="container">
    <div class="card" style="width: 18rem;">
      <img src="${
        resultData.sprites.front_default
      }" class="card-img-top" alt="pokemon front image" />   
      <img src="${
        resultData.sprites.back_default
      }" class="card-img-top" alt="pokemon front image" />  
      <div class="card-body">
        <h5 class="card-title">${(resultData.name).charAt(0).toUpperCase() + resultData.name.slice(1)}</h5>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Abilities: ${
          pokeAbility[0] && pokeAbility[1]
            ? `${pokeAbility[0].ability.name}, ${pokeAbility[1].ability.name}`
            : "none"
        }</li>
        <li class="list-group-item">Moves: ${pokeMove[0].move.name}, ${
    pokeMove[1].move.name
  }</li>
        <li class="list-group-item">Weight: ${resultData.weight}</li>
      </ul>        
      </div>
    </div>
    </div>
    `;
    
};

// Logic for search functionality
searchButton.addEventListener("click", async () => {
  let pokemondata = await getData();  
  let enteredText = searchInput.value;
  let filteredPokemon = [];
  if (enteredText != " ") {
    //logic for filter the pokemon data
    filteredPokemon = pokemondata.filter((pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(enteredText.toLocaleLowerCase())
    );
  }
  displayResult.innerHTML = "";
  filteredPokemon.map((data) => displayPokemon(data));
});

//Logic to clear the search results
clearButton.addEventListener("click", () => {
  searchInput.value = "";
   displayResult.innerHTML="";
  displayPokemon(getData());
});
getData();
