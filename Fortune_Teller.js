"use strict;"

setTimeout(() => { choice() }, 1000);

const pos = []
const cards = []
let animflag = true
let animflag2 = true
let animid = 0
let posk = -15
let current = 0
let final_pos = 70
let card_predict = []

function choice (event){ //function that introduces the three div choices to the player and remove the ft div

    const choice1 = document.createElement('div')
    const choice2 = document.createElement('div')
    const quitchoice = document.createElement('div')
    const contain1 = document.createElement('div')
    const message1 = document.createElement('i')
    const tarotmess = document.createElement('i')
    const crystalmess = document.createElement('i')
    const quitmess = document.createElement('i')
    

    choice1.id="choice1"
    choice2.id="choice2"
    quitchoice.id="quitchoice"
    contain1.classList.add('contain')
    message1.id='message1'
    
    message1.textContent='What can I do for you wanderer ?'
    tarotmess.textContent='A tarot reading'
    crystalmess.textContent='Can you see my future ?'
    quitmess.textContent='Nothing'


    contain1.appendChild(message1)
    choice1.appendChild(tarotmess)
    choice2.appendChild(crystalmess)
    quitchoice.appendChild(quitmess)

    document.body.appendChild(contain1) 
   
    setTimeout(() => { document.body.appendChild(choice1) }, 500);
  
    setTimeout(() => { document.body.appendChild(choice2) }, 800);
  
    setTimeout(() => { document.body.appendChild(quitchoice) }, 1100);


    setTimeout(() => { document.querySelector('#choice1').addEventListener('click', tarot_reading) }, 1200);
    setTimeout(() => { document.querySelector('#choice2').addEventListener('click', foreseeing) }, 1200);
    setTimeout(() => { document.querySelector('#quitchoice').addEventListener('click', quit_choice) }, 1200);
}

function quit_choice (event) { //

    document.body.removeChild(document.querySelector('#choice1'))
    document.body.removeChild(document.querySelector('#choice2'))
    document.body.removeChild(document.querySelector('#quitchoice'))
    document.body.removeChild(document.querySelector('.contain'))

    const quitcontain = document.createElement('div')
    const quitmess = document.createElement('i')

    quitcontain.classList.add('contain') 
    quitmess.id = 'quitmess'

    quitmess.textContent='You will face your fate one day or a another...'
    quitcontain.appendChild(quitmess)
    document.body.appendChild(quitcontain)

    setTimeout(() => { document.body.removeChild(quitcontain) }, 1500);
    setTimeout(() => { choice() }, 1600);


}


//  TAROT
function tarot_reading (event) { 

    document.body.removeChild(document.querySelector('#choice1'))
    document.body.removeChild(document.querySelector('#choice2'))
    document.body.removeChild(document.querySelector('#quitchoice'))
    document.body.removeChild(document.querySelector('.contain'))

    const message = document.createElement('i')
    const contain = document.createElement('div')

    message.id = 'mess_tarot'
    contain.classList.add('contain')

    contain.appendChild(message)
    message.textContent = 'The cards are the mirrors of the world, they reflect your past, your present and your future'

    document.body.appendChild(contain)
    
    //animation cards


    for (let k =0; k<22; k++){
        const img = document.createElement('img')
        img.classList.add('card')
        img.src = `cards/${k}.png`
        cards[k] = img
        document.body.append(img)
        
    }
    
    for (let k =0; k<22; k++){
        cards[k].style.top = `55dvh`
        cards[k].style.right = `${-k*10}dvw`
        pos[k] = -k*12
    }

    requestAnimationFrame(cardsanim)

    setTimeout(() => {  tarot_reading2() }, 4500);
    setTimeout(() => {  animflag = false }, 4600);
    setTimeout(() => {  cancelAnimationFrame(animid) }, 4950);

}
function cardsanim (currentTime) {

    const vx = 1.8
    
    for(k=0; k< cards.length ; k++){
        if (cards.length != 0){

            pos[k] = pos[k]+vx

            cards[k].style.right = `${pos[k]}dvw`

            if(pos[k] > 110){
                document.body.removeChild(cards[k])
                cards.shift()
                pos.shift()
            }

        }
            
    }
    if (cards.length == 0){
        animflag = false
    }
    if (animflag) {
        animid = requestAnimationFrame(cardsanim)
    }

}
function tarot_reading2 (){

    document.querySelector('#mess_tarot').textContent = 'your prophecy has been read !' 
    const predict = []

    let n1 = Math.floor(Math.random()*22)
    if (n1 == 22){n1 = 21}
    predict[0]=n1

    let n2 = Math.floor(Math.random()*22)
    while (n2 == n1){n2 = Math.floor(Math.random()*22)}
    predict[1] = n2

    let n3 = Math.floor(Math.random()*22)
    while (n3 == n2 || n3 == n1) {n3 = Math.floor(Math.random()*22)}
    predict[2] = n3
    
    for (k=0; k<3; k++){
        const card = document.createElement('img')
        card.src = `cards/${predict[k]}.png`
        card.classList.add('card')
        card.id = `card${k}`
        const text = document.createElement('i')
        const predicition_contain = document.createElement('div')
        predicition_contain.appendChild(text)
        predicition_contain.classList.add('prediction')
        text.textContent = tarot_list[predict[k]][k]+'. press any key'
        card_predict[k] = [card, predicition_contain]
    }
    
    document.body.appendChild(card_predict[0][0])
    card_predict[0][0].style.right = '-15dvw'

    animflag2 = true
    requestAnimationFrame(move)

    setTimeout(() => {  document.body.appendChild(card_predict[0][1]) }, 2000);
    card_predict[0][1].style.right = '47dvw'

    setTimeout(() => {  document.addEventListener('keydown', second_card) }, 2100);

}
function move (currentTime) {

    const v = 1
    posk = posk + v

    document.querySelector(`#card${current}`).style.right = `${posk}dvw`

    if (posk > final_pos){ animflag2 = false}

    if (animflag2){
        requestAnimationFrame(move)
    }
}
function second_card(event){

    animflag2 = true
    document.removeEventListener('keydown', second_card)
    document.body.removeChild(document.querySelector('.prediction'))

    current = 1
    final_pos = 58
    posk = -15

    document.body.appendChild(card_predict[1][0])
    requestAnimationFrame(move)

    setTimeout(() => {  document.body.appendChild(card_predict[1][1]) }, 2000);
    card_predict[1][1].style.right = '35dvw'

    setTimeout(() => {  document.addEventListener('keydown', third_card) }, 2100);document.addEventListener('keydown', third_card)
}
function third_card (event) {

    animflag2 = true
    document.removeEventListener('keydown', third_card)
    document.body.removeChild(document.querySelector('.prediction'))

    current = 2
    final_pos = 46
    posk = -15

    document.body.appendChild(card_predict[2][0])
    requestAnimationFrame(move)

    setTimeout(() => {  document.body.appendChild(card_predict[2][1]) }, 2000);
    card_predict[2][1].style.right = '23dvw'

    setTimeout(() => {  document.addEventListener('keydown', finish_reading) }, 2100)

}
function finish_reading (event) {

    document.removeEventListener('keydown', finish_reading)
    document.body.removeChild(document.querySelector('.prediction'))

    document.querySelector('#mess_tarot').textContent = 'The cards have spoken, now face your fate !'

    setTimeout(() => {  document.body.removeChild(document.querySelector('#card0')) }, 1000);
    setTimeout(() => {  document.body.removeChild(document.querySelector('#card1')) }, 1000);
    setTimeout(() => {  document.body.removeChild(document.querySelector('#card2')) }, 1000);

    setTimeout(() => {  document.body.removeChild(document.querySelector('.contain')) }, 2000);

    setTimeout(() => { choice() }, 2800);

    animflag = true
    card_predict = []
    posk = -15
    current = 0
    final_pos = 70
}




const tarot_list = {

    0 : {
        0 : 'THE FOOL, your past has been marked by a renewal, the beginning of a journey either mental or physical. You carefreely let the universe roll the dice for you and cut loose from what constrained your growth',
        1 : 'THE FOOL, your present is marked by a renewal, the beginning of a journey either mental or physical. You carefreely let the universe roll the dice for you and cut loose from what constrains your growth',
        2 : "THE FOOL, your future will be marked by a renewal, the beginning of a journey either mental or physical. You'll carefreely let the universe roll the dice for you and cut loose from what constrains your growth",
    },
    1 : {
        0 : 'THE MAGICIAN, the heavens have looked after you in the past, and granted you the keys to success and you used them to realize your dreams and start a new lifecycle',
        1 : 'THE MAGICIAN, the heavens are currently looking after you, and have granted you the keys to success. It is up to you to use them to realize your dreams or start a new lifecycle',
        2 : 'THE MAGICIAN, the heavens will look after you, and grant you the keys to success. It is up to you to use them to realize your dreams or start a new lifecycle',
    },
    2 : {
        0 : 'THE HIGH PRIESTESS, you have followed your intuitions in the past rather than your intellect, and listened to your inner voice to undertsand all the subcontious signs that the universe had sent you',
        1 : 'THE HIGH PRIESTESS, you are currently following your intuitions rather than your intellect, and listening to your inner voice to undertsand all the subcontious signs that the universe is sending you',
        2 : 'THE HIGH PRIESTESS, you will follow your intuitions rather than your intellect, and listen to your inner voice to undertsand all the subcontious signs that the universe will send you',
    },
    3 : {
        0 : 'THE EMPRESS, you may have received good news lately, such as a pregnancy, or maybe you have reconnected with yourself on a deeper level and embraced your feminity or your sexuality',
        1 : 'THE EMPRESS, you may receive good news, such as a pregnancy, or maybe you are reconnecting with yourself on a deeper level and embracing your feminity or your sexuality',
        2 : 'THE EMPRESS, you will probably receive good news lately, such as a pregnancy, or maybe you will reconnect with yourself on a deeper level and embrac your feminity or your sexuality',
    },
    4 : {
        0 : 'THE EMPEROR, you were dealing with authority issues on a poject, but you had everything thought through and collected the fruits of your labor',
        1 : 'THE EMPEROR, you are dealing with authority issues on a poject, but you have everything think through and are collecting the fruits of your labor',
        2 : "THE EMPEROR, you will be dealing with authority issues on a poject, but you'll have everything thought through and will collect the fruits of your labor",
    },
    5 : {
        0 : 'THE HIEROPHANT, you had to question an authority, as well as your trust towards boundaries imposed to you, but remained confident in your creativity',
        1 : 'THE HIEROPHANT, you have to question an authority, as well as your trust towards boundaries imposed to you, but remain confident in your creativity',
        2 : 'THE HIEROPHANT, you will have to question an authority, as well as your trust towards boundaries imposed to you, but will remain confident in your creativity',
    },
    6 : {
        0 : 'THE LOVERS, you recently had to take a very serious decision about friendships, love,  or sex, and transited into a whole new chapter of your life based on trust',
        1 : 'THE LOVERS, you currentlly have to take a very serious decision about friendships, love,  or sex, and transit into a whole new chapter of your life based on trust',
        2 : 'THE LOVERS, you will have to take a very serious decision about friendships, love,  or sex, and will transit into a whole new chapter of your life based on trust',
    },
    7 : {
        0 : "THE CHARIOT, you recently had to question your control over a situation, and deal with your emotions to move forward through hard work and positive intents. You didn't let confusion blind you",
        1 : "THE CHARIOT, you should be questioning your control over a situation, and deal with your emotions to move forward through hard work and positive intents. Don't let your confusion blind you",
        2 : "THE CHARIOT, you will be questioning your control over a situation, and will deal with your emotions to move forward through hard work and positive intents. You won't let your confusion blind you",
    },
    8 : {
        0 : 'THE STRENGHT, you had to face difficult events, but your effort and your faith have flattened the temptations or repelled the bad luck. You realized that your courage and confidence were your stongest weapons',
        1 : 'THE STRENGHT, you are facing difficult events, but your effort and your faith are flattening the temptations or repelling the bad luck. You should realize that your courage and confidence were your stongest weapons',
        2 : 'THE STRENGHT, you will have to face difficult events, but your effort and your faith will flatten the temptations or repell the bad luck. You will realize that your courage and confidence were your stongest weapons',
    },
    9 : {
        0 : 'THE HERMIT, you have cut yourself from the world, and went for a spiritual hibernation. You sought answers within yourself and relied on your intellect and self-belief to bring you mental peace',
        1 : 'THE HERMIT, you are cutting yourself from the world, and going for a spiritual hibernation. You seek answers within yourself and rely on your intellect and self-belief to bring you mental peace',
        2 : 'THE HERMIT, you will cut yourself from the world, and go for a spiritual hibernation. You will seek answers within yourself and will rely on your intellect and self-belief to bring you mental peace',
    },
    10 : {
        0 : 'THE WHEEL OF FORTUNE, you had to face a monumental change which you had no control over. A bad situation might have frightened you but you realized that the wheel keeps spinning and that more change has come',
        1 : 'THE WHEEL OF FORTUNE, you are facing a monumental change which you have no control over. A bad situation might frighten you but remember that the wheel keeps spinning and that more change is coming',
        2 : 'THE WHEEL OF FORTUNE, you will have to face a monumental change which you had no control over. A bad situation might frighten you but you remember that the wheel will keep spinning and that more change is coming',
    },
    11 : {
        0 : 'THE JUSTICE, you may have faced unfair situations but be sure that true justice occured. You reaped what you sowed and so did everybody that hurt you. The sword of justice cut through every life situation and always restore balance',
        1 : 'THE JUSTICE, you may be facing unfair situations but be sure that true justice is occuring. You reap what you sowed and so does everybody that hurt you. The sword of justice cut through every life situation and always restore balance',
        2 : 'THE JUSTICE, you will probably have to face unfair situations but be sure that true justice will occure. You will reap what you sowed and so will do everybody that hurt you. The sword of justice cut through every life situation and always restore balance',
    },
    12 : {
        0 : 'THE HANGED MAN, you were tangled up in constraints that prevented you from taking the right decisions, but you made the right choice of stepping back, and waiting for another point of view or new opportunities',
        1 : 'THE HANGED MAN, you are tangled up in constraints that prevent you from taking the right decisions. You should step back, and wait for another point of view or new opportunities',
        2 : 'THE HANGED MAN, you will be tangled up in constraints that will prevent you from taking the right decisions. You should make the choice of stepping back, and waiting for another point of view or new opportunities',
    },
    13 : {
        0 : 'DEATH, you had to face the brutal end of something, it could have been either bad or a good news. You got rid of your old patterns and moved to a completely new life',
        1 : 'DEATH, you have to face the brutal end of something, it could be either bad or a good news. You are getting rid of your old patterns and moving to a completely new life',
        2 : 'DEATH, you will have to face the brutal end of something, it could be either bad or a good news. You will get rid of your old patterns and will move to a completely new life',
    },
    14 : {
        0 : 'TEMPERANCE, you have learned the art of moderation and you knew how to keep your calm in every situation. You never went for the extremes and always chose the midway, the path of patience and balance',
        1 : 'TEMPERANCE, you are learning the art of moderation and you how to keep your calm in every situation. You should not go for the extremes and always choose the midway, the path of patience and balance',
        2 : 'TEMPERANCE, you will learn the art of moderation and you how to keep your calm in every situation. You should never go for the extremes and always choose the midway, the path of patience and balance',
    },
    15 : {
        0 : 'THE DEVIL, you were chained by your desires, either materialistic, romantic or sexual. You showed an obvious lack of willpower and despair concerning an addiction or a dependency',
        1 : 'THE DEVIL, you are chained by your desires, either materialistic, romantic or sexual. You show an obvious lack of willpower and despair concerning an addiction or a dependency',
        2 : 'THE DEVIL, you will be chained by your desires, either materialistic, romantic or sexual. You will show an obvious lack of willpower and despair concerning an addiction or a dependency',
    },
    16 : {
        0 : 'THE TOWER, you faced unexpected destructions, renovations, crisis, or major changes which were necessary. They might have seemed frightening at first but they helped you uproot your false beliefs',
        1 : 'THE TOWER, you are facing unexpected destructions, renovations, crisis, or major changes which are necessary. They might seem frightening at first but they will help you uproot your false beliefs',
        2 : 'THE TOWER, you will face unexpected destructions, renovations, crisis, or major changes which will be necessary. They might seem frightening at first but they will help you uproot your false beliefs',
    },
    17 : {
        0 : 'THE STAR, you were blessed by the heavens, and they instilled hope and faith in you. An opportunistic and positive time were ahead, meant for healing, renewal and restoring your trust in the universe',
        1 : 'THE STAR, you are blessed by the heavens, and they instill hope and faith in you. An opportunistic and positive time are ahead, meant for healing, renewal and restoring your trust in the universe',
        2 : 'THE STAR, you will be blessed by the heavens, and they will instill hope and faith in you. An opportunistic and positive time will be ahead, meant for healing, renewal and restoring your trust in the universe',
    },
    18 : {
        0 : "THE MOON, you were deceived too many times and came to terms with the fact that things didn't appear to you as they really were. You were the subject of delusion and trickery, which made it hard for you to take calls on important matters",
        1 : "THE MOON, you are being deceived too many times and coming to terms with the fact that things don't appear to you as they really are. You are the subject of delusion and trickery, which makes it hard for you to take calls on important matters",
        2 : "THE MOON, you will be deceived too many times and will come to terms with the fact that things don't appear to you as they really are. You will be the subject of delusion and trickery, which will make it hard for you to take calls on important matters",
    },
    19 : {
        0 : 'THE SUN, you finally saw your world fill itself with cheerfulness and prosperity. Just like one bathes in the sun light, you bathed in abundance and hope, saying yes to new opportunities that brought wealth',
        1 : 'THE SUN, you finally see your world fill itself with cheerfulness and prosperity. Just like one bathes in the sun light, you bath in abundance and hope, saying yes to new opportunities that bring wealth',
        2 : 'THE SUN, you will finally see your world fill itself with cheerfulness and prosperity. Just like one bathes in the sun light, you will bath in abundance and hope, saying yes to new opportunities that will bring wealth',
    },
    20 : {
        0 : 'JUDGMENT, you laid in a duality between rebirth and death. The time came for your introspection, the judgement of oneself, from which you infered new beliefs that made you avoid unpleasant circumstances',
        1 : 'JUDGMENT, you lay in a duality between rebirth and death. The time has come for your introspection, the judgement of oneself, from which you infer new beliefs that are making you avoid unpleasant circumstances',
        2 : 'JUDGMENT, you will lay in a duality between rebirth and death. The time will come for your introspection, the judgement of oneself, from which you will infer new beliefs that will make you avoid unpleasant circumstances',
    },
    21 : {
        0 : "THE WORLD, you have fulfilled a whole cycle of your life. You enjoyed the culmination of your glory, you have worked hard for it and didn't let yourself be overwhelmed by the pressure. You grew wiser and more experienced",
        1 : "THE WORLD, you are fulfilling a whole cycle of your life. Enjoy the culmination of your glory, you worked hard for it and didn't let yourself be overwhelmed by the pressure. You are growing wiser and more experienced",
        2 : "THE WORLD, you will fulfill a whole cycle of your life. You will enjoy the culmination of your glory, you are working hard for it and aren't let yourself be overwhelmed by the pressure. You will grow wiser and more experienced",
    },

}






let m = 0
let n = 0
let t = 0
let s = 0


function foreseeing (event) { 

    document.body.removeChild(document.querySelector('#choice1'))
    document.body.removeChild(document.querySelector('#choice2'))
    document.body.removeChild(document.querySelector('#quitchoice'))

    document.querySelector('.contain').querySelector('i').textContent = 'I can see beyond the fabric of space and time and read your future'

    const crystal = document.createElement('img')
    crystal.src  ='crystal/crystal0.png'
    crystal.id = 'crystal'
    document.body.appendChild(crystal)

    requestAnimationFrame(animation_foreseeing)  

    setTimeout(() => { crystal_prediction() }, 4400);
}

function animation_foreseeing (currentTime) {

    t++

    if (t> 5){

        if (n == 4) {s=-1}
        if (n == 0) {s=1}

        n=n+s

        document.querySelector('#crystal').src = `crystal/crystal${n}.png`
        t=0
        m++
    }
   

    if (m > 35 && n == 0){}
    else{
        requestAnimationFrame(animation_foreseeing)
    }
    

}

function crystal_prediction () {

    let r = Math.floor(Math.random()*(future_list.length))

    document.querySelector('.contain').querySelector('i').textContent = future_list[r]+'. press any key'

    setTimeout(() => { document.addEventListener('keydown', finish_future) }, 100);
}

function finish_future (event) {

    m = 0
    n = 0
    t = 0
    s = 0

    document.removeEventListener('keydown', finish_future)

    document.querySelector('.contain').querySelector('i').textContent = 'Your prophecy has been told...'

    setTimeout(() => {  document.body.removeChild(document.querySelector('#crystal')) }, 1000);

    setTimeout(() => {  document.body.removeChild(document.querySelector('.contain')) }, 1300);

    setTimeout(() => { choice() }, 2000);


}

const future_list = [

    'You will fall deeply in love but your lack of courage will prevent you from talking to them',
    'A very important project of yours will finally come to completion',
    'You will reconnect with someone from your past, but beware, this might not be a good thing',
    'You will be informed of a joyfull event, such as a pregnancy or a marriage',
    'A huge amout of money will be flowing to you, deserved or not...',
    'You will encounter a one-eyed black cat',
    'You will drink an orange beverage that will cause your downfall',
    'Your mother will offer you a scratchy garish hand-knitten sweater',
    'You will be the savior of the broken, the beaten and the damned',
    'You will finally decide that your future lies beyond the yellow brick road',
    'The words of the prophet will be written on the subway walls',
    'You will realise that half of my prediction are actually just lyrics from music I personally enjoy',
    'You will think you are in paradise then one day you will find out he wears a disguise',
    'You will be dancing once again and the pain will end',
    'He will go back to her and you will go back to black, black, black, black',
    "You will realise that there Ain't no moutain high enough, Ain't no valley low enough...",
    "You will be holding out for a hero 'til the end of the night",
    "You'll be gone for the summer, surfin' USA",
    "You will be freed from desires, Mind and senses purified",
    "You'll want heir love and revenge, You and them, 'cause you are in a bad romance",
    "When it will be rainin' more than ever, know that you'll still have each other",
    "You won't have to wear that dress tonight, neither to put on the red light",
    "It will be a new dawn, a new day, a new life for you yeah",
    "You're never gonna dance again, guilty feet have got no rhythm",
    "If they are not back again this tile tomorrow, carry on, carry on as if nothing matters",
    "You and them, you'll run away together, you'll spend some time forever, you'll never feel bad anymore",
    "Just the two of you, you can make it if you try, just the two of you",
    "You'll never know if you don't go, you'll never shine if you don't glow",
    "Oh man, wonder if you'll ever know you're in the best-selling show, Is there life on Mars ?",
    "You'll wanna dance with somebody, somebody who loves you",
    "You'll go for a walk on a winter's, thinking you'd be safe and warm if you were in LA",
    "You'll be faking a smile with the cpffee to go"

]













