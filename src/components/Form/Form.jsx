import {useState} from 'react';
import PropTypes from 'prop-types'
import initialState from './initialState';
import css from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';


const Form = ({onSubmit})=> {

const [state, setState] = useState({...initialState})

 const nameId = uuidv4();

    const handleInputChange = ({target}) => {
        const {name, value} = target;
        setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({...state});
        setState({...initialState});
    }

  const {name, number} = state;
    
 return (
        <div className={css.container}>
          <form className={css.form} onSubmit={handleSubmit}>
            <label htmlFor={nameId}>
              <p className={css.form__label}>Name</p>
              <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                className={css.form__firstInput}
                value={name}
                onChange={handleInputChange}
                id={nameId}
                placeholder="Enter name"
                required
              ></input>
            </label>
            <label>
              <p className={css.form__label}>Number</p>
              <input
                type="tel"
                name="number"
                value={number}
                onChange={handleInputChange}
                maxLength="9"
                minLength="7"
                pattern="[0-9]{3}-{0,1}[0-9]{2}-{0,1}[0-9]{2}"
                required
                placeholder="123-45-67"
              ></input>
            </label>
            <button
              className={css.form__button}
              type="submit"
              disabled={name === '' || number === ''}
            >
              Add contact
            </button>
          </form>
        </div>
      );
 }



 
    export default Form;

    Form.propTypes = {
      onSubmit: PropTypes.func.isRequired
  }
