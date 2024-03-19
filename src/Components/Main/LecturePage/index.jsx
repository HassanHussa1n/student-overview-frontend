import { useState, useEffect } from 'react'
import LectureItem from './LectureItem'
export default function LecturePage() {


  const [lectures, setLectures] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/lecture`)
    .then(response => response.json())
    .then(setLectures)
    }, [])

   

  console.log(lectures)

  return (
    <>
    <h1>Lectures</h1>
    <div>
      
      <div className='lectures-div'>
        <ul className='lectures-list'>
         {lectures.map((lecture, index) => (
          <LectureItem lecture={lecture} key={index}/>


         ))}


        </ul>
      </div>
    </div>
    </>
  );
}
