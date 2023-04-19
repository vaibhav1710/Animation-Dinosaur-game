
cross = true;
score = 0;
audio1 = new Audio('music.mp3');
audio2 = new Audio('gameover.mp3');
setTimeout(()=>{
    audio1.play();
},1000);
document.onkeydown = function(e){
  
    if(e.code=="ArrowUp"){
        player = document.querySelector('.player');
        player.classList.add('animateDino');
        setTimeout(()=> {
            player.classList.remove('animateDino');
        },700)
    }
   if(e.code=="ArrowLeft"){
    dino = document.querySelector('.player');
    dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dino.style.left = (dinoX - 112)+"px";
   }
   if(e.code=="ArrowRight"){
    dino = document.querySelector('.player');
    dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dino.style.left = (dinoX + 112)+"px";
   }

}

setInterval(() => {
    dino = document.querySelector('.player');
    obstacle = document.querySelector('.obstacle')
    gameOver = document.querySelector('.gameOver');

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('bottom'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('bottom'));
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
   
    if(offsetX < 70 &&  offsetY < 50) {
        gameOver.innerHTML = "GameOver - Reload to Start Over";
        player = document.querySelector('.player');
        player.style.transform = `rotate(45deg)`;
        
        obstacle.classList.remove('obstacleAni');
        audio1.pause();
        audio2.play();
        setTimeout(()=>{
          audio2.pause();
        },1000);
    }else if(cross && offsetX<100){ 
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
         cross = true;
        },1000)

        setTimeout(()=>{
            animedur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newdur = Math.max(animedur - 0.1,1.5);
            console.log(newdur);
            obstacle.style.animationDuration = newdur+'s';
        },397)
       
    }

},10)

function updatescore(score){
    scorecnt.innerHTML = "Your Score: " + score
}