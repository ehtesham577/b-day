const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 normal
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 confused
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",             // 2 pleading
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",             // 3 sad
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 sadder
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",             // 5 devastated
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",               // 6 very devastated
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 crying runaway
]

const noMessages = [
    "Not Eating Properly 😐",
    "Lack Of Sleep 🙄",
    "Overthinking 😑",
    "Lots of Stress 🥲",
    "Depression 😐",
    "Not expressing 😒",
    "Very Bad Miya🤐",
    "Weightloss 😑",
    "Not taking care of yourself 😕",
    "Ignoring yourMiya☹️"
]

const yesMessages = [
    "I love How you care about me more than yourself ☺️",
    "I love it when you're happy because of me 😊",
    "I love you when you make all the time for me even when you have everything to manage♥️",
    "I dont love how you hide your issues from me and act like nothing happened. \n Am I that bad??🤔",
    "Do you think you're alone?? \n Your miya is not going to leave alone even for a second ☺️",
    "You should know that-- You own my heart and my mind infact you own me totally I'm All yours ♥️",
    "You make me happy and just a thought of you makes me smile☺️",
    "You think I'm ignoring you? \n Can't even think of a moment without you in it 😘",
    "Need you!! \n come fast to me 🥺",
    "You're my Everything forever ♥️"
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0
let ycount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    ycount++;
    if (ycount<=10) {
        // Tease her to try No first
        const msg = yesMessages[Math.min(yesTeasedCount, yesMessages.length - 1)]
        yesTeasedCount++
        showyesMessage(msg)
        //showTeaseMessage(msg)
        return
    }
    else if(ycount<=9 && noClickCount>=10)
    {
        showyesMessage("I'm Worried about you!! \n Let's see myConfessions!")
        return
    }
    else if(ycount>=10 && noClickCount<=9)
    {
        showyesMessage("Very much in Love with you!!\n Let's see myConcerns!")
        return
    }
    if(ycount>=10 && noClickCount>=10)
    { 
        window.location.href = 'yes.html'
    }
}
function showyesMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 7500)
}
function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.innerHTML = msg.split('\n').join('<br>')
    //toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 7500)
}

function handleNoClick() {
    noClickCount++
     if (noClickCount<=10) {
    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    //noBtn.textContent = noMessages[msgIndex]
    const msg = noMessages[Math.min(msgIndex, noMessages.length - 1)]
    showTeaseMessage(msg)
    //showyesMessage(msg)
    return
     }
    else if(ycount<=9 && noClickCount>=10)
    {
        showyesMessage("I'm Worried about you!! \n Let's see myConfessions!")
        return
    }
    else if(ycount>=10 && noClickCount<=9)
    {
        showyesMessage("Very much in Love with you!!  \n Let's see myConcerns!")
        return
    }
    if(ycount>=10 && noClickCount>=10)
    { 
        window.location.href = 'yes.html'
    }

    // Grow the Yes button bigger each time
  /*  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(1 + noClickCount * 2, 10)
    const padX = Math.min(2 + noClickCount * 5, 20)
    yesBtn.style.padding = `${padY}px ${padX}px

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }*/

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 10 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
   }

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
