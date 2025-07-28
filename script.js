  const startButton = document.getElementById('start-button');

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