"use client"

import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { Dialog, Transition } from '@headlessui/react'


export default function WordBlock({ pressedKey, setPressedKey, fileContent, setRowNumber, rightWord, i, rowNumber, backOrEnter, setBackOrEnter }) {
  const [isActualWord, setIsActualWord] = useState(false)
  const [word, setWord] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (pressedKey) {
      if (word?.length == 5 || word?.length == 0) {
        setWord([pressedKey])
      }
      else {
        setWord(prev => [...prev, pressedKey])
      }

      setPressedKey('')
    }
  }, [pressedKey])

  useEffect(() => {
    if (word?.length == 5) {
      if (fileContent.includes(word?.join('').toLowerCase())) {
        setIsActualWord(true)
        if (rightWord != word?.join('').toLowerCase()) {
          setRowNumber(prev => prev + 1)
        }
      }
    }
  }, [word])


  useEffect(() => {

    if (backOrEnter == 'Backspace') {
      word.pop()
      setWord(word)
      setBackOrEnter('')
    }

  }, [backOrEnter, word])

  return (
    <div className='flex my-1'> 
      {[1, 1, 1, 1, 1].map((j, i) => <div className={`w-20 h-20 ${isActualWord && 'text-white'} ${isActualWord && (rightWord.split("")[i] == word[i]?.toLowerCase() ? 'bg-green-600' : rightWord.split("").includes(word[i]?.toLowerCase()) ? 'bg-yellow-600' : 'bg-slate-700')} flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center mx-1 text-5xl`} key={i}>{word?.[i]}</div>)}
      {rightWord.length && rightWord == word?.join('').toLowerCase() ?
      <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="top-0"
          enterTo="top-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="transform -translate-y-full scale-0"
              enterTo=" transform translate-y-px scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white py-[5rem] px-[4rem] text-center align-middle shadow-xl transition-all">
               
                
          
      
          <Confetti numberOfPieces={150} />
          <h1 className='text-6xl mb-3 text-white'>You Won!</h1>
          <button className='p-4 bg-black text-white rounded-lg' onClick={() => window.location.reload()}>Play Again</button>
    
        </Dialog.Panel>
    </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
        :''
      }    </div>
  )
}
