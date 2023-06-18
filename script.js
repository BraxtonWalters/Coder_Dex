let currentUsername = "";
let userNameArr = [];
const notFound = document.getElementById("notFound");

// Function for creating new row in our HTML
function makeRow() {
    // Here we are taking the length of userNameArr and / by 5. Because we only want 5 users in one row. we add 1 at the end so we always start with 1.  
    let rowNum = Math.floor(userNameArr.length / 5) + 1;
    // standard string concatenation to create the actual row name so example "row1".
    let elem = "row" + rowNum
    // checking if the row is not in the HTML.  
    if (!document.getElementById(elem)) {
        // Creating a new element node. Once again, I need more understanding on this.
        let rowNode = document.createElement("div");
        // Setting the node with an ID of the elem var 
        rowNode.id = elem;
        // Setting the node with a class of "margT flex"
        rowNode.className = "margT flex";
        // Here we setting the var mainDiv to the element that has the ID of main
        let mainDiv = document.getElementById("main");
        // Here we are putting the new row element into the last position in the main div.
        mainDiv.appendChild(rowNode);
    }
    // Here we are returning the new row element we created.
    return document.getElementById(elem);
}

// This is the function connected to the input tag. We pass the param element through it which is "this"
function getUsername(element) {
    // Creating a var and setting to the element's value. The element's value is whatever the user type in the textfield
    currentUsername = element.value;
}

// Here we are creating the individual user card's HTML. We pass data as a param.
function genCoderCard(data) {
    // Creating a var and setting to the a new "element node". I need more understanding on this! 
    let res = document.createElement("div");
    // Taking the newly created div and giving it a class of "cardContainer flex marg".
    res.className = "cardContainer flex marg";
    // Here we are setting res's inner HTML to create the user card's HTML. 
    res.innerHTML = `
                <div class="userName flex just">
                    <h2 class="name">${data.name ? data.name : "No name set"}</h2>
                </div>
                <div>
                    <img class="userImg" src="${data.avatar_url}" alt="${data.login}">
                    </div>
                    <div>
                        <p class="city">${data.location ? data.location : "no location set"}</p>
                    </div>
                    <div>
                        <p class="fCount">Follower Count ${data.followers} </p>
                    </div>
                    <div class="btnCon">
                        <a target="_blank" href="${data.html_url}"><button class="gitBtn" >GitHub Profile</button></a>
                    </div>
                `;
    // After all that we return the "res".
    return res;
}

async function search() {
    // Creating a var and setting to a template literal that has the majority of the url as a string. Then we pass in the currentUsername var to complete the url. 
    let url = `https://api.github.com/users/${currentUsername}`
    // creating a var to fetch the url and force JS to wait for it to establish. 
    let response = await fetch(url)
    // creating a var to turn the url data into a json object and forcing it to wait for the response var to be created.
    let coderData = await response.json();
    // checking if there is a key in coderData called html_url. 
    if (coderData.html_url) {
        // Setting the notFound ID style of visibility to the string of hidden.
        notFound.style.visibility = "hidden";
        // Creating a var and setting to the makeRow function.
        let cardsDiv = makeRow();
        // creating a var and setting it to the genCoderCard function and passing coderData as an agrument.  
        let card = genCoderCard(coderData);
        // Here we are appending the the card var to the last spot in the cardsDiv var. 
        cardsDiv.appendChild(card);
        // Here we are pushing the currentUsername var into the userNameArr var.
        userNameArr.push(currentUsername);
    } else {
        // If the if check was false because there wasn't a html_url key in the JSON object then we make the visibility for the notFound ID equal to the string visible.  
        notFound.style.visibility = "visible";
    }
}