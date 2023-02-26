
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice'; 
import { getFilterContacts } from 'redux/contacts/contacts-selector';
import { getFilter } from 'redux/filter/filter-selector'; 
import { setFilter } from 'redux/filter/filter-slice'; 

import Form from './Form/Form';
import Section from './Section/Sextion';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filteredContacts = useSelector(getFilterContacts);
  const filter = useSelector(getFilter);

  const handleFormSubmit = ({ name, number }) => {
    const isContactExists = contacts.some(
      (contact) => contact.name === name
    );

    if (isContactExists) {
      console.log('Contact already exists');
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={handleFormSubmit} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={({ target }) => dispatch(setFilter(target.value))} />
        <Contacts
          contacts={filteredContacts}
          onDeleteBtnClick={handleDeleteContact}
        />
      </Section>
    </>
  );
};

export default App;



