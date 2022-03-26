const guessedNumber = document.querySelector('#input');
const numOfRounds = document.querySelector('#numOfRounds');
const tryNumbersBTN = document.querySelector('#tryNumbers');
const wrongPlace = document.querySelector('#numOfWrongPlace');
const success = document.querySelector('#numOfSuccess');
const toolTip = document.querySelector('#toolTip');
const randomArr = document.querySelector('#codePlace');
const starOver = document.querySelector('#starOver');


let codeArr;
let numberOfRounds = 0;
let numOfSuccess = 0;
let numOfWrongPlace = 0;

const randomNumber = () => {
    codeArr = [];
    while (codeArr.length < 4) {
        let item = Math.floor(Math.random() * 9) + 1;
        if (codeArr.indexOf(item) === -1) codeArr.push(item)
    }
};
const startGame = () => {
    randomNumber()

    guessedNumber.value = "";
    numberOfRounds = 1;
    numOfRounds.textContent = '0';
    wrongPlace.textContent = '0';
    success.textContent = '0';
    randomArr.textContent = '_ _ _ _'
    console.log(codeArr)
}

starOver.addEventListener('click', () => {
    startGame(randomNumber())
    toolTip.classList.remove('winner')
    toolTip.textContent = ""
    document.querySelectorAll(".__cornify_unicorn").forEach(el => el.remove());

})

tryNumbersBTN.addEventListener('click', () => {
    let str = "";
    numOfSuccess = 0;
    numOfWrongPlace = 0;
    const userNumbers = input.value;

    let userArr = Array.from(userNumbers)

    if (userArr.includes('0')) {
        toolTip.classList.remove('hidden')
        toolTip.textContent = "You can't use 0 in this game"
        return
    } else {
        toolTip.classList.add('hidden')
    }


    if ((new Set(userArr)).size !== userArr.length) {
        toolTip.classList.remove('hidden')
        toolTip.textContent = "You can't use the same digit twice"
        return
    } else {
        toolTip.classList.add('hidden')
    }

    numOfRounds.innerHTML = numberOfRounds++
    for (let i = 0; i < codeArr.length; i++) {
        if (codeArr[i] === Number(userNumbers[i])) {
            str = str.concat(` ${userNumbers[i]} `);
            success.innerHTML = numOfSuccess++ + 1
        } else if (codeArr.includes(Number(userNumbers[i]))) {
            str = str.concat(" C ");
            wrongPlace.innerHTML = numOfWrongPlace++ + 1
        } else {
            str = str.concat(" _ ");
        }
    }

    randomArr.innerHTML = str;
    let partA = str.replaceAll(" ", "")
    let partB = userArr.toString().replaceAll(",", "")

    if (partA === partB) {
        toolTip.classList.remove('hidden')
        toolTip.classList.add('winner')
        toolTip.textContent = "Good Job!"

        cornify_add();
        let callCount = 1;
        let repeater = setInterval(function () {
            if (callCount < 4) {
                cornify_add()
                callCount += 1;
            } else {
                clearInterval(repeater);
            }
        }, 500);

    }

});

startGame()










