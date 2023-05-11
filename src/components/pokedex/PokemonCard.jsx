import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const PokemonCard = ({pokemonUrl}) => {

    console.log(pokemonUrl)

    const [pokemonCard, setPokemonCard] = useState()

    const gradientByType = {
        grass: "from-[#66E72A] to-[#1ED61B]",
        electric: "from-myyellow to-myorange",
        fire: "from-[#F56802] to-[#FF3A3A]",
        water: "from-[#2ADBE7] to-[#22B3F1]",
        plant: "from-[#AB7728] to-[#7C3111]",
        normal: "from-[#2A97E7] to-[#1B71D6]",
        bug: "from-[#2AE78C] to-[#1BD665]",
        ground: "from-[#F5B102] to-[#FF8D3A]",
        rock: "from-[#8B8B8B] to-[#6E6E6E]",
        dark: "from-[#374AF1] to-[#4102F5]",
        psychic: "from-[#F1D53F] to-[#F3BB29]",
        poison: "from-[#B602F5] to-[#6737F1]",
        dragon: "from-[#FF3A69] to-[#F5021F]",
        fighting: "from-[#D69243] to-[#BA7A30]",
        flying: "from-[#94D6F2] to-[#63BEE4]",
        ice: "from-[#49CEC6] to-[#52AFCD]",
        fairy: "from-[#FF3AEB] to-[#F502A3]",
        steel: "from-[#718A93] to-[#5D7177]",
        ghost: "from-[#B7C9CD] to-[#8FB4BD]",
    }
    
    useEffect(() => {
        axios
        .get(pokemonUrl)
        .then(res => setPokemonCard(res.data))
        .catch(err => console.log(err))
    },[])

  return (
    <Link to={`/pokedex/${pokemonCard?.id}`} className={`bg-gradient-to-r ${gradientByType[pokemonCard?.types[0].type.name]} p-3 ${pokemonCard?.sprites.other.home["front_default"] ? 'overflow-visible' : 'overflow-hidden' } relative overflow-hidden rounded-[7px] md:h-[170px] capitalize hover:scale-[0.95] hover:transition-colors duration-500`}>
            <div>
              <p className='font-highlight font-bold text-myblack'>#{pokemonCard?.id}</p>
              <h1 className='font-title text-white'>{pokemonCard?.species.name}</h1>
              <div>
                <img src="" alt="" />
                <p className='font-highlight font-bold text-white'>{pokemonCard?.types[0].type.name}</p>
              </div>
            </div>
                {
                    pokemonCard?.sprites.other.home["front_default"] ? (
                    <div className='absolute bottom-0 right-0 md:-bottom-4'>
                        <img className="h-[120px]" src={pokemonCard?.sprites.other.home["front_default"]} alt="" />
                    </div>
                    ) : (
                    <div className='absolute top-[50%] translate-y-[-50%] right-0 md:translate-y-[10%] md:-right-1'>
                        <img className="h-[150px] w-auto md:h-[118px]" src="/img/pokeball-card.svg" alt="" />
                  </div>
                  )
                    
                }
            
          </Link>
  )
}

export default PokemonCard