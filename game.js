"use strict;"

const Play = document.querySelector('#play')
const body = document.querySelector('body')
Play.addEventListener('click', roll)


const games  = {

    0 : "Siblings or dating",
    1 : "Portait arabe",
    2 : "Kamoulox",
    3 : "Delulu",
    4 : "Parc gratuit",
    5 : "Essayer de ne pas rire",
    6 : "Toxic trivia",
    7 : "45" 

}

const colors = {

    0 : 'rgb(255, 124, 198)',
    1 : 'rgb(88, 201, 86)',
    2 : 'rgb(253, 222, 46)',
    3 : 'rgb(205, 136, 235)',
    4 : 'rgb(243, 77, 77)',
    5 : 'rgb(155, 212, 247)',
    6 : 'rgb(87, 200, 164)',
    7 : 'rgb(252, 161, 71)'
}

function roll (event) {

    nb =  Math.round((Math.random())*7)
    Play.removeEventListener('click', roll)
    Play.textContent = games[nb]
    body.style.backgroundColor = colors[nb]
    Play.style.backgroundColor = colors[nb]
    Play.style.border = 'none'
    Play.style.fontSize = '10dvh'
    Play.style.top = '35dvh'


}


