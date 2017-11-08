import React from 'react';
import enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MyForm from '../src/myform';

enzyme.configure({adapter: new Adapter()});

describe('<MyForm/>', () => {
  it('fires form submit', () => {
    const form = mount(<MyForm/>).find('form');
    form.find('input[name="name"]').instance().value = 'Leonard LEPADATU';
    form.find('input[name="address"]').instance().value = 'Constanta, ROMANIA';
    form.find('textarea[name="story"]').instance().value = 'Simple method to serialize form elements with HOC';

    form.simulate('submit', {preventDefault() {}});
  });

});
