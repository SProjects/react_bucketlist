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

    componentDidUpdate() {
        if(this.props.authErrorMessage) {
            this.addAlert("Error", this.props.authErrorMessage, "error");
        }

        if(this.props.userErrorMessage) {
            this.addAlert("Error", this.props.userErrorMessage, "error");
        }

        if(this.props.userSuccessMessage) {
            this.addAlert("Success", this.props.userSuccessMessage, "success");
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
        userErrorMessage: state.user.get("error")
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
