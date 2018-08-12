import React, { Fragment, Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    //anonymous class
    return class extends Component  {

        state = {
            error: null
        }

        setInterceptors() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            })

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
                console.log(error.message);
            });
        }

        removeInterceptors(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        componentWillUnmount () {
            console.log('Will unmount', this.requestInterceptor, this.responseInterceptor);
            this.removeInterceptors();
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {

            this.setInterceptors();

            return (
                <Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    } 
}

export default withErrorHandler;