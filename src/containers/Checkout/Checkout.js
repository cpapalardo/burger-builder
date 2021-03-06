import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {    

    state ={
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price')
            {
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {

        console.log("ROUTE: continuedClicked ");

        this.props.history.replace('/checkout/contact-data');
        console.log("ROUTE: " + this.props.match.url);
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>

                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={ (props) => (
                    <ContactData 
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        {...props}/>
                ) } />
            </div>
        );
    }
}

export default Checkout;