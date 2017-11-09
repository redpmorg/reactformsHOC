# React Forms #
### enctype :: application/x-www-form-urlencoded ###

## Simple method to serialize form elements with HOC

[React doc](https://reactjs.org/docs/forms.html) provide a simple method to handle inputs:

```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
      alert('Number of guests is: ' + this.state.numberOfGuests);
      event.preventDefault();
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
Then in [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html), React provide a smarter method but warning us about the drawbacks of uncontrolled components, where the form data is handled by DOM. The advantage is with this new method we don't need to write an event handler for every state update, but still we should add some lambda functions to any form element.

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (formData) => {
    console.log("Do something with form data", formData);
  }

  render() {
    let formData = {};
    return (
      <form onSubmit = e => {
        e.preventDefault();
        this.handleSubmit(formData);
        e.target.reset();
      }>
        <input type="text" name="firstname" ref={node => formData.firstname = node.value} />
        <input type="text" name="lastname" ref={node => formData.lastname = node.value} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
We propose a very simple approach by handle form data by High Order Components:

```javascript
/* ./src/myform.jsx */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formHandler from './HOC/formHandler';

const MyForm = (props) => {
  return (<div>
    <form onSubmit={props.submitForm}>
      <input type="text" name="name" placeholder="Name"/>
      <input type="text" name="address" placeholder="Address"/>
      <textarea name="story" placeholder="Your Story"></textarea>
      <input type="submit" value="Submit"/>
    </form>
  </div>);
}

React.PropTypes = {
  className: PropTypes.string
}

let apiConfig = {
  apiURL: 'http://localhost:8080/items',
  httpMethod: 'POST' //default POST
  returnType: 'JSON'
}

export default formHandler(apiConfig)(MyForm);
```

```javascript
/* ./src/HOC/formHandler.js */

import React from 'react';
import PropTypes from 'prop-types';

const formHandler = (APIConfig) => (Component) => {
  return() => {

    const {apiURL, method='POST', returnType} = APIConfig;

    function handleSubmit(e) {
      const formData = Array.from(e.target.elements)
      .filter(el => el.name)
      .reduce((a, b) => ({...a, [b.name]: b.value}), {});
      e.preventDefault();

      console.log(`formData: ${JSON.stringify(formData)}, url: ${apiURL},
       httpMethod: ${method},returnType: ${returnType}`);
      /* Make an ajax call ...
       axios({
        url: apiURL,
        method: method,
        returnType: returnType
       }).then(function(result) {
          console.log(result);
          e.target.reset();
       });
     */
      e.target.reset();
      return false;
    }

    return (<Component submitForm={handleSubmit}/>);
  }
}

formHandler.PropTypes = {
  Component: PropTypes.object.isRequired
}

export default formHandler;
```

Other approach is the Container way. We can use a new React element as container and add business logic to it:

```javascript
/* ./src/myform.jsx */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './formStyles.css';
import Form from './Containers/abstractForm';

const MyForm = (props) => {
  let apiConfig = {
    apiURL: 'http://localhost:8080/items',
    httpMethod: 'POST',
    returnType: 'JSON'
  }

  return (
    <Form className={styles.form} {...apiConfig}>
      <input type="text" name="name" placeholder="Name" className={styles.input}/>
      <input type="text" name="address" placeholder="Address" className={styles.input}/>
      <textarea name="story" placeholder="Your Story" className={styles.input}></textarea>
      <input id="submit" type="submit" value="Submit" className={styles.button}/>
    </Form>
  );
}

MyForm.PropTypes = {
  className: PropTypes.string
}

export default MyForm;
```

The Form container:
```javascript
/* ./src/Containers/abstractForm.jsx */

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
```

Regards,

LL
