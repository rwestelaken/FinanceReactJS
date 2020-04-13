import React, { Component } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class Prices extends Component {

  //classes = useStyles();

  state = {
    data: [],
  }

  componentDidMount() {
      const url = 'http://localhost:8081/data/api/v1/price/RY.TO'
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
    let prices = this.state.data;

    return (
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
              <TableRow key={row.ticker}>
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
    )
  }
}
    
export default Prices
    
