import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';
import {Table, Button} from 'react-bootstrap';
import Change from './components/Change';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      Currency: {
        count: 1,
        country: 'USD',
      }
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.Currency.country !== this.state.Currency.country) {
      this.tick();
    }
}
  componentDidMount() {
    {console.log(this.state.items.isArray);}
    if(this.state.items.isArray === undefined){
      this.tick();
    }
    this.timerID = setInterval(
      () => this.tick(),
      80000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    {console.log("request");}
    fetch(`https://api.exchangerate.host/latest?base=${this.state.Currency.country}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.rates
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  CurrentList(){
    return Object.entries(this.state.items).map(([key, value]) => {
      return ( 
      <tr key={uuid()}>
        <td>{key}</td>
        <td>{value}</td>
        <td>{(this.state.Currency.count * value).toFixed(2)}</td>
      </tr>
      )
    });
  }

  currencyCountValue = (value) => {
    this.setState({  Currency: { ...this.state.Currency, count: value} })
  }

  currencyCountryValue = (value) => {
    this.setState({ Currency: { ...this.state.Currency, country: value} })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
        {console.log("Количество" + this.state.Currency.count)}
      return (
        <div className='container'>
          <h1 className='text-center my-4'>My Currency Convector</h1>
          <Change
            currencyCountValue = {this.currencyCountValue}
            currencyCountryValue = {this.currencyCountryValue}
            Currency = {this.state.Currency}
            items = {this.state.items}
          />
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Valute</th>
            <th>coefficient</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {this.CurrentList()}
        </tbody>
      </Table>
        </div>
      )
    }
  }
}

export default App;