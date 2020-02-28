import React, { Component } from 'react';

import './Superuser.scss';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import { Table, Form } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null,
        emailSearchValue: '',
        statusFilter: 'all',
        roleFilter: 'all'
    }

    componentDidMount () {
        fetch('http://localhost:4000/userList')
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ userData: data });
                console.dir(this.state.userData);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    handleEmailSearch = () => {
        console.log('search handled');
    }

    handleEmailSearchChange = (inputValue) => {
        this.setState({ emailSearchValue: inputValue });
    }

    handleStatuschange = (e) => {
        switch (e.target.options.selectedIndex) {
            case 0:
                this.setState({ statusFilter: 'all' });
                break;
            case 1:
                this.setState({ statusFilter: 'active' });
                break;
            case 2:
                this.setState({ statusFilter: 'inactive' });
                break;
        }
    }

    handleRolechange = (e) => {
        switch (e.target.options.selectedIndex) {
            case 0:
                this.setState({ roleFilter: 'all' });
                break;
            case 1:
                this.setState({ roleFilter: 'general' });
                break;
            case 2:
                this.setState({ roleFilter: 'super' });
                break;
        }
    }

    render () {
        const { userData } = this.state;

        return (
            <div>
                <Header activePage="Superuser" />
                <Navbar />
                <main>
                    <Form className="filter-box">
                        <Form.Group>
                            <SearchBar
                                handleSearch={this.handleEmailSearch}
                                handleInputChange={this.handleEmailSearchChange}
                                inputValue={this.state.emailSearchValue}
                            />
                            <Form.Text>Search for an email address</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="statusSelect">Status</Form.Label>
                            <select id="statusSelect" onChange={this.handleStatuschange}>
                                <option
                                    selected={this.state.statusFilter.includes('all')}
                                >
                                    All
                                </option>
                                <option
                                    selected={this.state.statusFilter.includes('active')}
                                >
                                    Active
                                </option>
                                <option
                                    selected={this.state.statusFilter.includes('inactive')}
                                >
                                    Inactive
                                </option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="roleSelect">Role</Form.Label>
                            <select id="roleSelect">
                                <option
                                    selected={this.state.roleFilter.includes('all')}
                                >
                                    All
                                </option>
                                <option
                                    selected={this.state.roleFilter.includes('general')}
                                >
                                    General user
                                </option>
                                <option
                                    selected={this.state.roleFilter.includes('super')}
                                >
                                    Superuser
                                </option>
                            </select>
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // map through userData only if it's been defined
                                userData ? (
                                    userData.map((user, key) => (
                                        // filter emails
                                        user.email.toLowerCase().includes(this.state.emailSearchValue.toLowerCase()) ? (
                                            <tr key={ key }>
                                                <td>
                                                    {
                                                        // if email address is too long, shorten it.
                                                        user.email.length > 30 && window.innerWidth < 600 ? (
                                                            `${user.email.substring(0, 25)}...`
                                                        ) : (user.email)
                                                    }
                                                </td>
                                                <td>
                                                    {user.isActive ? 'active' : 'inactive'}
                                                </td>
                                                <td>
                                                    {user.isSuperuser ? 'superuser' : 'general user'}
                                                </td>
                                            </tr>
                                        ) : (null)
                                    ))
                                ) : (null)
                            }
                        </tbody>
                    </Table>
                </main>
                <Footer />
            </div>
        );
    }
};

export default Superuser;
