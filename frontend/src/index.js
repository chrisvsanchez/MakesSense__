// stable Card Elements
let outerCardDiv = document.querySelector(".outer")
let outerCard = document.querySelector(".card-outer")

fetch(`http://localhost:3000/decks`)
.then(r => r.json())
.then((decksArray) =>{

    decksArray.forEach(deck => {
        turnToDeck(deck)
    });
})

let turnToDeck = (deck) => {
    
    let frontDiv1 = document.createElement("div")
    frontDiv1.className = "flip-box"

    let frontDiv2 = document.createElement("div")
    frontDiv2.className = "flip-box-inner"

    let frontDiv3 = document.createElement("div")
    frontDiv3.className = "flip-box-front"

    let frontTitle = document.createElement("h2")
    frontTitle.innerText = deck.title 

    let subject = document.createElement("h4")
    subject.innerText = deck.subject

    let backDiv = document.createElement("div")
    backDiv.className = "flip-box-back"

    let backTitle = document.createElement("h2")
    backTitle.innerText = "Additional Info"

    let openCardsButton = document.createElement("button")
    openCardsButton.innerText = "Let's get started!"
    openCardsButton.className = "deckButton"
    // backDiv.append(backTitle)
    frontDiv3.append(frontTitle, subject)
    backDiv.append(backTitle, openCardsButton)
   frontDiv2.append(frontDiv3,backDiv )
    frontDiv1.append(frontDiv2)
    outerCardDiv.append(frontDiv1)

    openCardsButton.addEventListener("click", (evt) => {
        deck.cards.forEach(card => {
            turnToInputCard(card)
        });
    })
    
let turnToInputCard = (cardInfo) => {
    outerCardDiv.innerText = ""
    
    let frontDiv1 = document.createElement("div")
    frontDiv1.className = "card-box"

    let frontDiv2 = document.createElement("div")
    frontDiv2.className = "card-box-inner"
    
    let frontDiv3 = document.createElement("div")
    frontDiv3.className = "card-box-front"

    let frontTitle = document.createElement("h2")
    frontTitle.innerText = cardInfo.question
    
    let subject = document.createElement("h4")
    subject.innerText = cardInfo.instruction
    subject.style.color = "grey"
    subject.style.fontSize = "20px"

    let backDiv = document.createElement("div")
    backDiv.className = "card-box-back"

    let inputForm = document.createElement("form")
        inputForm.innerHTML = `
        <textarea class="textInput" rows="6" cols="60" name="answer" id="answerInput">
        Enter text here...</textarea><br>
        <input type="submit" class="submitButton" value="Submit">`
        
        let backTitle = document.createElement("h2")
        backTitle.innerText = "Answer"
        
        // backDiv.append(backTitle)
        frontDiv3.append(frontTitle, subject)
        backDiv.append(backTitle, inputForm)
        frontDiv2.append(frontDiv3,backDiv )
        frontDiv1.append(frontDiv2)
        outerCard.append(frontDiv1)
        // outerCardDiv.append(out)
        
        inputForm.addEventListener("submit", (evt)=> {
            evt.preventDefault()
       
            let userAnswer = evt.target.answer.value
            
        })
    }
}