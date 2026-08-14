import songs from "./db.js";

const play = document.getElementById("play");
const pause = document.getElementById("pause");
const previos = document.getElementById("previos");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const musicList = document.getElementById("musicList");
const songProgress = document.getElementById("songProgress");
const songRealTime = document.getElementById("songRealTime");
const volumem_range = document.getElementById("volumem_range");

function music(){                     /* main function */

    const audio = new Audio();

    let isplaying = false;
    let currentSongIndex = 0;
    let volumenValue = 0.5;

    pause.addEventListener('click',togglePlay);
    play.addEventListener('click',togglePlay);
    previos.addEventListener('click',previousSong);
    next.addEventListener('click',nextSong);
    volumem_range.addEventListener("input",volumen);



    function togglePlay(){               /* toggle play and pause */

        isplaying = !isplaying;

        if(isplaying){
            pause.style.display = "block";
            play.style.display = "none";
            playSong();
            
            
        }else{
            pause.style.display = "none";
            play.style.display = "block";
            pauseSong();
            
           
        }
    };




    songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent =`Title : ${song.title}`;
            musicList.appendChild(li);
    });


    

    function loadSong(song){
        audio.src = song.src;
    }

    function playSong(){
        audio.play();
        isplaying = true;
    }

    function pauseSong(){
        audio.pause();
        isplaying = false;
    }

    function volumen(){
        audio.volume = volumem_range/100;
    }

    function songTimer(){
        return audio.duration;
    }

    function songCurrentTime(){
        return audio.currentTime;
    }


    audio.addEventListener('timeupdate',()=>{ /* Song timer fixing */
        const currentTime = audio.currentTime;
       /*  console.log(Math.floor(currentTime)); */
        const duration = audio.duration;
       /*  console.log( Math.floor(duration)); */

       const minutestimer = Math.floor(currentTime / 60);
const secondsTimer = Math.floor(currentTime % 60);

const timer = `${minutestimer}:${secondsTimer.toString().padStart(2, "0")}`;

console.log(timer);
 songProgress.textContent = timer;

       const minutes = Math.floor(duration / 60);
const seconds = Math.floor(duration % 60);

const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;

console.log(time);
songRealTime.textContent = time;



       
        if(duration){
            const progressPercent = (currentTime/duration)*100;
            progress.value = progressPercent;
            let updateNumber =  Math.round((currentTime / duration)*100)+"%";

            /*  songProgress.textContent = updateNumber; */
        }
    })

    progress.addEventListener('input',()=>{
        const duration = audio.duration;
        audio.currentTime = (progress.value/100)* duration;
    })


    function nextSong(){
        currentSongIndex++;

        if(currentSongIndex >= songs.length){
            currentSongIndex = 0;
        }

        loadSong(songs[currentSongIndex]);
        playSong();
    }

     function previousSong(){
        currentSongIndex--;

        if(currentSongIndex < 0){
            currentSongIndex = songs.length -1
        }

        loadSong(songs[currentSongIndex]);
        playSong();
    }


    audio.addEventListener('ended',()=>{
        nextSong();
    })


    loadSong(songs[currentSongIndex]);


}

music();