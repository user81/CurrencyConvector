import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
class Change extends Component {

    constructor(props) {
        super(props);
        this.usersList = {
            Currency: {
                count: 1,
                country: 'USD',
            }
        };
        this.state = this.usersList;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.Currency.count !== this.state.Currency.count) {
            this.props.currencyCountValue(this.state.Currency.count);
        }
        if (prevState.Currency.country !== this.state.Currency.country) {
            this.props.currencyCountryValue(this.state.Currency.country);
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            Currency: { [name]: value }
        });
    }

    optionList(){
        return Object.entries(this.props.items).map(([key, value]) => {
            return (
                <option key={uuid()} value={key}>{key}</option>
                )
        });
    }

    render() {
        return (
            <>
                <Form.Control
                type="text"
                placeholder="Currency"
                name="count"
                value={this.props.Currency.count}
                onChange={this.handleChange} 
                />

                <Form.Select
                onChange={this.handleChange}
                name="country"
                defaultValue={this.state.Currency.country}
                >
                    {this.optionList()}
                </Form.Select>
            </>
        );
    }
}

export default Change;