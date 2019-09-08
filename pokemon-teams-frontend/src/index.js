const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetchCard()

const $ = {
    main: document.querySelector('main'),
}

function fetchCard(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(renderAllCards)
}

function renderAllCards(cardInfo) {
    cardInfo.forEach(renderCard)
}
function renderCard(trainer) {
    let eachCard = document.createElement('div')
    eachCard.setAttribute('class', 'card')
    let trainerName = getTrainerName(trainer.name)
    let pokemonList = getPokemonList(trainer.pokemons)
    let newButton = newPokemonButton(trainer.id)
    eachCard.append(trainerName, pokemonList, newButton)
    $.main.append(eachCard)
}

function getTrainerName(trainer){
    let trainerName = document.createElement('h2')
    trainerName.innerText = trainer
    return trainerName
}

function getPokemonList(pokemons) {
    let caughtPokemon = document.createElement('ul')
    pokemons.forEach( pokemon => {
        let eachPokemon = document.createElement('li')
        eachPokemon.textContent = pokeName(pokemon)
        eachPokemon.appendChild(releaseButton(pokemon.id))
        caughtPokemon.append(eachPokemon)
    })
    return caughtPokemon
}

function pokeName(pokemon){
    return `${pokemon.nickname} the ${pokemon.species}`
}

function newPokemonButton(id){
    let newButton = document.createElement('button')
    newButton.innerText = "Add Pokemon"
    newButton.addEventListener('click', () => {
        let ul = event.target.previousElementSibling
        appendPokemon(ul, id)
    })
    return newButton
}

function appendPokemon(caughtPokemon, id) {
    fetch(POKEMONS_URL, {
        'method': "POST",
        'headers': {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        'body': JSON.stringify({
            'trainer_id': id
        })
    })
    .then(response => response.json())
    .then(pokemon => addPokemon(caughtPokemon, pokemon))
}

function addPokemon(caughtPokemon, pokemon) {
    let li = document.createElement('li')
    li.innerText = pokeName(pokemon)
    li.appendChild(releaseButton(pokemon.id))
    caughtPokemon.appendChild(li)
}

function releaseButton(id) {
    let button = document.createElement('button')
    button.textContent = "Release!"
    button.setAttribute('class', 'release')
    button.addEventListener('click', () => {
        releasePokemon(event.target.parentElement, id)
    })
    return button
}

function releasePokemon(li, pokemon_id) {
    console.log(pokemon_id)
    fetch(`${POKEMONS_URL}/${pokemon_id}`, {'method':'DELETE'})
    .then(li.remove())
}