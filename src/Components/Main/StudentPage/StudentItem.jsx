export default function StudentItem(props) {
  return (
    <li>
      <p>{props.student.lastName}</p>
      <button className="view-btn">View</button>
    </li>
  );
}
