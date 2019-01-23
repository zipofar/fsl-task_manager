import React from 'react';
import Board from 'react-trello';
import {fetchJson} from './Fetch';
import LaneHeader from './LaneHeader';
import {Button} from 'react-bootstrap';
import AddPopup from './AddPopup';
import EditPopup from './EditPopup';
import Routes from 'routes';
import {showAlert} from './ErrorsHandler';

export default class TasksBoard extends React.Component {
  state = {
    addPopupShow: false,
    editPopupShow: false,
    editCardId: null,
    new_task: null,
    in_development: null,
    in_qa: null,
    in_code_review: null,
    ready_for_release: null,
    released: null,
    archived: null,
  };

  getLanesDefinition() {
    return {
      'new_task': {name: 'New', 'state_event': ''},
      'in_development': {name: 'In Dev', 'state_event': 'to_dev'},
      'in_qa': {name: 'In QA', 'state_event': 'to_qa'},
      'in_code_review': {name: 'in CR', 'state_event': 'to_code_review'},
      'ready_for_release': {name: 'Ready for release', 'state_event': 'to_ready_for_release'},
      'released': {name: 'Released', 'state_event': 'to_release'},
      'archived': {name: 'Archived', 'state_event': 'to_archived'},
    }
  }

  generateLane(id, title, state_event) {
    const tasks = this.state[id];

    return {
      id,
      title,
      state_event,
      total_count: tasks ? tasks.meta.total_count : 'None',
      cards: tasks
        ? tasks.items.map(task => {
            return {
              ...task,
              label: task.state,
              title: task.name,
            };
          })
        : [],
    };
  }

  getBoard(lanesDefinition) {
    const lanes = Object.keys(lanesDefinition).reduce((acc, key) => {
      const laneName = lanesDefinition[key]['name'];
      return [...acc, this.generateLane(key, laneName)];
    }, []);
    return {lanes};
  }

  loadLines(lanes) {
    for (const key in lanes) {
      this.loadLine(key);
    }
  }

  componentDidMount() {
    this.loadLines(this.getLanesDefinition());
  }

  loadLine(state, page = 1) {
    this.fetchLine(state, page).then(data => {
      this.setState({[state]: data});
    });
  }

  onLaneScroll = (requestedPage, state) => {
    return this.fetchLine(state, requestedPage).then(({items}) => {
      return items.map(task => {
        return {
          ...task,
          label: task.state,
          title: task.name,
        };
      });
    });
  };

  handleAddShow = () => {
    this.setState({addPopupShow: true});
  };

  handleAddClose = (added = false) => {
    this.setState({addPopupShow: false});
    if (added == true) {
      this.loadLine('new_task');
    }
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const state_event = this.getLanesDefinition()[targetLaneId]['state_event'];
    fetchJson(
      'PUT',
      Routes.api_v1_task_path(cardId, {task:{state_event}}),
    ).then(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  onCardClick = cardId => {
    this.setState({editCardId: cardId});
    this.handleEditShow();
  };

  handleEditClose = (edited = '') => {
    this.setState({editPopupShow: false, editCardId: null});
    switch (edited) {
      case 'new_task':
      case 'in_development':
      case 'in_qa':
      case 'in_code_review':
      case 'ready_for_release':
      case 'released':
      case 'archived':
        this.loadLine(edited);
        break;
      default:
        break;
    }
  };

  handleEditShow = () => {
    this.setState({editPopupShow: true});
  };

  fetchLine(state, page = 1) {
    return fetchJson(
      'GET',
      Routes.api_v1_tasks_path({
        q: {state_eq: state},
        page: page,
        per_page: 10,
      }),
    )
      .then(({data}) => {
        return data;
      })
      .catch(error => {
        showAlert('LOADING failed!', error);
      });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleAddShow}>
          Create new task
        </Button>
        <h1>Your tasks</h1>
        <Board
          data={this.getBoard(this.getLanesDefinition())}
          onLaneScroll={this.onLaneScroll}
          customLaneHeader={<LaneHeader />}
          cardsMeta={this.state}
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.onCardClick}
        />
        <AddPopup
          show={this.state.addPopupShow}
          onClose={this.handleAddClose}
        />
        <EditPopup
          show={this.state.editPopupShow}
          onClose={this.handleEditClose}
          cardId={this.state.editCardId}
        />
      </div>
    );
  }
}
