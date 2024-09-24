import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>This is header</header>
      <main>
        <Outlet />
      </main>
      <footer>This is footer</footer>
    </>
  );
}

export default App;
