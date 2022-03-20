import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export function Modal({ danger }) {
  return ReactDom.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Modal</h1>
        <p>aaaaaaaaaaaaa</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
