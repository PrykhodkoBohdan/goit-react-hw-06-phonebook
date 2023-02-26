export const getFilterContacts = ({contacts, filter}) => {

    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const visiblePhoneList = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });
    return visiblePhoneList;
  }