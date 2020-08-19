// stable Card Elements
let outerCardDiv = document.querySelector(".outer")
let outerCard = document.querySelector(".card-outer")
let gifDiv = document.querySelector(".gifDiv")
let loginFormDiv = document.querySelector(".login-form")
let logOutNav = document.querySelector(".logout")
let createDeckForm = document.querySelector(".create-deck-form")
let currentUser = 0
// Login Form
let createLoginForm = () => {
    //  outerCardDiv.innerHTML = ""
    let loginForm = document.createElement("form")
    loginForm.className = 'center'

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
    submitButton.className = "btn-btn-primary"
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
        let currentUser = response.id
        if (response.id) {
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
        userUsername.innerText = `Logged in as ${user.username}`
        
        let logOutButton = document.createElement("button")
        logOutButton.className = "btn btn-danger"
        logOutButton.innerText = "Logout"
        
        //a button to create a deck
        let createDeckButton = document.createElement("button")
        createDeckButton.className = "btn btn-danger"
        createDeckButton.innerText = "Create a Deck"
        createDeckButton.dataset.id = user.id



        logOutDiv.append(userUsername, logOutButton, createDeckButton)
        logOutNav.append(logOutDiv)
        logOutButton.addEventListener("click", (evt) => {
            logOut()
        })
        createDeckButton.addEventListener("click", (evt) => {
            createNewForm()
        })
    }
    
    let logOut = () => {
        logOutNav.innerHTML= ""
        outerCardDiv.innerHTML = ""
        createLoginForm()
    }
    
    let createNewForm = () => {
        let createBlankForm = document.createElement("form")
        createBlankForm.className = "createBlankForm"
        
        let deckTitle = document.createElement("input")
        deckTitle.type = "text"
        deckTitle.className = "form-control"
        deckTitle.id = "deckTitleInput"
        deckTitle.placeholder = "Enter Title"
        deckTitle.autocomplete = "off"
        
        let deckSubject = document.createElement("input")
        deckSubject.type = "text"
        deckSubject.className = "form-control"
        deckSubject.id = "deckSubjectInput"
        deckSubject.placeholder = "Enter Subject"
        deckSubject.autocomplete = "off"
        
        let submitDeckButton = document.createElement("button")
        submitDeckButton.className = "btn btn-danger"
        submitDeckButton.innerText = "Submit a Deck"
        
        createBlankForm.append(deckTitle,deckSubject,submitDeckButton)
        createDeckForm.append(createBlankForm)
        
        createBlankForm.addEventListener("submit", (evt)=> {
            debugger
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
                    user: currentUser
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
                newP.style.color = "#00c2cb"
                
                let nextCardButton = document.createElement("button")
                nextCardButton.className = "nextCardButton"
                nextCardButton.innerText = "Next Card"
                backDiv.append(backTitle, newP, nextCardButton)
            }
        }
    }    
    
    createLoginForm()