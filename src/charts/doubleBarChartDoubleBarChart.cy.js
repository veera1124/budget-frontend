import React from 'react'
import DoubleBarChart from './doubleBarChart'

describe('<DoubleBarChart />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DoubleBarChart />)
  })
})