  const startButton = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  let globalZ = 1;

  const me = document.getElementById("me");
  const meIcon = document.getElementById("me-icon");
  const closeButtonMe = document.getElementById('close-button-me');
  const draggablebar = document.getElementsByClassName('draggable-bar');
  
  const aboutMe = document.getElementById('contact-me-window');
  const closeButtonAboutMe = document.getElementById('close-button-about-me');
  const aboutMeIcon = document.getElementById('about-me-icon') 
  const aboutMeBar = document.getElementById('about-me-bar');

  const projectwindow = document.getElementById('project-window');
  const closeButtonProject = document.getElementById('close-button-projects');
  const projectIcon = document.getElementById('project-icon');
  const projectBar = document.getElementById('project-bar');

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

