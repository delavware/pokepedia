import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {

  const bgByStat = {
    hp: "bg-[#3E85FA]", 
    attack: "bg-[#FF1E38]",
    "special-attack": "bg-[#FF1E38]",
    defense: "bg-[#F5CE02]",
    "special-defense": "bg-[#F5CE02]",
    speed: "bg-[#59FF60]"
}

  const [pokemon, setPokemon] = useState()
  const [pokemonSpecies, setPokemonSpecies] = useState()
  
  const {id} = useParams()
  

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios
    .get(URL)
    .then(res => setPokemon(res.data))
    .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`

    axios
    .get(URL)
    .then(res => setPokemonSpecies(res.data))
    .catch(err => console.log(err))
  }, [])

  const getPercentage = (stat_base) => {
    const progressBar = Math.floor((stat_base * 100) /255)
    return `${progressBar}%`
  }
  
  return (
    <div className="lg:bg-[url('/img/pokeball-background.svg')] lg:bg-cover lg:object-cover lg:bg-center lg:bg-fixed min-h-screen md:grid lg:place-content-center lg:grid-cols-[1fr]">
      <div className='lg:bg-white lg:border-[#f0f0f0] lg:border-2 lg:max-w-[1000px] lg:m-auto lg:rounded-xl lg:grid lg:w-full lg:mt-14 lg:mb-14  '>
        <Header />
        <main className=' grid container md:grid-cols-[1fr,0.2fr,3fr,3fr] md:auto-rows-auto md:gap-x-6 pb-8'>
       
        <article className='mt-4 md:mt-10 gap-4 grid md:col-start-3 md:grid-rows-[auto,1fr] capitalize'>
          <div className='bg-gradient-to-b from-myblue to-myoceanblue h-[220px] rounded-[7px] relative overflow-hidden'>
              <section className='absolute top-0 text-white text-center left-1/2 -translate-x-1/2 mt-2'>
                <h1 className='font-title  text-xl'>{pokemon?.name}</h1>
                <span className='mx-auto'>{pokemonSpecies?.genera[8].genus}</span> 
              </section>
              <div className='absolute bottom-3 left-3 font-highlight font-bold grid gap-1'>
                <span className='text-white '>{pokemon?.types[0].type.name}</span>
                <span className='bg-white px-3 py-1 text-sm rounded-full text-myblack '># {pokemon?.id}</span>
               
              </div>
              <img className="absolute -bottom-2 left-1/2 -translate-x-1/2" src="/img/waves.svg" alt="" />
              <img className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[150px]" src={pokemon?.sprites.other.home["front_default"] ? pokemon?.sprites.other.home["front_default"] : '/img/pokeball-card.svg'} alt="" />
            
          </div>

          <p className='bg-gradient-to-r from-myred to-myfuchsia text-white font-text text-justify p-4 rounded-[7px] h-fit'>
              {pokemonSpecies?.form_descriptions[0]?.description ? (
              pokemonSpecies?.form_descriptions[0]?.description) : 
              pokemonSpecies?.flavor_text_entries[3]?.flavor_text ? (
                pokemonSpecies?.flavor_text_entries[3]?.flavor_text) :
                <span className='text-center block font-bold'>No info available</span>
              }
          </p>
          
            
          
        </article>
        <section className='mt-4 md:mt-10 capitalize'>
          <h1 className='bg-myblack text-white p-1 rounded-[7px] text-center font-title'>Stats</h1>
          <section className='mt-4 grid gap-3 text-sm'>
           {
            pokemon?.stats.map(stat => (
              <div key={stat.stat.name} className=' font-highlight font-bold grid grid-cols-[auto,1fr,auto] gap-x-3 items-center'>
                <span className='w-fit text-myblack '>{(stat.stat.name)}</span>
                <div className='bg-mygray rounded-full w-full h-5 overflow-hidden'>
                  <span style={{'width': getPercentage(stat.base_stat)}} className={`block ${bgByStat[stat.stat.name]} h-5`}></span>
                </div>
                <span className=' text-myblack'>{stat.base_stat}/255</span>
              </div>
            ))
           }
          </section>
        </section>
      </main>
      </div>
      
    </div>
  )
}

export default PokemonId