import { useState, useEffect } from 'react'
import LectureItem from './LectureItem'
export default function LecturePage() {


  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`https://boolean-api-server.fly.dev/hassanhussa1n/post`)
    .then(response => response.json())
    .then(setPosts)
    }, [])

   

  console.log(posts)

  return (
    <>
    <h1>Lectures</h1>
    <div>
      
      <div className='lectures-div'>
        <ul className='lectures-list'>
         {posts.map((lecture, index) => (
          <LectureItem post={lecture} key={index}/>


         ))}


        </ul>
      </div>
    </div>
    </>
  );
}
