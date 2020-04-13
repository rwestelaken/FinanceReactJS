import React, { Component } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {Line} from 'react-chartjs-2';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const stuff = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}
class Prices extends Component {

  //classes = useStyles();

  state = {
    tableData: [],
    labels: [],
    data: [],
  }

  getFormatDate = (date) => {
    return (
      date.getDate() + 1 + "/" + date.getMonth() + "/" + date.getFullYear()
    );
  }

  componentDidMount() {
      const url = 'http://localhost:8081/data/api/v1/price/RY.TO'
      console.log("mount")
      fetch(url)
        .then(result => result.json()) 
        //.then(console.log(result.json))
        .then( result => {
          const labels = [];
          const dataArray = [];
          result.forEach(row => {
           labels.push(this.getFormatDate(new Date(row.end_date)));
           dataArray.push(row.close);
          })
          this.setState({
            tableData: result,
            labels: labels,
            data: dataArray
          })
        })
    }
    
  render() {
    let prices = this.state.tableData;
    const chartData = {
      labels: this.state.labels,
      datasets: [
                  {
                    data: this.state.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                   }
                ]
    }

    return (
      <div>
        <Line
          //labels={this.state.labels}
          data={chartData}
          options={{
            title:{
              display:true,
              text:'Price',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
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
      </div>
    )
  }
}
    
export default Prices
    
