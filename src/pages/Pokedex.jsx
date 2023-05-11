import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/pokedex/Header'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [selectSize, setSelectSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const input = useRef(null)

  function handleFocus() {
    setSelectSize(10);
  }

  function handleBlur() {
    setSelectSize(1);
  }

  function handleChange() {
    setSelectSize(1);
    // Do any other necessary processing on select change here.
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value) 

  }

  const filterByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

  const pagination = () => {
    const POKEMONS_PER_PAGE = 12

    const sliceStart = (currentPage - 1 ) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonsInPage = filterByName.slice(sliceStart,sliceEnd)

    const lastPage = Math.ceil(filterByName.length /POKEMONS_PER_PAGE) || 1

    const PAGES_PER_BLOCK = 5
    const currentBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //Pages to show in current block
    const pagesInBlock = []
    const starPageInBlock = (currentBlock - 1) * PAGES_PER_BLOCK + 1
    const endPageInBlock = currentBlock * PAGES_PER_BLOCK

    for (let i= starPageInBlock; i <= endPageInBlock; i++) {
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }

    return {pokemonsInPage, lastPage, pagesInBlock}
  }

  const{lastPage,pagesInBlock,pokemonsInPage} = pagination()

  const handlePrev = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >=1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(()=> {
    if(!currentType){
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

    axios
    .get(URL)
    .then(res => setPokemons(res.data.results))
    .catch(err => console.log(err))
    }
  },[currentType])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'

    axios
    .get(URL)
    .then(res => {
      const typesMaped = res.data.results.map(type => type.name)
      setTypes(typesMaped)
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
  
      axios
      .get(URL)
      .then(res => {
        const pokemonsSelectedByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
        setPokemons(pokemonsSelectedByType)
      })
      .catch(err => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])
  
  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  }, [currentType])
  
  useEffect(() => {
    if (currentType){
      setCurrentType("")
      input.current.value = ""
    }
  }, [pokemonName])
  
  
  

  return (
    <div className="lg:bg-[url('/img/pokeball-background.svg')] lg:bg-cover lg:object-cover lg:bg-center lg:bg-fixed min-h-screen md:grid lg:place-content-center lg:grid-cols-[1fr]">
      <div className='lg:bg-white lg:border-[#f0f0f0] lg:border-2 lg:max-w-[1000px] lg:m-auto lg:rounded-xl lg:grid lg:w-full lg:mt-14 lg:mb-14'>
        <Header />
        <main className='grid container md:grid-cols-[1fr,0.2fr,3fr,3fr] md:gap-x-6 pb-8'>
        <form onSubmit={handleSubmit} className='mt-4 md:col-start-3 md:col-span-2'>
          <div className='relative '>
            <img src="/img/search.svg" alt="" className='absolute top-3 left-2'/>
            <input ref={input} id="pokemonName" type="text" className='bg-mygray py-2 px-8 w-full rounded-[7px]' placeholder='Search for your Pokemon...'/>
          </div>
        </form>
        <aside className='mt-4 grid grid-cols-[auto,1fr] gap-4 md:flex md:flex-col md:mt-10 md:grid-rows-[1fr] '>
          <div className='bg-myblack w-fit px-3 py-3 rounded-[7px] max-h-[40px]'>
            <img src="/img/filter.svg" alt="" />
          </div>
          <div className="content-select text-white relative ">
            <select onChange={e => {setCurrentType(e.target.value), handleChange }} className='bg-myred px-4 py-2 rounded-[7px] w-full  font-highlight text-right overflow-y-visible' size={selectSize} onFocus={handleFocus} onBlur={handleBlur} >
              <option className='font-highlight font-bold' value="" >All types</option>
              {
                types.map(type => <option key={type} value={type} className='w-full font-text capitalize text-right hover:bg-mypink'>{type}</option>)
              }
             
            </select>
            <div className='absolute top-4  left-3'>
                <img src="/img/dropdown.svg" alt="" />
            </div>
          
          </div>
          
        </aside>
        <section className='mt-4 md:col-start-3 md:col-span-2 md:mt-10 gap-x-[5.2%] gap-y-6 gap grid md:grid-cols-[repeat(auto-fit,minmax(150px,max-content))] '>
          {
            pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} /> )
          }
        </section>
        {/* Pagination */}
        <ul className='md:col-start-3 md:col-span-2 flex flex-wrap gap-1 justify-center md:mt-20 mt-8 ' >
        <li onClick={() => setCurrentPage(1)} className='px-2 py-1 bg-myblack rounded-md text-white font-highlight cursor-pointer'>{"<<"}</li>
          <li onClick={handlePrev} className='px-2 py-1 bg-myblack rounded-md text-white font-highlight cursor-pointer'>{"<"}</li>
              {
                pagesInBlock.map(page => (
                  <p key={page} className={`px-2 py-1 text-white ${page === currentPage ? 'bg-[#E80D27]' : 'bg-myred'} font-bold'} rounded-md font-highlight cursor-pointer`} onClick={() => setCurrentPage(page)}>{page}</p>
                ))
              }
            <li onClick={handleNext} className='px-2 py-1 bg-myblack rounded-md text-white font-highlight cursor-pointer'>{">"}</li>
            <li onClick={() => setCurrentPage(lastPage)} className='px-2 py-1 bg-myblack rounded-md text-white font-highlight cursor-pointer'>{">>"}</li>
          </ul>
      </main>
      </div>
      
    </div>
    
  )
}

export default Pokedex