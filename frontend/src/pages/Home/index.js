/* eslint-disable react/jsx-one-expression-per-line */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import arrowImg from '../../assets/images/icons/arrow.svg';
import editImg from '../../assets/images/icons/edit.svg';
import sad from '../../assets/images/icons/sad.svg';
import trashImg from '../../assets/images/icons/trash.svg';
import emptyBoxImg from '../../assets/images/icons/empty-box.svg';
import magnifierQuestionImg from '../../assets/images/icons/magnifier-question.svg';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())),
    [searchTerm, contacts],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ContactsService.loadContacts(orderBy);
      setHasError(false);
      setContacts(data);
    } catch (err) {
      setHasError(true);
    } finally { setIsLoading(false); }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Search Contact"
          />
        </InputSearchContainer>
      )}
      <Header justifyContent={
        // eslint-disable-next-line no-nested-ternary
        hasError ? 'flex-end' : (
          contacts.length > 0 ? 'space-between' : 'center'
        )
        }
      >
        {(!hasError && contacts.length > 0) && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' Contact' : ' Contacts'}
        </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type="button" onClick={loadContacts}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>

          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBoxImg} alt="empty-box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1 && !isLoading) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestionImg} alt="magnifier-question" />
              <span>
                Não encontramos nenhum contato para <strong>{searchTerm}</strong>
              </span>
            </SearchNotFoundContainer>
          )}
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
        </>
      )}
    </Container>
  );
}
