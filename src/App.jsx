import { useState } from 'react'
import bg from "./assets/bg.jpg"

function App() {
  const [text, setText] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [sentenceCount, setSentenceCount] = useState(0)
  const [paraCount, setParaCount] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const handleText = (e) => {
    let content = e.target.value.trim()
    setText(e.target.value)
    setCharCount(content.length)
    setWordCount(content.split(/\s+/).filter(w => w.length > 0).length)
    setSentenceCount(content.split(/[.!?]+/).filter(s => s.length > 0).length)
    setParaCount(content.split(/\n\s*\n/).filter(p => p.length > 0).length)
  }
  const resetContent = () => {
    setText("")
    setCharCount(0)
    setWordCount(0)
    setSentenceCount(0)
    setParaCount(0)
  }
  const copyContent = () => {
    if (text?.length > 0) {
      navigator.clipboard.writeText(text);
      setShowToast(true)
      setTimeout(() => { setShowToast(false) }, 2000)
    }
  }
  return (
    <div style={{
      "backgroundImage": `url(${bg})`, "width": '100%', backgroundSize: 'cover'
    }} className="w-full h-screen flex justify-center items-center">

      <div className='w-4/5 md:h-4/5 h-[90%] flex flex-col md:flex-row'>
        <div className='w-full md:w-1/4 h-1/4 md:h-full flex flex-col justify-evenly items-center bg-red-200'>
          <div className='flex flex-row md:flex-col justify-between px-4 items-center font-bold text-center bg-white w-4/5 rounded-2xl'>
            <p className='md:font-bold sm:text-xl text-sm'>Characters</p>
            <p className='text-xl'>{charCount}</p></div>
          <div className='flex flex-row md:flex-col justify-between px-4 items-center font-bold text-center bg-white w-4/5 rounded-2xl'>
            <p className='md:font-bold sm:text-xl text-sm'>Words</p>
            <p className='text-xl'>{wordCount}</p></div>
          <div className='flex flex-row md:flex-col justify-between px-4 items-center font-bold text-center bg-white w-4/5 rounded-2xl'>
            <p className='md:font-bold sm:text-xl text-sm'>Sentences</p>
            <p className='text-xl'>{sentenceCount}</p></div>
          <div className='flex flex-row md:flex-col justify-between px-4 items-center font-bold text-center bg-white w-4/5 rounded-2xl'>
            <p className='md:font-bold sm:text-xl text-sm'>Paragraphs</p>
            <p className='text-xl'>{paraCount}</p></div>
        </div>

        <div className='w-full md:w-3/4 h-3/4 md:h-full flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-400 relative'>
          <textarea rows="10" value={text} className="w-4/5 h-4/5 outline-none box-content pl-0 pt-2 pr-2 pb-2" onChange={e => handleText(e)} />
          <button onClick={resetContent} className='bg-white font-bold rounded px-2 absolute top-2 right-4'>⟳</button>
          <button onClick={copyContent} className='bg-white font-bold rounded px-2 absolute top-2 right-12'>☰</button>
        </div>

      </div>

      {showToast && text?.length ? <div className='absolute top-4 right-4 py-2 px-4 rounded-full border-2 bg-black text-white font-bold animation-ping'>TEXT COPIED!</div> : ""}
    </div>
  )
}

export default App
