window.addEventListener('load', function() {

    //Video container
    video = document.getElementById('video');
    screenButton = document.getElementById('screen-button');
    pauseScreen = document.getElementById('screen');

    //Progress bar container
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');
    
    //Button container
	playButton = document.getElementById('play-button');
    playToo = document.getElementById('video');
    timeField = document.getElementById('time-field');
    soundButton = document.getElementById('sound-button');
    sbarContainer = document.getElementById('sbar-container');
    sbar = document.getElementById('sbar');
    fullScreenButton = document.getElementById('fullscreen-button');

    
        //Eventlisteners from all the buttons
	   video.load();
	   video.addEventListener('canplaythrough', function() {
            
            playButton.addEventListener('click', playOrPause, false);
            playToo.addEventListener('click',playOrPause, false);
            pbarContainer.addEventListener('click',skip, false);
            soundButton.addEventListener('click',muteOrUnmute, false);
            sbarContainer.addEventListener('click', changeVolume, false);
            fullScreenButton.addEventListener('click', fullScreen,false); 
            screenButton.addEventListener('click', playOrPause, false);
            updatePlayer();
        
	   }, false);

}, false);

function playOrPause() {
	if (video.paused) {
		video.play();
		playButton.src = 'view/img/pause.png';
        update = setInterval(updatePlayer,10);
        
        pauseScreen.style.display = 'none';
        screenButton.src = 'view/img/play.png';
	} else {
		video.pause();
		playButton.src = 'view/img/play.png';
        window.clearInterval(update);
        
        pauseScreen.style.display = 'block';
        screenButton.src = 'view/img/play.png';
	}
}

function updatePlayer() {
    var percentage = (video.currentTime/video.duration)*100;
    pbar.style.width = percentage + '%'; 
    timeField.innerHTML = getFormattedTime();    
    if(video.ended) {
        window.clearInterval(update);
        playButton.src = 'view/img/replay.png';
        
        pauseScreen.style.display = 'block';
        screenButton.src = 'view/img/replay.png';
    }   else if(video.paused) {
            playButton.src = 'view/img/play.png';
            screenButton.src = 'view/img/play.png';
        }
}

function skip(ev) {
    var mouseX = ev.pageX - pbarContainer.offsetLeft;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0,width.length -2));
    video.currentTime = (mouseX/width)*video.duration;
    updatePlayer();
}

function getFormattedTime() {
    //var seconds = video.currentTime;
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds/60);
    if(minutes > 0) {seconds -= minutes * 60;}
    if(seconds.toString().length === 1) {   seconds = '0' + seconds; }
    
    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds/60);
    if(totalMinutes > 0) {totalSeconds -= totalMinutes * 60;}
    if(totalSeconds.toString().length === 1) {totalSeconds = '0' + seconds;}
    
    return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
    
    if(!(video.muted)) {
        video.muted = true;
        soundButton.src = 'view/img/mute.png'; 
        sbar.style.display = 'none';
    }   else {
            video.muted = false;
            soundButton.src = 'view/img/sound.png';        
            sbar.style.display = 'block';
        }
}

function changeVolume(ev) {
    var mouseX = ev.pageX - sbarContainer.offsetLeft;
    var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0,width.length - 2));

    video.volume = (mouseX/width);
    sbar.style.width = (mouseX/width) * 100 + '%';
    video.muted = false;
    soundButton.src = 'view/img/sound.png';        
    sbar.style.display = 'block';
}

function fullScreen() {
    if(video.requestFullscreen) {
        video.requestFullscreen();
    }   else if(video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }   else if(video.mozRequestFullscreen) {
                video.mozRequestFullscreen();
            }   else if(video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }   else {
                        document.alert("Your webbrowser doesnt support a video player!");
                    }
}


