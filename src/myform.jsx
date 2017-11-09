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
