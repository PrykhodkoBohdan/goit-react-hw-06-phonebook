import { useState, useEffect } from 'react';
import Form from './Form/Form';
import Section from './Section/Sextion';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [contact, setContact] = useState(() => {
    const contact = JSON.parse(localStorage.getItem('my-contacts'));
    return contact ? contact : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contact));
  }, [contact]);

  const formSubmitHandler = data => {
    const isContactValid = validateContact(data, contact);

    if (isContactValid) {
      data.id = uuidv4();
      setContact(contact => {
        return [data, ...contact];
      });
    }
   
  };

  const validateContact = (data, contact) => {
        if (contact.some(({ name }) => name === data.name)) {
          alert(`${data.name} is already in contacts or number`);
          return false;
        } else return true;
      };

  const deleteContact = id => {
    setContact(prevContact => prevContact.filter(item => item.id !== id));
  };
  const handleSearch = ({ target }) => setFilter(target.value);

  const  getFiltredContacts = () => {

      if (!filter) {
        return contact;
      }
          const lowerCaseFilter = filter.toLowerCase();
          return contact.filter(person =>
            person.name.toLowerCase().includes(lowerCaseFilter),
          );
        }

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleSearch} />
        <Contacts
          contacts={getFiltredContacts()}
          onDeleteBtnClick={deleteContact}
        />
      </Section>
    </>
  );
};
export default App;



