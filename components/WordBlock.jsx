"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function WordBlock({ pressedKey, setPressedKey, fileContent, setRowNumber,rightWord, i,rowNumber,backOrEnter,setBackOrEnter }) {
  const [isActualWord, setIsActualWord] = useState(false)
  const [word, setWord] = useState([])
  const router = useRouter()

console.log(i,rowNumber)
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
    console.log(pressedKey)
  }, [pressedKey])

  useEffect(() => {
    console.log('first')
    if (word?.length == 5) {
      if (fileContent.includes(word?.join('').toLowerCase())) { 
        setIsActualWord(true)
        if( rightWord != word?.join('').toLowerCase()){
        setRowNumber(prev => prev + 1) }
      }
    }
  }, [word])


  useEffect(() => {

    console.log('o')
      if (backOrEnter=='Backspace') {
        console.log('o')
        word.pop()
       setWord(word)
       setBackOrEnter('')
      }
   
  }, [backOrEnter,word])

  return (
    <div className='flex my-1'>
      {[1,1,1,1,1].map((j,i)=><div className={`w-20 h-20 ${isActualWord && 'text-white'} ${isActualWord && (rightWord.split("")[i] == word[i]?.toLowerCase() ?'bg-green-600': rightWord.split("").includes(word[i]?.toLowerCase()) ? 'bg-yellow-600':'bg-slate-700')} flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center mx-1 text-5xl`} key={i}>{word?.[i]}</div>)}
      {/* <div className="w-20 h-20 flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center text-5xl">{word?.[1]}</div>
      <div className="w-20 h-20 flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center text-5xl">{word?.[2]}</div>
      <div className="w-20 h-20 flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center text-5xl">{word?.[3]}</div>
      <div className="w-20 h-20 flex border-2 rounded border-slate-300 bg-gray-200 justify-center items-center text-5xl">{word?.[4]}</div> */}
{ rightWord && rightWord == word?.join('').toLowerCase() &&
      <div className='absolute z-50	h-full w-full  bg-slate-600 top-0 left-0 flex justify-center flex-col items-center bg-opacity-50'><h1 className='text-6xl mb-3'>You Won!</h1>
      <button className='p-4 bg-black text-white rounded-lg' onClick={()=>window.location.reload()}>Play Again</button>
      </div>
      }    </div>
  )
}
