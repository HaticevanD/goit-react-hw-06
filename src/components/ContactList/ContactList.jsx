import { useSelector } from "react-redux";
import css from "./ContactList.module.css";

import Contact from "../Contact/Contact";

// Selector'ları import et (yolunu kendi yapına göre kontrol et)
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  // Calculate the filtered list here
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className={css.container}>
      <h2 className={css.sectionTitle}>Contacts</h2>

      {visibleContacts.length === 0 ? (
        <p className={css.emptyMessage}>
          {contacts.length === 0 ? "No contacts yet." : "No matching contacts."}
        </p>
      ) : (
        <ul className={css.list}>
          {visibleContacts.map((contact) => (
            <li key={contact.id} className={css.listItem}>
              <Contact
                name={contact.name}
                number={contact.number}
                id={contact.id} // direct id for contact
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
