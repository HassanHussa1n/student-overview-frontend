export default function StudentItem(props) {
  return (
    <li>
      <p>{props.student.lastName}</p>
      <button>View</button>
    </li>
  );
}
