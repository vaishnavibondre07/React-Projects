import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm mx-auto shadow-lg rounded-lg p-5 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-2xl font-semibold mb-5">
          Password Generator
        </h1>

        <div className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4 bg-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="mt-2 sm:mt-0 sm:ml-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <label className="text-sm mb-1 sm:mb-0">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full sm:w-auto cursor-pointer"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="h-4 w-4"
              />
              <label htmlFor="numberInput" className="text-sm">Numbers</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="characterInput"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="h-4 w-4"
              />
              <label htmlFor="characterInput" className="text-sm">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
