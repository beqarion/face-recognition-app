import React, {useState, useEffect} from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import './App.css'

import Clarifai from 'clarifai'
const app = new Clarifai.App({
 apiKey: "ac1729bda4bc40a4ab9e5f4f45fb1c31"
});

const particlesOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('')

  const onInputChange = (event) => {
    setInput(event.target.value)
  }
  const onSubmit = () => {
    console.log('asdf')
    app.models.predict("d02b4508df58432fbb84e800597b8959", 'https://samples.clarifai.com/face-det.jpg').then(
      function(response) {
        console.log(response)
      },
      function(err) {
        console.log('error: ', err)
      }

    )
  }
  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      <FaceRecognition />
    </div>
  )
}

export default App
