import { Component, useId } from 'react'
import { Company } from './Company'
import { Price } from './Price'
//import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AppState {
  companies: Company[];
  company: string;
  prices: Price[];
}

class Prices extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      companies: [],
      company: '',
      prices: [],
    };
  }

  componentDidMount(): void {
    this.loadCompanies();
    this.loadPrices("FTS.TO");      
  }

  //classes = useStyles();
  getFormatDate = (date: Date) => {
    return (
      date.getDate() + 1 + "/" + date.getMonth() + "/" + date.getFullYear()
    );
  }

  loadCompanies() {
      const url = 'http://localhost:8081/data/api/v1/companies'
      fetch(url)
        .then(result => result.json()) 
        .then(result => {
          this.setState({
            companies: result,
          })
        })
  }

  loadPrices(ticker: string) {
      const url = 'http://localhost:8081/data/api/v1/price/' + ticker
      fetch(url)
        .then(result => result.json()) 
        .then(result => {
          this.setState({
            prices: result,
          })
        })
  }

  onFieldChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const fieldValue: string = e.target.value;
    this.setState({ company: fieldValue });
    this.loadPrices(fieldValue);
  }

  render() {
    let companies = this.state.companies;
    let company = this.state.company;
    let prices = this.state.prices;

    let hidden2 = 
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Close</TableCell>
            <TableCell align="right">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((row) => (
            <TableRow key={row.end_date}>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{row.open}</TableCell>
              <TableCell align="right">{row.high}</TableCell>
              <TableCell align="right">{row.low}</TableCell>
              <TableCell align="right">{row.close}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    const data = prices.map((row) => ({
      name: new Date(row.end_date).toLocaleDateString(),
      uv: row.high,
      pv: row.low,
      amt: row.close,
    }));

    return (
      <div>
        <div>
        <select onChange={this.onFieldChange.bind(this)} value={company}>
          {companies.map((company) => (
            <option key={company.ticker} value={company.ticker}>{company.ticker} - {company.name}</option>
            ))}
        </select>
        </div>
        <LineChart
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['auto', 'auto']}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
          {hidden2}
      </div>
    )
  }
}
    
export default Prices

