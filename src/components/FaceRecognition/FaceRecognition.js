import React from 'react'
import './FaceRecognition.css'
import FaceFrame from '../FaceFrame/FaceFrame'


const FaceRecognition = ({ imageUrl, boxes}) => {
    
    return (
        <div className='center ma'>
            <div className='relative mt2'>
                <img id='inputimage' src={imageUrl} width='500px' height='auto' />
                {boxes.map( box => <FaceFrame box={box} key={box.id} />)}
            </div>
        </div>
    )
}

export default FaceRecognition