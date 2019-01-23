import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class ModalWait extends Component {
  render() {
    const {onClose, show} = this.props;
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
