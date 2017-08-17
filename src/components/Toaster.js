import React, {Component} from 'react';
import { connect } from 'react-redux';

let ReactToastr = require("react-toastr");
let {ToastContainer} = ReactToastr;
let ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class Toaster extends Component {
    addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 3000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 3000, closeButton:true });
        }
    };

    componentDidMount() {
        if(this.props.userSuccessMessage) {
            this.handleSuccess(this.props.userSuccessMessage);
        }

        if(this.props.bucketlistSuccessMessage) {
            this.handleSuccess(this.props.bucketlistSuccessMessage);
        }

        if(this.props.itemSuccessMessage) {
            this.handleSuccess(this.props.itemSuccessMessage);
        }

        if(this.props.headerSuccessMessage) {
            this.handleSuccess(this.props.headerSuccessMessage);
        }
    }

    componentDidUpdate() {
        if(this.props.authErrorMessage) {
            this.handleError(this.props.authErrorMessage);
        }

        if(this.props.userErrorMessage) {
            this.handleError(this.props.userErrorMessage);
        }

        if(this.props.bucketlistErrorMessage) {
            this.handleError(this.props.bucketlistErrorMessage);
        }

        if(this.props.itemErrorMessage) {
            this.handleError(this.props.itemErrorMessage);
        }

        if(this.props.itemSuccessMessage) {
            this.handleSuccess(this.props.itemSuccessMessage);
        }

        if(this.props.headerErrorMessage) {
            this.handleError(this.props.headerErrorMessage);
        }

        if(this.props.headerSuccessMessage) {
            this.handleSuccess(this.props.headerSuccessMessage);
        }
    }

    handleSuccess(message) {
        this.addAlert("Success", message, "success");
    }

    handleError(message) {
        this.addAlert("Error", message, "error");
    }

    render() {
        return (
            <div>
                <ToastContainer ref="container"
                                toastMessageFactory={ToastMessageFactory}
                                className="toast-bottom-left"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authErrorMessage: state.auth.get("error"),
        userSuccessMessage: state.user.get("message"),
        userErrorMessage: state.user.get("error"),
        bucketlistErrorMessage: state.bucketlist.get("error"),
        bucketlistSuccessMessage: state.bucketlist.get("message"),
        itemSuccessMessage: state.item.get("message"),
        itemErrorMessage: state.item.get("error"),
        headerSuccessMessage: state.header.get("message"),
        headerErrorMessage: state.header.get("error")
    }
}

export default connect(mapStateToProps)(Toaster)
