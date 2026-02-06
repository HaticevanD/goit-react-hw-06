import { useSelector } from "react-redux";
import "./App.css";

import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";

import { selectContacts } from "./redux/contactsSlice";

function App() {
  const contacts = useSelector(selectContacts);

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>

      <ContactForm />

      {contacts.length > 0 && <SearchBox />}

      <ContactList />
    </div>
  );
}

export default App;
