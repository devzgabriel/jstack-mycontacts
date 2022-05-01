import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import ContactsService from '../../services/ContactsService';
import { formatPhone } from '../../utils/formatPhone';
import { isEmailValid } from '../../utils/isEmailValid';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';

export default function ContactForm({ buttonLabel }) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const {
    errors, getErrorMessageByFieldName, removeError, setError,
  } = useErrors();
  const isFormValid = name && errors.length === 0;

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await CategoriesService.loadCategories();
        setCategories(data);
      } catch (err) { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value.length) {
      setError({ field: 'name', message: 'Name is required' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Email is invalid' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await ContactsService.createContacts({
      name,
      email,
      phone,
      categoryId,
    });
    // eslint-disable-next-line no-alert
    alert('Contact created successfully!');
    history.push('/');
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
          {categories.map(({ id, name: categoryName }) => (
            <option key={id} value={id}>{categoryName}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
