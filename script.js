  const startButton = document.getElementById('start-button');

  const me = document.getElementById("me");
  const meIcon = document.getElementById("me-icon");
  const closeButtonMe = document.getElementById('close-button-me');
  
  const aboutMe = document.getElementById('contact-me-window');
  const closeButtonAboutMe = document.getElementById('close-button-about-me');
  const aboutMeIcon = document.getElementById('about-me-icon') 


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
        startButton.classList.remove("not-pressed")
        startButton.classList.add("pressed")
    } else {
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

meIcon.addEventListener('click',()=>{
  closeButtonMe.classList.remove("pressed")
  closeButtonMe.classList.add("not-pressed")
  me.style.zIndex = 1 ;
})


aboutMeIcon.addEventListener('click',()=>{
  closeButtonAboutMe.classList.remove("pressed")
  closeButtonAboutMe.classList.add("not-pressed")
  aboutMe.style.zIndex = 2 ;
})


document.addEventListener("mousedown",(event)=>{
  if(event.target.classList.contains('draggable-bar')){
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
  window_move.dom.style.cursor = "default" 
  window_move.dom=null

})


aboutMe.addEventListener('click',()=>{
  aboutMe.style.zIndex=2;
})

