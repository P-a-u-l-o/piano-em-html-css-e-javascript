//get all keys
const keys = document.querySelectorAll(".key");

//play notes
function playNote(event) {
    let audioKeyCode = getKeyCode(event);

    //typed or pressed key
    const key = document.querySelector(`.key[data-key='${audioKeyCode}']`);

    //if key exist its just a verification for do not return a error when a key that isn't on virtual keyboard i'll be pressed.
    const cantFoundAnyKey = !key;
    if (cantFoundAnyKey) {
        return;
    }
    playAudio(audioKeyCode);
    addPlayingClass(key);
}

//Add effects like key presses
function addPlayingClass(key) {
    key.classList.add("playing");
}

//This function do a verification when a key were pressed and remove the event of transition them.
function removePlayingClass(event) {
    event.target.classList.remove("playing");
}

//Get the code of the pressed key through the dataset check event
function getKeyCode(event) {
    let keyCode;
    const isKeyboard = event.type === "keydown";
    if (isKeyboard) {
        keyCode = event.keyCode;
    } else {
        keyCode = event.target.dataset.key;
    }
    return keyCode;
}

function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`);
    audio.currentTime = 0;
    audio.play();
}

//click with mouse
keys.forEach((key) => {
    key.addEventListener("click", playNote);
    key.addEventListener("transitionend", removePlayingClass);
});

//keyboard type
window.addEventListener("keydown", playNote);
