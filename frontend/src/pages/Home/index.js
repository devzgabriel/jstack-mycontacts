import { Link } from 'react-router-dom';
import arrowImg from '../../assets/images/icons/arrow.svg';
import editImg from '../../assets/images/icons/edit.svg';
import trashImg from '../../assets/images/icons/trash.svg';
import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Search Contact" />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrowImg} alt="sort" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Mateus SIlva</strong>
              <small>instagram</small>
            </div>
            <span>devzgabriel@gmail.com</span>
            <span>(41) 99999-9999</span>
          </div>

          <div className="actions">
            <Link href="/edit/1">
              <img src={editImg} alt="edit" />
            </Link>
            <button type="button">
              <img src={trashImg} alt="delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
