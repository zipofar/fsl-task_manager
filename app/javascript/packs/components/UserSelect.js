import React, {Component} from 'react';
import AsyncSelect from 'react-select/lib/Async';
import {fetchJson} from './Fetch';
import Routes from 'routes';
import {showAlert} from './ErrorsHandler';

export default class UserSelect extends Component {
  state = {
    inputValue: '',
  };
  getOptionLabel = option => {
    return option.first_name + ' ' + option.last_name;
  };
  getOptionValue = option => {
    return option.id;
  };
  loadOptions = inputValue => {
    return fetchJson(
      'GET',
      Routes.api_v1_users_path({q: {first_name_or_last_name_cont: inputValue}}),
    )
      .then(({data}) => {
        return data.items;
      })
      .catch(error => {
        showAlert('LOAD failed!', error);
      });
  };
  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({inputValue});
    return inputValue;
  };
  componentDidMount() {
    this.loadOptions();
  }
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          defaultValue={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
