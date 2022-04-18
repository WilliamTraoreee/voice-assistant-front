var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

const wordsContainer = document.querySelector('.results')

const recognition = new SpeechRecognition();

recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true

document.addEventListener('DOMContentLoaded', () => {
  recognition.start();
})
recognition.onresult = function(event) {
  const results = event.results
  const words = results[results.length - 1][0].transcript 
  tuvasbien(words)
  openApp(words)
}

const speech = speechSynthesis
//speech.lang = 'fr-FR'

const tuvasbien = (words) => {
  if (words.trim() === 'Fabrice tu vas bien') {
    console.log('ok')
    const utterThis = new SpeechSynthesisUtterance('Bien et toi ?');
    speechSynthesis.speak(utterThis);
  }
}

const openApp = (words) => {
  if(words.toLowerCase().includes('fabrice ouvre')) {
    const split = words.split(' ')
    const app = split[split.length - 1]

    const url = 'http://localhost:12345/open-app'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ app: app })
    }

    fetch(url, options)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
}