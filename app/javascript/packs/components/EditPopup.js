import React from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import UserSelect from './UserSelect';
import ModalWait from './ModalWait';
import {fetchJson} from './Fetch';
import {showAlert} from './ErrorsHandler';
import Routes from 'routes';

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
    fetchJson('GET', Routes.api_v1_task_path(cardId))
      .then(({data: task}) => {
        this.setState({task});
        this.setState({isLoading: false});
      })
      .catch(error => {
        this.setState({isLoading: false});
        this.props.onClose();
        showAlert('LOADING failed!', error);
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
    })
      .then(response => {
        this.props.onClose(this.state.task.state);
      })
      .catch(error => {
        showAlert('UPDATE failed!', error);
      });
  };

  handleCardDelete = () => {
    fetchJson('DELETE', Routes.api_v1_task_path(this.props.cardId))
      .then(response => {
        this.props.onClose(this.state.task.state);
      })
      .catch(error => {
        showAlert('DELETE failed!', error);
      });
  };

  handleAuthorChange = value => {
    this.setState({task: {...this.state.task, author: value}});
  };
  handleAssigneeChange = value => {
    this.setState({task: {...this.state.task, assignee: value}});
  };

  render() {
    const {onClose, show} = this.props;
    const {task} = this.state;
    if (this.state.isLoading) {
      return (
        <ModalWait show={show} onClose={onClose}>
          Your task is loading. Please be patient.
        </ModalWait>
      );
    }
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {task.id} [{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
              <FormGroup controlId="formAuthor">
                <ControlLabel>Author:</ControlLabel>
                <UserSelect
                  id="Author"
                  isDisabled={true}
                  value={task.author}
                  onChange={this.handleAuthorChange}
                />
              </FormGroup>
              <FormGroup controlId="formAssignee">
                <ControlLabel>Assignee:</ControlLabel>
                <UserSelect
                  id="Assignee"
                  onChange={this.handleAssigneeChange}
                  value={task.assignee}
                />
              </FormGroup>
            </form>
            Author: {task.author.first_name} {task.author.last_name}
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
