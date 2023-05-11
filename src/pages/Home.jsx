import React from 'react'
import { setNameTrainer } from '../Store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    
        <div className="min-h-screen bg-[url('/img/background.svg')] bg-cover object-cover bg-center grid place-content-center">
           <article className='bg-gradient-to-b from-myred to-myfuchsia w-[283px] h-[532px] grid grid-rows-[1fr,1.5fr] justify-center rounded-[15px] relative overflow-hidden '>
            <section className="flex flex-col items-center justify-center">
                <div className="w-[74.7px]">
                <img className='spinner' src="/img/ballwhite.svg" alt="" />
                </div>
                <h1 className="font-title text-white mt-2">Sign in</h1>
            </section>
            <section className='text-center text-white flex flex-col'>
                <p className="font-text">Pika pikaa.<br></br> Your name is ...?</p>
                <form onSubmit={handleSubmit}  className='flex flex-col mt-2 z-20'>
                <input id="nameTrainer" type="text" className="border-b border-mypink text-center"/>
                <button className='mt-6 bg-mypink rounded-full font-highlight font-bold cursor-pointer w-fit px-5 py-1 m-auto hover:duration-300 hover:scale-[1.07]'>Pikachuuu {'>'} </button>
                </form>
                <div className='absolute right-[-1px] bottom-2 z-10' >
                <img className="" src="/img/pikachu-sayhi.png" alt="" />
                </div>
            </section>
        </article>
        </div>
   
  )
}

export default Home