import React, { Component } from 'react'

class Companies extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        const url = 'http://localhost:8081/data/api/v1/companies'
        console.log("mount")
        fetch(url)
          .then(result => result.json()) 
          //.then(console.log(result.json))
          .then(result => {
            this.setState({
              data: result,
            })
          })
      }
    
    render() {
        let companies = this.state.data;
        let optionItems = companies.map((company) =>
          <option key={company.ticker}>{company.name}</option>
        );

        return (
          <div>
              <select>
                  {optionItems}
              </select>
          </div>
        )
      }
}
    
export default Companies
    
