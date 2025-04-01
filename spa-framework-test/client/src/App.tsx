import { useEffect, useState } from "react";
import "./App.css";
import { NavLink } from "react-router";
import { useSimpleParams } from "./useSimpleParams";

// type ISections

function App() {
  const { section, sectionValue } = useSimpleParams();
  const [sections, setSections] = useState<Record<string, string | undefined>>(
    section
      ? {
          [section]: sectionValue,
        }
      : {}
  );

  useEffect(() => {
    if (section && sections[section] !== sectionValue) {
      setSections((prev) => ({ ...prev, [section]: sectionValue }));
    }
  }, [section, sectionValue]);

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <div>section: {section}</div>
        <div>route: {sections.route}</div>
        <div>station: {sections.station}</div>
        <div>plan: {sections.plan}</div>
      </div>
      <NavLink to="/route/1">go to route 1</NavLink>
      <NavLink to="/station/1">go to station 1</NavLink>
      <NavLink to="/plan/1">go to plan 1</NavLink>
      <NavLink to="/route/2">go to route 2</NavLink>
      <NavLink to="/station/2">go to station 2</NavLink>
      <NavLink to="/plan/2">go to plan 2</NavLink>
      <NavLink to="/route/3">go to route 3</NavLink>
      <NavLink to="/station/3">go to station 3</NavLink>
      <NavLink to="/plan/3">go to plan 3</NavLink>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
