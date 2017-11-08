import React, {Component} from 'react';
import PropTypes from 'prop-types';
import formHandler from './HOC/formHandler';
import styles from './formStyles.css';

const MyForm = (props) => {
  return (<div className={styles.body}>
    <h1>Submit forms - with HOC</h1>
    <form onSubmit={props.submitForm} className={styles.form}>
      <input type="text" name="name" placeholder="Name" className={styles.input}/>
      <input type="text" name="address" placeholder="Address" className={styles.input}/>
      <textarea name="story" placeholder="Your Story" className={styles.input}></textarea>
      <input id="submit" type="submit" value="Submit" className={styles.button}/>
    </form>
  </div>);
}

React.PropTypes = {
  className: PropTypes.string
}

let apiConfig = {
  apiURL: 'http://localhost:8080/items',
  returnType: 'JSON'
}

export default formHandler(apiConfig)(MyForm);
