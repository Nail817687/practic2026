import { createContext, useEffect, useState } from "react";

export let StudentsContext = createContext();

export default function StudentProvider({ children }) {
  let [students, setStudents] = useState([]);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
}
