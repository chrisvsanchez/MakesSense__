// stable Card Elements
let outerCardDiv = document.querySelector(".outer")
let outerCard = document.querySelector(".card-outer")
let gifDiv = document.querySelector(".gifDiv")
let loginFormDiv = document.querySelector(".login-form")
let logOutNav = document.querySelector(".logout")
let createDeckForm = document.querySelector(".create-deck-form")
let currentUser = 0
let headerClear = document.querySelector("header")
let banner = document.querySelector(".banner")
// Login Form
let createLoginForm = () => {
    //  outerCardDiv.innerHTML = ""
    let loginForm = document.createElement("form")
    loginForm.className = 'center'
    loginForm.style.backgroundColor = "#f6f3e4"

    let usernameDiv = document.createElement("div")
    usernameDiv.className = "form-group"

    let usernameLabel = document.createElement("label")
    usernameLabel.htmlFor = "username"
    usernameLabel.innerText = "Username"

    let usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.className = "form-control"
    usernameInput.id = "username"
    usernameInput.placeholder = "Enter Username"
    usernameInput.autocomplete = "off"

    usernameDiv.append(usernameLabel,usernameInput)

    let submitButton = document.createElement("button")
    submitButton.type = "Submit"
    submitButton.className = "submitButton"
    submitButton.style.color = "white"
    submitButton.innerText = "Login"
    
    loginForm.append(usernameDiv,submitButton)
    outerCardDiv.append(loginForm)
    loginForm.addEventListener("submit", handleLoginForm)
}

// verify if login is valid, shows valid info associated with user
let handleLoginForm = (evt) => {
    evt.preventDefault()
    let username = evt.target.username.value

    fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            usernameInput: username
        })
    })
    .then(res => res.json())
    .then((response)=> {
        if (response.id) {
            banner.innerHTML = ""
            
             currentUser = response.id
            outerCardDiv.innerHTML = ""
            setSideBar(response)
            response.decks.forEach(deck => {
                turnToDeck(deck)
                })
                
            } else {
                alert("User does not exist!")
            }
        })
    }

    // logout function
    let setSideBar = (user) => {
        loginFormDiv.innerHTML = ""
        let logOutDiv = document.createElement("div")
        let userUsername = document.createElement("p")
        userUsername.className = "font-weight-bold text-center"
        userUsername.innerText = `Logged in as ${user.name}`
        
        let logOutButton = document.createElement("button")
        logOutButton.className = "btn btn-danger"
        logOutButton.innerText = "Logout"
        
        //a button to create a deck
        let createDeckButton = document.createElement("button")
        createDeckButton.className = "btn btn-danger"
        createDeckButton.innerText = "Create a Deck"

        let checkoutAllDecks = document.createElement("button")
       checkoutAllDecks.className = "btn btn-danger"
       checkoutAllDecks.innerText = "All My Decks"

        logOutDiv.append(userUsername, logOutButton, createDeckButton, checkoutAllDecks)

        logOutNav.append(logOutDiv)
        logOutButton.addEventListener("click", (evt) => {
            logOut()
        })
        createDeckButton.addEventListener("click", (evt) => {
            createNewForm()

        })
        checkoutAllDecks.addEventListener("click", (evt)=>{
      
        //     YOU ARE WORKING HERE DUDE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            fetch(`http://localhost:3000/users`)
            .then(r => r.json())
            .then((userObj)=>{
             
                let currentSignIn = userObj[`${currentUser-1}`]
                logOutNav.innerHTML = ""
                outerCard.innerHTML = ""
                outerCardDiv.innerHTML = ""
                setSideBar(currentSignIn)
                currentSignIn.decks.forEach(deck => {
                turnToDeck(deck)
                    })
            
        })
    })
}
    let logOut = () => {
        createDeckForm.innerHTML= ""
        logOutNav.innerHTML= ""
        outerCard.innerHTML = ""
        outerCardDiv.innerHTML = ""
        createLoginForm()
    }
    
    let createNewForm = () => {
        let createDeckFormDiv = document.createElement("div")
        createDeckFormDiv.className = 'coral'
        
        let createBlankForm = document.createElement("form")
        createBlankForm.className = "createBlankForm"
        let deckTitleLabel = document.createElement("label")
        deckTitleLabel.innerText = "Title:"
        deckTitleLabel.style.color = "white"
        let deckTitle = document.createElement("input")
        
        deckTitle.type = "text"
        deckTitle.className = "form-control"
        deckTitle.id = "deckTitleInput"
        deckTitle.placeholder = "Enter Title"
        deckTitle.autocomplete = "off"
        
        let deckSubjectLabel = document.createElement("label")
        deckSubjectLabel.innerText = "Subject:"
        deckSubjectLabel.style.color = "white"
        let deckSubject = document.createElement("input")
        deckSubject.type = "text"
        deckSubject.className = "form-control"
        deckSubject.id = "deckSubjectInput"
        deckSubject.placeholder = "Enter Subject"
        deckSubject.autocomplete = "off"
        
        let submitDeckButton = document.createElement("button")
        submitDeckButton.className = "btn btn-danger"
        submitDeckButton.innerText = "Submit a Deck"
        
        createBlankForm.append(deckTitleLabel,deckTitle,deckSubjectLabel,deckSubject,submitDeckButton)
        createDeckFormDiv.append(createBlankForm)
        createDeckForm.append(createDeckFormDiv)

        
        createBlankForm.addEventListener("submit", (evt)=> {
            evt.preventDefault()
            let userSubject = evt.target.deckSubjectInput.value
            let userTitle = evt.target.deckTitleInput.value
         
            fetch('http://localhost:3000/decks', {
                method: "POST",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    title: userTitle,
                    subject: userSubject,
                    user_id: currentUser 
                }) 
            })
            .then(res => res.json())
            .then((newDeck)=>{
                turnToDeck(newDeck)
                evt.target.reset()
            })
         })
        
        
    }
    
    
    // creating and showing deck to screen
    
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

        let createDeleteButton = document.createElement("button")
        createDeleteButton.className = "delete-button1"
        
        let newDeleteDiv = document.createElement("div")
        newDeleteDiv.className = "garbage"
        
        
        let addCardButton = document.createElement("button")
        addCardButton.className = "create"
        addCardButton.innerText = "Create a new Card"
        
        let openCardsButton = document.createElement("button")
        openCardsButton.innerText = "Let's get started!"
        openCardsButton.className ="deckButton"
        // openCardsButton.className = "deckButton"
        newDeleteDiv.append(createDeleteButton,addCardButton,openCardsButton)
        // backDiv.append(backTitle)
        frontDiv3.append(frontTitle, subject)
        backDiv.append(backTitle, newDeleteDiv)
        frontDiv2.append(frontDiv3,backDiv )
        frontDiv1.append(frontDiv2)
        outerCardDiv.append(frontDiv1)
        
        // clicking add card event listener
        addCardButton.addEventListener("click", (evt) => {
           // we already have access to a deck object
            // createNewCardForm()
            
            
            let cardForm = document.createElement("form")
            cardForm.classList = "card-form-new"
             
            
        let newCardDiv = document.createElement("div")
        newCardDiv.className = "new-card-div"
    
        let questionLabel = document.createElement("label")
        questionLabel.htmlFor = "question"
        questionLabel.innerText = "Question"
    
        let question = document.createElement("input")
            question.type = "text"
            question.className = "form-control"
            question.id = "question"
            question.placeholder = "Enter Question"
            question.autocomplete = "off"
    
        let instructionLabel = document.createElement("label")
            instructionLabel.htmlFor = "instruction"
            instructionLabel.innerText = "Instruction"
        
        let instruction = document.createElement("input")
            instruction.type = "text"
            instruction.className = "form-control"
            instruction.id = "instruction"
            instruction.placeholder = "Enter Instructions"
            instruction.autocomplete = "off"
    
        let newCardSubmitButton = document.createElement("button")
        newCardSubmitButton.innerText = "Submit New Card"
        newCardSubmitButton.className = "btn btn-danger"
    // right here K
            cardForm.append(questionLabel,question,instructionLabel,instruction,newCardSubmitButton)
              
            newCardDiv.append(cardForm)
            outerCard.append(newCardDiv)
    
          cardForm.addEventListener("submit", (evt) => {
              evt.preventDefault()
              let userInputQuestion = evt.target.question.value
              let userInputInstruction = evt.target.instruction.value
              fetch('http://localhost:3000/cards', {
                  method: "POST",
                  headers: {
                      "content-type": "application/json"
                  },
                  body: JSON.stringify({
                      question: userInputQuestion,
                      instruction: userInputInstruction,
                      deck_id: deck.id,
                      answer: ""
                  })
              })
              .then(res => res.json())
              .then((newlyCreatedCard) => {
                  evt.target.reset()
                //   WE NEED TO FINISH `THIIIIS`!!!!!!!!!!!!!!!!!!!!
                //   turnToInputCard(newlyCreatedCard)
              })
          })  
        
        })

        openCardsButton.addEventListener("click", (evt) => {
            deck.cards.forEach(card => {
                turnToInputCard(card)
            });
        })
            createDeleteButton.addEventListener("click", () => {
                fetch(`http://localhost:3000/decks/${deck.id}`,{
                    method: "DELETE"
                    })
                    .then(r => r.json())
                    .then((deletedObj) => {
                        frontDiv2.remove()
                    })
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

            let deleteCardButton = document.createElement("button")
            deleteCardButton.className = "delete-button"
            // deleteCardButton.innerText ="delete"


            let subject = document.createElement("h4")
            subject.innerText = cardInfo.instruction
            subject.style.color = "grey"
            subject.style.fontSize = "20px"
            
            // let deleteButton = document.createElement("button")
            // deleteButton.innerText = "Delete"

            let backDiv = document.createElement("div")
            backDiv.className = "card-box-back"
            
            let inputForm = document.createElement("form")
            inputForm.innerHTML = `
            <textarea class="textInput" rows="6" cols="60" name="answer" id="answerInput">
        Enter answer here...</textarea><br>
            <input type="submit" class="submitButton" value="Submit">`
            
            let backTitle = document.createElement("h2")
            backTitle.innerText = "Answer"
            
            // backDiv.append(backTitle)
            frontDiv3.append(frontTitle, subject)
            backDiv.append(backTitle, inputForm, deleteCardButton)
            frontDiv2.append(frontDiv3,backDiv )
            frontDiv1.append(frontDiv2)
            outerCard.append(frontDiv1)
            // outerCardDiv.append(out)
            
            inputForm.addEventListener("submit", (evt)=> {
                evt.preventDefault()
                
                let userAnswer = evt.target.answer.value
                // How to obtain the exact card object to update answer 
                // check answer 
                cardInfo.answer = userAnswer
                fetch(`http://localhost:3000/cards/${cardInfo.id}`, {
                    method: "PATCH",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        answer: cardInfo.answer
                    })
                }).then(r => r.json())
                .then((updatedAnswer) =>{
                    
                    turnToBackCard(updatedAnswer.card)          
                    let backendResponse = document.createElement("h2")
                    backendResponse.innerText = updatedAnswer.message  
                    backendResponse.style.color = "red"
                    backDiv.append(backendResponse)
                })
            })

            let turnToBackCard = (updatedAnswer) => {
                backDiv.innerHTML = ""
                // let backDiv = document.createElement("div")
                // backDiv.className = "card-box-back"
                
                let backTitle = document.createElement("h2")
                backTitle.innerText = "Answer Submitted"
                
                let newP = document.createElement("p")
                newP.innerText = updatedAnswer.answer
                newP.style.fontSize = "18px"
                newP.style.color = "white"
                
                let nextCardButton = document.createElement("button")
                nextCardButton.className = "nextCardButton"
                nextCardButton.innerText = "Next Card"
                backDiv.append(backTitle, newP, nextCardButton)
            }
            deleteCardButton.addEventListener("click", (evt) =>{
                fetch(`http://localhost:3000/cards/${cardInfo.id}`,{
                    method: "DELETE"
                    })
                    .then(r => r.json())
                    .then((deletedObj) => {
                        frontDiv1.remove()
                    })
            })
        }

    }    

    //create a card function

    // let createNewCardForm = () => {
    //     let cardForm = document.createElement("form")
    //     cardForm.classList = "card-form-new"
         
        
    // let newCardDiv = document.createElement("div")
    // newCardDiv.className = "new-card-div"

    // let questionLabel = document.createElement("label")
    // questionLabel.htmlFor = "question"
    // questionLabel.innerText = "Question"

    // let question = document.createElement("input")
    // question.type = "text"
    // question.className = "form-control"
    // question.id = "question"
    // question.placeholder = "Enter Question"
    // question.autocomplete = "off"

    // let instructionLabel = document.createElement("label")
    // instructionLabel.htmlFor = "instruction"
    // instructionLabel.innerText = "Instruction"

    // let instruction = document.createElement("input")
    // instruction.type = "text"
    // instruction.className = "form-control"
    // instruction.id = "instruction"
    // instruction.placeholder = "Enter Instructions"
    // instruction.autocomplete = "off"

    // let newCardSubmitButton = document.createElement("button")
    // newCardSubmitButton.innerText = "Submit new Card"

    //     cardForm.append(questionLabel,question,instructionLabel,instruction,newCardSubmitButton)
          
    //     newCardDiv.append(cardForm)
    //     outerCard.append(newCardDiv)

    //   cardForm.addEventListener("submit", (evt) => {
    //       evt.preventDefault()
    //       
    //       let userInputQuestion = evt.target.question.value
    //       let userInputInstruction = evt.target.instruction.value
    //       fetch('http://localhost:3000/cards', {
    //           method: "POST",
    //           headers: {
    //               "content-type": "application/json"
    //           },
    //           body: JSON.stringify({
    //               question: userInputQuestion,
    //               instruction: userInputInstruction,
    //               deck_id: 

    //           })
    //       })
    //       .then(res => res.json())
    //   })  
    //  }
    
    createLoginForm()