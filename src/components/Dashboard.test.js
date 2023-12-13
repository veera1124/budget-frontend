import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });
import Dashboard from './Dashboard';

describe('<Dashboard/>', () => {
  it('Should render <Dashboard/> component without crashing', () => {
    const component = shallow(<Dashboard/>);
    const tree = component.debug();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render EXPENSES and BUDGET LEFT Vs DATE section`, () => {
    const component = shallow(<Dashboard/>);
    expect(component.find('#doubleBarChart').exists()).toBe(true);
  })
  
  it(`Should render TOTAL EXPENSES / TOTAL BUDGET section`, () => {
    const component = shallow(<Dashboard/>);
    expect(component.find('#pieChart').exists()).toBe(true);
  })
  
  it(`Should render EXPENSES Per BUDGET CATAGORY table`, () => {
    const component = shallow(<Dashboard/>);
    expect(component.find('#expenseTable').exists()).toBe(true);
  })
  
  it(`Should render AMOUNT Vs CATAGORIES section`, () => {
    const component = shallow(<Dashboard/>);
    expect(component.find('#lineChart').exists()).toBe(true);
  })
});