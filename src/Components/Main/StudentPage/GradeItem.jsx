/* eslint-disable react/prop-types */
import { useState } from "react";

import axios from "axios";

export default function GradeItem(props) {
  const [selectedGrade, setSelectedGrade] = useState(props.gradeItem.grade);

  const handleChange = (event) => {
    setSelectedGrade(parseInt(event.target.value));
    props.setUpdateGrade({
      ...props.gradeItem,
      grade: Number(event.target.value),
    });
  };

  return (
    <li>
      <p>{props.gradeItem.name}</p>
      <form className="grade-form">
        <label>
          <span className="radio-number">0</span>
          <input
            type="radio"
            value="0"
            checked={selectedGrade === 0}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className="radio-number">1</span>
          <input
            type="radio"
            value="1"
            checked={selectedGrade === 1}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className="radio-number">2</span>
          <input
            type="radio"
            value="2"
            checked={selectedGrade === 2}
            onChange={handleChange}
          />
        </label>
      </form>
      <p className="curr-grade">Current Grade: {selectedGrade}</p>
    </li>
  );
}
