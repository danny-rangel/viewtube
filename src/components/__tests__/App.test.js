import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Header from '../Header';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<App />);
});

afterEach(() => {
    wrapper.unmount();
});

it('shows a header', () => {
    expect(wrapper.find(Header).length).toEqual(1);
});

