import css from "./ContactList.module.css";
import { FaUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "/src/redux/contactsSlice.js";
import { createSelector } from "reselect";

export const ContactList = () => {
  const dispatch = useDispatch();

  // Використання мемоізованого селектора
  const filteredContactsSelector = createSelector(
    (state) => state.contacts.items,
    (state) => state.filters.name,
    (contacts, filter) =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
  );

  const filteredContacts = useSelector(filteredContactsSelector);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {filteredContacts.map((contact, index) => (
        <div key={index} className={css.contact}>
          <div className={css.name_number}>
            <p>
              <FaUser />
              {contact.name}
            </p>
            <p>
              <FaPhone />
              {contact.number}
            </p>
          </div>
          <button type="button" onClick={() => handleDelete(contact.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
