import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
//this could be a functional component. 
//It became a class to call componentwillUpdate and check when it re-renders

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });

        return(
            <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>      
                {ingredientSummary}          
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>

            <Button clicked={this.props.purchaseCancelled} buttonType="Danger">CANCEL</Button>
            <Button clicked={this.props.purchaseContinued} buttonType="Success">CONTINUE</Button>
        </Fragment>
        );
    }
};

export default OrderSummary;