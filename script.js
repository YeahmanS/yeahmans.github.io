  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  const cardMenuTwitter = document.getElementById('card-menu-twitter');
  
  const me = document.getElementById("me");
  const meIcon = document.getElementById("me-icon");
  const closeButtonMe = document.getElementById('close-button-me');
  const draggablebar = document.getElementsByClassName('draggable-bar');
  const cardMenuMe= document.getElementById('card-menu-me');
  
  const aboutMe = document.getElementById('contact-me-window');
  const closeButtonAboutMe = document.getElementById('close-button-about-me');
  const aboutMeIcon = document.getElementById('about-me-icon') 
  const aboutMeBar = document.getElementById('about-me-bar');
  const cardMenuAboutMe = document.getElementById('card-menu-about-me');

  const projectwindow = document.getElementById('project-window');
  const closeButtonProject = document.getElementById('close-button-projects');
  const projectIcon = document.getElementById('project-icon');
  const projectBar = document.getElementById('project-bar');
  const cardMenuProject = document.getElementById('card-menu-projects');

  const mineWindow = document.getElementById('minesweeper-window');
  const closeButtonMine = document.getElementById('close-button-minesweeper');
  const mineIcon = document.getElementById('mine-icon');
  const mineBar = document.getElementById('minesweeper-bar');
  const cardMenuMine = document.getElementById('card-menu-mines');

  let globalZ = 1;

  let cursor ={
    x:null,
    y:null
  } 

  let window_move = {
    dom:null,
    x:null,
    y:null
  }


  function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

  startButton.addEventListener('click', () => {
    console.log(startButton.classList[0])
    if (startButton.classList[0] == "not-pressed" ){
        startMenu.style.zIndex = 1;
        startButton.classList.remove("not-pressed")
        startButton.classList.add("pressed")
    } else {
        startMenu.style.zIndex = -1;
        startButton.classList.remove("pressed")
        startButton.classList.add("not-pressed")
    }

  });

closeButtonMe.addEventListener('click', async () => {

    closeButtonMe.classList.remove("not-pressed")
    closeButtonMe.classList.add("pressed")
    
    await delay(1000);
    me.style.zIndex = -1 ;
  })

closeButtonAboutMe.addEventListener('click', async () => {
    closeButtonAboutMe.classList.remove("not-pressed")
    closeButtonAboutMe.classList.add("pressed")
    await delay(1000);
    aboutMe.style.zIndex = -2 ;
  })

closeButtonProject.addEventListener('click', async () => {
    closeButtonProject.classList.remove("not-pressed")
    closeButtonProject.classList.add("pressed")
    await delay(1000);
    projectwindow.style.zIndex = -3 ;
  })

closeButtonMine.addEventListener('click', async () => {
    closeButtonMine.classList.remove("not-pressed")
    closeButtonMine.classList.add("pressed")
    await delay(1000);
    mineWindow.style.zIndex = -4 ;
    clearInterval(timer);
  })


meIcon.addEventListener('click',()=>{
  closeButtonMe.classList.remove("pressed")
  closeButtonMe.classList.add("not-pressed")
  globalZ +=1 ;
  me.style.zIndex = globalZ ;
})


aboutMeIcon.addEventListener('click',()=>{
  closeButtonAboutMe.classList.remove("pressed")
  closeButtonAboutMe.classList.add("not-pressed")
  globalZ +=1 ;
  aboutMe.style.zIndex = globalZ ;
})

projectIcon.addEventListener('click',()=>{
  closeButtonProject.classList.remove("pressed")
  closeButtonProject.classList.add("not-pressed")
  globalZ +=1 ;
  projectwindow.style.zIndex = globalZ ;
})

mineIcon.addEventListener('click',()=>{
  closeButtonMine.classList.remove("pressed")
  closeButtonMine.classList.add("not-pressed")
  globalZ +=1 ;
  mineWindow.style.zIndex = globalZ ;
  resetGame()
})

document.addEventListener("mousedown",(event)=>{
  if(event.target.classList.contains('draggable-bar') || event.target.id == 'about-me-bar' || event.target.id=='project-bar') {
    cursor = {
      x:event.clientX,
      y:event.clientY
    }

    window_move = {
      dom:event.target,
      x:event.target.parentNode.getBoundingClientRect().left,
      y:event.target.parentNode.getBoundingClientRect().top
    }
  }
})

document.addEventListener('mousemove',(event) => {
  if(window_move.dom==null) return;
  let currentCursor = {
    x: event.clientX,
    y: event.clientY
  }

  let distance = {
    x:currentCursor.x - cursor.x,
    y:currentCursor.y - cursor.y
  }

  window_move.dom.parentNode.style.left = (window_move.x + distance.x) + 'px'
  window_move.dom.parentNode.style.top = (window_move.y + distance.y) + 'px'

  window_move.dom.style.cursor = "grabbing" 

})

document.addEventListener('mouseup',()=>{
  if (window_move.dom != null){
  window_move.dom.style.cursor = "default";}
  window_move.dom=null

})


aboutMe.addEventListener('click',()=>{
  aboutMe.style.zIndex=2;
})

me.addEventListener('click',()=>{
  globalZ +=1 ;
  me.style.zIndex = globalZ ;
})

aboutMe.addEventListener('click',()=>{
  globalZ+=1;
  aboutMe.style.zIndex = globalZ;
})

projectwindow.addEventListener('click',()=>{
  globalZ+=1;
  projectwindow.style.zIndex = globalZ;
})

mineWindow.addEventListener('click',()=>{
  globalZ+=1;
  mineWindow.style.zIndex = globalZ;
})

cardMenuMe.addEventListener('click',()=>{
  if (me.style.zIndex < 0) {
    globalZ += 1;
    me.style.zIndex = globalZ ;
  } else {
    me.style.zIndex = -1;
  }
})

cardMenuAboutMe.addEventListener('click',()=>{
  if (aboutMe.style.zIndex < 0) {
    globalZ += 1;
    aboutMe.style.zIndex = globalZ ;
  } else {
    aboutMe.style.zIndex = -2;
  }
})

cardMenuProject.addEventListener('click',()=>{
  if (projectwindow.style.zIndex < 0) {
    globalZ += 1;
    projectwindow.style.zIndex = globalZ ;
  } else {
    projectwindow.style.zIndex = -3;
  }
})

cardMenuMine.addEventListener('click',()=>{
  if (mineWindow.style.zIndex < 0) {
    globalZ += 1;
    mineWindow.style.zIndex = globalZ ;
  } else {
    mineWindow.style.zIndex = -4;
  }
})

cardMenuTwitter.addEventListener('click',()=>{
  window.open('https://twitter.com/yeahmansingh', '_blank');
})


// MINE SWEEPER GAME LOGIC

const SIZE = 9;
const NUM_MINES = 10;

const board = document.getElementById('board');
const flagCount = document.getElementById('flag-count');
const gameStateButton = document.getElementById('game-state');
const timerDisplay = document.getElementById('time'); 

let state = 'running';
let FLAG = 10;
let timer = setInterval(setTime, 1000);

  // Intialize timer 
  function setTime(){
    let time = Number(timerDisplay.innerText)
    time += 1;
    timerDisplay.innerText = time < 10 ? `00${time}` : `0${time}`;
  }

  // Reset timer
  function resetTimer() {
    timerDisplay.innerText = '000';
    timer = setInterval(setTime, 1000);
  }

  // Helper: get box by coordinates
  function getBox(x, y) {
    return document.querySelector(`.box[data-x='${x}'][data-y='${y}']`);
  }

  // Place mines randomly
  function setMines() {
    let placed = 0;
    while (placed < NUM_MINES) {
      const x = Math.floor(Math.random() * SIZE);
      const y = Math.floor(Math.random() * SIZE);
      const box = getBox(x, y);
      if (box.dataset.state !== 'M') {
        box.dataset.state = 'M';
        placed++;
      }
    }
  }

  // Count adjacent mines
  function countMines(x, y) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < SIZE && j >= 0 && j < SIZE) {
          if (getBox(i, j).dataset.state === 'M') count++;
        }
      }
    }
    return count;
  }

  // Reveal all mines on loss
  function revealAllMines() {
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        const box = getBox(x, y);
        if (box.dataset.state === 'M') {
          showTile(box, 'assests/TileMine.png');
        }
      }
    }
  }

  // Display a tile image
  function showTile(box, src) {
    box.innerHTML = '';
    const img = document.createElement('img');
    img.src = src;
    box.appendChild(img);
  }

  // Set flag on right-click
  function setFlag(x,y){
    const box = getBox(x, y);
    if (state !== 'running') return;
    if (box.classList.contains(['revealed'])) return;
    if (box.classList.contains('flagged')) {
        box.classList.remove('flagged');
        showTile(box, 'assests/TileUnknown.png');
        FLAG += 1;
        flagCount.innerText = FLAG < 10 ? `00${FLAG}` : `0${FLAG}`;
    } else {
        if (FLAG <= 0) return;
        box.classList.add('flagged');
        showTile(box, 'assests/TileFlag.png');
        FLAG -= 1;
        flagCount.innerText = FLAG < 10 ? `00${FLAG}` : `0${FLAG}`;
    }
  }
  
  // Handle game state button
  function gameStateOver(){
    gameStateButton.innerHTML = ''
    const image = document.createElement('img');
    image.src = 'assests/over.png';
    image.style.width = '20px';
    image.style.height = '20px';
    gameStateButton.appendChild(image);
    state = 'over';
  }

  // Set game state on click
  function gameStateRunning(){
    gameStateButton.innerHTML = ''
    const image = document.createElement('img');
    image.src = 'assests/running.png';
    image.style.width = '20px';
    image.style.height = '20px';
    gameStateButton.appendChild(image);
    state = 'running';  
  }

  // Reset the game
  function resetGame() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const box = getBox(i, j);
        box.innerHTML = '';
        box.classList.remove('revealed', 'flagged');
        box.dataset.state = '';
        showTile(box, 'assests/TileUnknown.png');
      }
    }
    setMines();
    gameStateRunning();
    resetTimer();
    FLAG = 10;
    flagCount.innerText = FLAG < 10 ? `00${FLAG}` : `0${FLAG}`;
    
  }

  // Handle a click move
  function makeMove(x, y) {
    const box = getBox(x, y);
    if (state !== 'running') return;
    if (box.classList.contains('flagged')) return;
    if (box.classList.contains('revealed')) return;
    box.classList.add('revealed');

    if (box.dataset.state === 'M') {
      revealAllMines();
      showTile(box, 'assests/TileExploded.png');
      gameStateOver();
      clearInterval(timer);
    } else {
      const num = countMines(x, y);
      if (num > 0) {
        box.dataset.state = num;
        showTile(box, `assests/Tile${num}.png`);
      } else {
        showTile(box, 'assests/TileEmpty.png');
        // Flood-fill neighbors
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < SIZE && j >= 0 && j < SIZE) {
              makeMove(i, j);
            }
          }
        }
      }
    }
  }

  // Build the board grid
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const box = document.createElement('div');
      box.className = 'box';
      box.dataset.x = i;
      box.dataset.y = j;
      box.dataset.state = '';
      const img = document.createElement('img');
      img.src = 'assests/TileUnknown.png';
      box.appendChild(img);
      box.addEventListener('click', () => makeMove(i, j));
      box.addEventListener('contextmenu', (e) => {e.preventDefault(); setFlag(i,j);});
      board.appendChild(box);
    }
  }

  gameStateButton.addEventListener('click', () => {
    if (state === 'over') {
      resetGame();
    }
  });

  setMines();