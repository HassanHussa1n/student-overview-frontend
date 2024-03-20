import { useState, useEffect, useContext } from "react";
import LectureItem from "./LectureItem";
import { MyContext } from "../../../App";
export default function LecturePage() {
  const { currentClassroom } = useContext(MyContext);

  return (
    <>
      <h1>Lectures</h1>
      <div>
        <div className="lectures-div">
          {currentClassroom ? (
            <ul className="lectures-list">
              {currentClassroom.lectures.map((lecture, index) => (
                <LectureItem lecture={lecture} key={index} />
              ))}
            </ul>
          ) : (
            <p>Choose a classroom!</p>
          )}
        </div>
      </div>
    </>
  );
}
