import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './TransactionTable.scss';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';

class TransactionTable extends React.Component {
    state = {
        rows: null
    }

    componentDidMount () {
        this.createRows();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.transactionArray !== this.props.transactionArray) {
            this.createRows();
        }
    }

    openAddPayment = () => {
        this.props.openAddPayment(this.props.pocket);
    }

    createRows = () => {
        try {
            const rows = [];
            for (const transaction of this.props.transactionArray) {
                rows.push(
                    <tr key = {transaction._id}>
                        <td>{transaction.description}</td>
                        <td>{transaction.amount} {transaction.currency}</td>
                    </tr>
                );
            }
            this.setState({
                rows: rows
            });
        } catch (error) {
            this.props.onError(error);
        }
    }

    render () {
        return (
            <Table hover bordered variant="dark" className="fn-admin-table">
                <thead>
                    {this.props.isFinAdmin &&
                        <React.Fragment>
                            <tr>
                                <th colSpan={2} className="trans">
                                    <Button className="trans-btn" variant="success" onClick={this.openAddPayment}>
                                        <Plus />
                                            Add new payment
                                    </Button>
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={2} className="trans">
                                    <Button className="trans-btn" variant="danger" onClick={this.openMinusTransaction}>
                                        <Minus />
                                            Add new debit
                                    </Button>
                                </th>
                            </tr>
                        </React.Fragment>
                    }

                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows}
                </tbody>
            </Table>
        );
    }
}

TransactionTable.propTypes = {
    transactionArray: PropTypes.array.isRequired,
    onError: PropTypes.func.isRequired,
    isFinAdmin: PropTypes.bool.isRequired,
    openAddPayment: PropTypes.func,
    pocket: PropTypes.string
};

export default TransactionTable;
