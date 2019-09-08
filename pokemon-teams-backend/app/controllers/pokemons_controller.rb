class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.create(
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name,
        )
        pokemon.trainer_id = params[:trainer_id]
        if pokemon.save
            render json: pokemon
        else
            puts "Pokemon failed to save!"
        end
    end

    def destroy
        Pokemon.find(params[:id]).destroy
    end
end
