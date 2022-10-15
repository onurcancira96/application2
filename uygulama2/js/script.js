'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, hak, win, win2;
hak =0;
win=0;
win2=0;
let windizi=[];
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    score0El.textContent= 0;    
    score1El.textContent= 0;
    current0El.textContent= 0;
    current1El.textContent= 0;

    diceEl.classList.add('hidden'); //?
    player0El.classList.add('player--active'); //class siliyor
    player1El.classList.remove('player--active'); //class siliyor
    document.getElementById('win').textContent='';
    document.getElementById('win2').textContent='';
    win=0;
    win2=0;
    document.getElementById('btnRoll').disabled=false;
    document.getElementById('btnHold').disabled=false;
    document.getElementById('btnRoll').classList.remove('btn-colorChange');
    document.getElementById('btnHold').classList.remove('btn-colorChange');
    document.querySelector('.player--winner').textContent='';
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;

    activePlayer = activePlayer === 0 ? 1 : 0; //değişken 0 ise bir yap değilse 0 yap
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function(){
    console.log(windizi);
    hak=0;
    document.getElementById('btnHold').classList.remove('btn-colorChange');
    document.getElementById('btnRoll').disabled = true;
    document.getElementById("btnHold").disabled =false;

    document.getElementById('btnRoll').classList.add('btn-colorChange');
    if(playing){
        const dice = Math.trunc(Math.random()*6) + 1;
        windizi.push(dice);
        if(windizi.length==2){
           if(windizi[0]>windizi[1])
           {
            win+=1;
            console.log(`win1 ${win}`);
            windizi.pop();
            windizi.pop();
           }
           else if(windizi[0]==windizi[1])
           {            
            windizi.pop();
            windizi.pop();
           }
           else{
            win2+=1;
            console.log(`win2 ${win2}`);
            windizi.pop();
            windizi.pop();
           }

        }

    diceEl.classList.remove('hidden');
    diceEl.src=`/uygulama2/img/dice-${dice}.png`; //?
    
    if(dice!==1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }
    else{
        switchPlayer();
    }
}
});

btnHold.addEventListener('click', function(){
    hak +=1;
    console.log(hak);
    if(hak<=1){
        document.getElementById('btnHold').classList.add('btn-colorChange');
        document.getElementById("btnRoll").disabled =false;
        document.getElementById('btnRoll').classList.remove('btn-colorChange');
    
        if(playing){
            scores[activePlayer]  = currentScore;
    
            //scores[1]= scores[1] + currentScore;
    
            document.getElementById(`score--${activePlayer}`).textContent = currentScore;
    
            if(scores[activePlayer] >= 100){
                playing = false;
                diceEl.classList.add('hidden');
    
            document.querySelector(`.player--${activePlayer}`).classList.add('.player--winner');
    
            document.querySelector(`.player--${activePlayer}`).classList.remove('.player--active');
            
            }
            else{
                switchPlayer();
            }
        }
    
    }

    else{
        document.getElementById("btnHold").disabled =true;
    }
    
    if(win==1)
{
    document.getElementById('win').textContent='🎲';
}
else if(win==2)
{
    document.getElementById('win').textContent='🎲 🎲';
}
else if(win==3)
{
    document.getElementById('win').textContent='🎲 🎲 🎲';
}
else if(win==4)
{
    document.getElementById('win').textContent='🎲 🎲 🎲 🎲';
}
else if(win>=5)
{
    document.getElementById('win').textContent='🎲 🎲 🎲 🎲 🎲';
    document.querySelector('.player--winner').textContent="Player 1 Win"
    document.getElementById('btnRoll').disabled=true;
    document.getElementById('btnHold').disabled=true;
    document.getElementById('btnRoll').classList.add('btn-colorChange');    
}

if(win2==1)
{
    document.getElementById('win2').textContent='🎲';
}
else if(win2==2)
{
    document.getElementById('win2').textContent='🎲 🎲';
}
else if(win2==3)
{
    document.getElementById('win2').textContent='🎲 🎲 🎲';
}
else if(win2==4)
{
    document.getElementById('win2').textContent='🎲 🎲 🎲 🎲';
}
else if(win2>=5)
{
    document.getElementById('win2').textContent='🎲 🎲 🎲 🎲 🎲';
    document.querySelector('.player--winner').textContent="Player 2 Win"
    document.getElementById('btnRoll').disabled=true;
    document.getElementById('btnHold').disabled=true;
    document.getElementById('btnRoll').classList.add('btn-colorChange');


}



});







btnNew.addEventListener('click',init);