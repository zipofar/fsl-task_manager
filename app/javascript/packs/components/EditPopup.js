import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import UserSelect from './UserSelect';
import {fetchJson} from './Fetch';
import {showAlert} from './ErrorsHandler';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
    },
    isLoading: true,
  };

  loadCard = cardId => {
    this.setState({isLoading: true});
    fetchJson('GET', Routes.api_v1_task_path(cardId)).then(({data: task}) => {
      this.setState({task});
      this.setState({isLoading: false});
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    }
  }

  handleNameChange = e => {
    this.setState({task: {...this.state.task, name: e.target.value}});
  };

  handleDecriptionChange = e => {
    this.setState({task: {...this.state.task, description: e.target.value}});
  };

  handleCardEdit = () => {
    fetchJson('PUT', Routes.api_v1_task_path(this.props.cardId), {
      ...this.state.task,
    }).then(response => {
      if (response.statusText == 'OK') {
        this.props.onClose(this.state.task.state);
      } else {
        showAlert('Update failed!', response);
      }
    });
  };

  handleCardDelete = () => {
    fetchJson('DELETE', Routes.api_v1_task_path(this.props.cardId)).then(
      response => {
        if (response.statusText == 'OK') {
          this.props.onClose(this.state.task.state);
        } else {
          showAlert('DELETE failed!', response);
        }
      },
    );
  };

  handleAuthorChange = value => {
    this.setState({task: {...this.state.task, author: value}});
  };
  handleAssigneeChange = value => {
    this.setState({task: {...this.state.task, assignee: value}});
  };

  render() {
    const {onClose, show} = this.props;
    if (this.state.isLoading) {
      return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {this.state.task.id} [{this.state.task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="formAuthor">
                <ControlLabel>Author:</ControlLabel>
                <UserSelect
                  id="Author"
                  isDisabled={true}
                  value={this.state.task.author}
                  onChange={this.handleAuthorChange}
                />
              </FormGroup>
              <FormGroup controlId="formAssignee">
                <ControlLabel>Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={this.state.task.assignee}
                />
              </FormGroup>
            </form>
            Author: {this.state.task.author.first_name}{' '}
            {this.state.task.author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
