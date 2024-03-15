export default function HomePage() {
  const handleSubmit = () => {
    localStorage.removeItem("loggedInId");
  };
  return (
    <div>
      <h1>This should work </h1> <button onClick={handleSubmit}>Log out</button>
    </div>
  );
}
