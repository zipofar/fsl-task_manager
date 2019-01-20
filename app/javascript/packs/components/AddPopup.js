import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import {fetch} from './Fetch';
import UserSelect from './UserSelect';
import {showAlert} from './ErrorsHandler';

export default class EditPopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
    },
  };

  handleNameChange = e => {
    this.setState({name: e.target.value});
  };

  handleDecriptionChange = e => {
    this.setState({description: e.target.value});
  };

  handleAssigneeChange = value => {
    this.setState({assignee: value});
  };

  handleCardAdd = () => {
    const {show, onClose} = this.props;
    const {name, description, assignee_id} = this.state;
    fetch('POST', Routes.api_v1_tasks_path(), {
      task: {name, description, assignee_id},
    }).then(response => {
      if (response.statusText == 'Created') {
        onClose(true);
      } else {
        showAlert('', response);
      }
    });
  };

  render() {
    const {show, onClose} = this.props;
    const {name, description} = this.state;
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>New task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="formUser">
                <ControlLabel>Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={this.state.assignee}
                />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardAdd}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
