import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    const formData = Array.from(e.target.elements)
      .filter(el => el.name)
      .reduce((a, b) => ({
        ...a,
        [b.name]: b.value}), {});
    e.preventDefault();

    // replace with prefered ajax method
    console.log(`
     formData: ${JSON.stringify(formData)},
     url: ${this.props.apiURL},
     httpMethod: ${this.props.httpMethod},
     returnType: ${this.props.returnType}`);

    e.target.reset();
    return false;
  }

  render() {
    return <form
        className={this.props.className}
        onSubmit={this.handleSubmit}>
          {this.props.children}
        </form>
  }
}

Form.PropTypes = {
  apiURL: PropTypes.string.isRequired,
  httpMethod: PropTypes.string.isRequired,
  returnType: PropTypes.string.isRequired,
  className: PropTypes.object.isRequired,
}
