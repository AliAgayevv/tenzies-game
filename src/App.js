import React from "react";
import Confetti from 'react-confetti'
import Dice from "./Components/Dice";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSame = dice.every(die => die.value === firstValue)
    
    if(allHeld && allSame) 
    {
      setTenzies(true)
      console.log("you won")
    }
  }, [dice])

  // React.useEffect(() => {
  //   const currentStatus = tenzies
  //   console.log(tenzies)
  // })

  

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice

  }


  const diceElements = dice.map(die => <Dice 
    value={die.value} isHeld={die.isHeld}  holdDice={() => holdDice(die.id)}
  />)

  function holdDice(id) 
  {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
  }

  function generateNewDice() {
    
      return{
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: Math.floor(Math.random() * 100000000),
    }
  }

  function rollDice() {
    if(!tenzies)
    {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      }))
    }

    else
    {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  const styles =
  {
    backgroundColor: tenzies ? "#59E391" : "#5035FF",
    color: tenzies ? "black" : "white"
  }

  return (
    <main>
      {tenzies ? <Confetti/> : ""}  
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dices-container">
        {diceElements}
      </div>
      <button style={styles} onClick={rollDice} className="roll-btn">{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
