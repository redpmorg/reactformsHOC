import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

const formHandler = (APIConfig) => (Component) => {
  return() => {

    const {apiURL, method='POST', returnType} = APIConfig;

    function handleSubmit(e) {
      const formData = Array.from(e.target.elements)
      .filter(el => el.name)
      .reduce((a, b) => ({...a, [b.name]: b.value}), {});
      e.preventDefault();


      // replace with prefered ajax method
      console.log(`
       formData: ${JSON.stringify(formData)},
       url: ${apiURL},
       httpMethod: ${method},
       returnType: ${returnType}`
     );
/*     axios({
       url: apiURL,
       method: method,
       returnType: returnType
     }).then(function(result){
         // simple without Redux
       _this.setState({
          data: result.data
          e.target.reset();
      });
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
