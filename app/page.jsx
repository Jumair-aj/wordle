"use client"

import React, { useEffect, useRef, useState } from 'react'
import WordBlock from '@components/WordBlock'
import Error from 'next/error'


export default function Home() {
  const ref = useRef(null)
  const [rowNumber, setRowNumber] = useState(0)
  const [pressedKey, setPressedKey] = useState('')
  const [fileContent, setFileContent] = useState('');
  const [rightWord,setRightWord] =useState('')
  const [backOrEnter,setBackOrEnter] =useState('')

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


  return (
    <section className='w-screen h-screen z-50 flex flex-col justify-center items-center' ref={ref}>
      <h1 className='mb-5'>Wordle</h1>
      {[1, 1, 1, 1, 1, 1].map((a, i) => (<WordBlock pressedKey={rowNumber == i && pressedKey} key={i} i={i}setPressedKey={setPressedKey} fileContent={fileContent} setRowNumber={setRowNumber} rightWord={rightWord} rowNumber={rowNumber} backOrEnter={rowNumber == i && backOrEnter} setBackOrEnter={setBackOrEnter}/>))}
      { rowNumber == 6 &&
      <div className='absolute z-50	h-full w-full  bg-slate-600 top-0 left-0 flex justify-center flex-col items-center bg-opacity-50'><h1 className='text-3xl mb-3 text-white'>The word was <span className='text-red-700'>{rightWord.toUpperCase()}</span>. Better luck next time!</h1>
      <button className='p-4 bg-black text-white rounded-lg' onClick={()=>window.location.reload()}>Play Again</button>
      </div>
      } 
    </section>
  )
}
