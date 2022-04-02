import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowImg from '../../assets/images/icons/arrow.svg';
import editImg from '../../assets/images/icons/edit.svg';
import trashImg from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import {
  Card, Container, Header, InputSearchContainer, ListHeader,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())),
    [searchTerm, contacts],
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const response = await fetch('https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts');
        const data = await response.json();
        setContacts(data);
      } catch (err) { console.log('Request:', err); } finally { setIsLoading(false); }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          type="text"
          placeholder="Search Contact"
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' Contact' : ' Contacts'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrowImg} alt="sort" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={editImg} alt="edit" />
            </Link>
            <button type="button">
              <img src={trashImg} alt="delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
