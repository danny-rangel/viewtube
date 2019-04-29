import React from 'react';
import { mount } from 'enzyme';
import Header from '../Header';
import history from '../../utils/history';
import { Router } from "react-router-dom";

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <Router history={history}>
            <Header />
        </Router>
    );
});

afterEach(() => {
    wrapper.unmount();
});



it('has a text input and a button', () => {
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
});



it('has a text input that users can type in', () => {
    wrapper.find('input').simulate('change', {
        target: { value: 'new search term' }
    });
    wrapper.update();

    expect(wrapper.find('input').prop('value')).toEqual('new search term');
});



it('when form is submitted with no text entered, error is thrown', () => {
    let error;

    try {
        wrapper.find('input').simulate('change', {
            target: { value: '' }
        });
        wrapper.update();
        expect(wrapper.find('input').prop('value')).toEqual('');
    
        wrapper.find('form').simulate('submit');
        wrapper.update();
    } catch(err) {
        error = err;
    }
    
    expect(error).toBeInstanceOf(Error);
});

