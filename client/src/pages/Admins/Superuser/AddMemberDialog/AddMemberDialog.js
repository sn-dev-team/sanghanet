import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';

import './AddMemberDialog.scss';
import { emailValidationRule, nameValidationRule, validationError } from '../../../../components/ValidationRule';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class AddMemberDialog extends Component {
    state = {
        emailInputValue: '',
        labelInputValue: '',
        emailInvalid: true,
        labelInvalid: true,
        labelErrorMsg: '',
        emailErrorMsg: ''
    }

    handleEmailChange = (event) => {
        this.setState({
            emailInputValue: event.target.value,
            emailErrorMsg: validationError(event.target),
            emailInvalid: !!validationError(event.target)
        });
    }

    handleLabelChange = (event) => {
        this.setState({
            labelInputValue: event.target.value,
            labelErrorMsg: validationError(event.target),
            labelInvalid: !!validationError(event.target)
        });
    }

    handleEnter = (event) => {
        const { labelInvalid, emailInvalid } = this.state;

        if (event.key === 'Enter') {
            if (!(labelInvalid || emailInvalid)) {
                this.handleAddMember();
            }
        } 
    }

    handleAddMember = (event) => {
        const { emailInvalid, labelInvalid } = this.state;

        if(!(emailInvalid && labelInvalid)) {
            this.props.addMember(`${this.state.emailInputValue}@gmail.com`, this.state.labelInputValue);
        }

        event && event.preventDefault();
    }

    render () {
        const { closeDialog } = this.props;
        const { emailErrorMsg, labelErrorMsg, emailInputValue, labelInputValue, emailInvalid, labelInvalid } = this.state;

        return (
            <GenericDialog
                title = 'Add member'
                reject = 'Cancel'
                accept = 'Add'
                acceptDisabled = {emailInvalid || labelInvalid}
                handleClose = {closeDialog}
                handleAccept = {this.handleAddMember}
            >
                <Form onSubmit={this.handleAddMember} autoComplete='off' className="add-member-dialog">
                    <Form.Label htmlFor="label-input">Name<span>*</span></Form.Label>
                    <Form.Control
                        className={labelErrorMsg.length ? 'label-input invalid' : 'label-input'}
                        type="text"
                        value={labelInputValue}
                        id="label-input"
                        onChange={this.handleLabelChange}
                        onKeyPress={this.handleEnter}
                        autoFocus
                        {...nameValidationRule}
                    >
                    </Form.Control>
                    <span className="error" aria-live="polite">{labelErrorMsg}</span>
                    <Form.Label htmlFor="email-input">Email address<span>*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            className={emailErrorMsg.length ? 'email-input invalid' : 'email-input'}
                            type="text"
                            value={emailInputValue}
                            id="email-input"
                            onChange={this.handleEmailChange}
                            onKeyPress={this.handleEnter}
                            {...emailValidationRule}
                        >
                        </Form.Control>
                        <InputGroup.Append>
                            <InputGroup.Text>@gmail.com</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <span className="error" aria-live="polite">{emailErrorMsg}</span>
                </Form>
            </GenericDialog>
        );
    }
}

AddMemberDialog.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired
};

export default AddMemberDialog;
