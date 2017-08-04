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
            this.addAlert("Success", this.props.userSuccessMessage, "success");
        }

        if(this.props.bucketlistSuccessMessage) {
            this.addAlert("Success", this.props.bucketlistSuccessMessage, "success");
        }
    }

    componentDidUpdate() {
        if(this.props.authErrorMessage) {
            this.addAlert("Error", this.props.authErrorMessage, "error");
        }

        if(this.props.userErrorMessage) {
            this.addAlert("Error", this.props.userErrorMessage, "error");
        }

        if(this.props.bucketlistErrorMessage) {
            this.addAlert("Error", this.props.bucketlistErrorMessage, "error");
        }
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

function mapStateToProps(state, prop) {
    return {
        authErrorMessage: state.auth.get("error"),
        userSuccessMessage: state.user.get("message"),
        userErrorMessage: state.user.get("error"),
        bucketlistErrorMessage: state.bucketlist.get("error"),
        bucketlistSuccessMessage: state.bucketlist.get("message")
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
