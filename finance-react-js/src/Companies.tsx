import React from 'react';
import { Company } from './Company'

interface CompaniesProps {
  onChange: (fieldName: string, fieldValue: string) => void
}

interface AppState {
  data: Company[];
  message: string;
}

class Companies extends React.Component<CompaniesProps, AppState> {

    componentDidMount() {
        const url = 'http://localhost:8081/data/api/v1/companies'
        console.log("mount")
        fetch(url)
          .then(result => result.json()) 
          //.then(console.log(result.json))
          .then(result => this.setState({ data: result }))
      }
    
    onFieldChange(e: any) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    render() {
        let companies = this.state.data;
        let optionItems = companies.map((company) =>
          <option value={company.ticker}>{company.name}</option>
        );

        return (
          <div>
              <select onChange={this.onFieldChange.bind(this)}>
                  {optionItems}
              </select>
          </div>
        )
    }
}
    
export default Companies
    