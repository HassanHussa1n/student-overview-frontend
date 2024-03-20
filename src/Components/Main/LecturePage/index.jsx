import { useState, useEffect, useContext } from "react";
import LectureItem from "./LectureItem";
import { MyContext } from "../../../App";
export default function LecturePage() {
  const { lectures, currentClassroom } = useContext(MyContext);

  console.log("Lectures:", lectures);

  return (
    <>
      <h1>Lectures</h1>
      <div>
        <div className="lectures-div">
          {currentClassroom ? (
            <ul className="lectures-list">
              {lectures.map((lecture, index) => (
                <LectureItem lecture={lecture} key={index} />
              ))}
            </ul>
          ) : (
            <p>Empty classroom</p>
          )}
        </div>
      </div>
    </>
  );
}
