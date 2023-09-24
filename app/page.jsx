"use client"

import React, { Fragment, useEffect, useRef, useState } from 'react'
import WordBlock from '@components/WordBlock'
import Error from 'next/error'
import { Dialog, Transition } from '@headlessui/react'


export default function Home() {
  const ref = useRef(null)
  const [rowNumber, setRowNumber] = useState(0)
  const [pressedKey, setPressedKey] = useState('')
  const [fileContent, setFileContent] = useState('');
  const [rightWord,setRightWord] =useState('')
  const [backOrEnter,setBackOrEnter] =useState('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    async function fetchTextFile() {
      try {

        const response = await fetch('/words.txt');

        if (!response.ok) {
          throw new Error('Failed to fetch the text file.');
        }

        // Read the response as text
        const text = await response.text();
        var textByLine = text.split("\n")

        setFileContent(textByLine);
        setRightWord(textByLine[Math.floor(Math.random() * (textByLine.length -1))])
      } catch (error) {
        console.error('Error reading the text file:', error);
      }
    }
    
    fetchTextFile();
  }, []);



  useEffect(() => {
    setPressedKey('')
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (e.code.startsWith('Key')) {
        setPressedKey(key.toUpperCase())
      }
      if (e.code.startsWith('Backspace')) {
        setBackOrEnter(key)
      }
      if (e.code.startsWith('Enter')) {
        setBackOrEnter(key)
      }
    })
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  return (
    <section className='w-screen h-screen z-50 flex flex-col justify-center items-center' ref={ref}>
      <h1 className='mb-5'>Wordle</h1>
      {[1, 1, 1, 1, 1, 1].map((a, i) => (<WordBlock pressedKey={rowNumber == i && pressedKey} key={i} i={i}setPressedKey={setPressedKey} fileContent={fileContent} setRowNumber={setRowNumber} rightWord={rightWord} rowNumber={rowNumber} backOrEnter={rowNumber == i && backOrEnter} setBackOrEnter={setBackOrEnter}/>))}
      { rowNumber == 6 &&
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
                 
                  
                {/* <div className='absolute z-50	h-full w-full  bg-slate-600 top-0 left-0 flex justify-center flex-col items-center bg-opacity-50'> */}
                  <h1 className='text-3xl mb-[2rem] '>The word was <span className='text-red-700'>{rightWord.toUpperCase()}</span>. Better luck next time!</h1>
         
      <button className='p-4 bg-black text-white rounded-lg' onClick={()=>window.location.reload()}>Play Again</button>
      {/* </div> */}
      </Dialog.Panel>
      </Transition.Child>

            </div>
          </div>
        </Dialog>
      </Transition>
      } 
    </section>
  )
}
