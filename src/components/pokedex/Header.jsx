import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Store from '../../Store'
import { setNameTrainer } from '../../Store/slices/nameTrainer.slice'

const Header = () => {

  const nameTrainer = useSelector(Store => Store.nameTrainer)

  const dispatch = useDispatch()

  const handleLogOut = () => {
        dispatch(setNameTrainer(''))
  }

  return (
    <header className='pt-4'>
        <div className='container grid grid-cols-[1fr,auto]'>
            <div>
                <img src="/img/logo.svg" alt="" />
            </div>
            <section className='mt-4 relative col-start-1'>
                <img src="/img/user-background.svg" alt="" />
                <div className='text-white'>
                    <span className='absolute top-[0.5px] left-3 font-highlight font-black text-[11px]'>USER</span>
                    <div className='absolute top-[40%] left-3 w-[127px] overflow-hidden'>
                        <p className=' font-title text-xl left-4 capitalize'>{nameTrainer}</p>
                    </div>
                </div>
                
            </section>
            <section className=' flex items-end col-start-2 row-start-2 h-auto justify-end ' >
                <div className='py-2 flex cursor-pointer'>
                    <p onClick={handleLogOut} className='font-highlight font-bold text-myblack pr-2 hover:text-myred transition-colors duration-300'>Log out</p>
                    <img onClick={handleLogOut} className='' src="/img/log-out.svg" alt="" />
                </div>
            </section>
        </div>
    </header>
  )
}

export default Header