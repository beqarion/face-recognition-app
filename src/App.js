import React, {useState, useEffect} from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
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
  const [imageUrl, setImageUrl] = useState('')
  const [boxes, setBoxes] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const loadUser = data => {
    setUser({
      ...user,
      ...data
    })
  }

  const calculateFaceLocations = (data) => {
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    const faceRegions = data.outputs[0].data.regions
    const faceLocationsArr = faceRegions.map(region => {
      const boundings = region.region_info.bounding_box
      return {
        id: region.id,
        leftCol: boundings.left_col * width,
        topRow: boundings.top_row * height,
        rightCol: width - (width * boundings.right_col),
        bottomRow: height - (boundings.bottom_row * height)
      }
    })
    return faceLocationsArr
  }

  const onRouteChange = (r) => {
    if ( r === 'home') {
      setIsSignedIn(true)
    } else {
      setIsSignedIn (false)
    }
    setRoute(r)
  }

  const updateFaceState = boxes => {
    setBoxes(boxes)
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }
  const onSubmit = () => {
    setImageUrl(input)
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            'method': 'put',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
              id:  user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUser({...user, entries: count})
          } )
        }
        updateFaceState(calculateFaceLocations(response))
      })
      .catch( err => {console.log(err)})
      
  }
  return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesOptions}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      { route === 'home'
        ? <div>
            <Logo /> 
            <Rank user={user} />
            <ImageLinkForm 
              onInputChange={onInputChange}
              onSubmit={onSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div> 
        : (route === 'signin'
          ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
          : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )} 
    </div>
  )
}

export default App
