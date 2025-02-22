import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <Link to="/">Contacts List</Link>
          <br />
          <Link to="/contacts/add">Add New Contact</Link>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/view/:id" element={<ContactsView />} />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
