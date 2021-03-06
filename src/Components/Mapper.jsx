import React from 'react';
import { Table, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import {  withRouter } from 'react-router-dom';

class Mapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredArray: this.props.data || [],

            searchKeyArray: [],
        }
    }
    clickHandler = (event, filterParam) => {
        let arr = [];
        if (event && filterParam !== null) {
            arr = this.props.data.filter(i => {
                return i[filterParam] == event
            });
            this.setState({ filteredArray: [...arr] })
        }
        else alert('enter the value!!')
    //     else { return (<Alert key={'1'} variant={'danger'}>
    //          Please enter Value
    //   </Alert>)}

    }
    onChange = (event) => {
        this.setState({ searchData: event.target.value })
    }

    sortHandler = (filterParam) => {
        let sortedData = []
        sortedData = this.state.filteredArray.sort((a, b) => (a[filterParam] > b[filterParam]) ? 1 : -1);
        this.setState({ filteredArray: sortedData });
    }

    detailHandler = (user) => {
        console.log({user})
        this.props.history.push({
            pathname: `/users/${user.id}`,
            state: { user,name:"userData" }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <form >
                        <Row>
                            <Col>
                                <input className="form-control"
                                    type="text" value={this.state.searchData}
                                    onChange={this.onChange}
                                    placeholder='Search the data' />
                            </Col>

                            <Col md="auto">
                                <DropdownButton id="dropdown-basic-button"
                                    title="Search Filters">
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'first_name')} >First Name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'last_name')}>Last Name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'company_name')}>Company name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'city')} >City</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'state')} >State</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'zip')} >Zip</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'email')} >Email</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'age')} >Age</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.clickHandler(this.state.searchData, 'web')} >Website</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </form>

                </div>
                <br/>
                <p>Click any table-header coloumn to sort accordingly !!</p>
                <Table style={{ marginTop: 20 }} striped bordered hover variant="dark" responsive >
                    <thead>
                        <tr>
                            <th onClick={() => this.sortHandler('first_name')}>First__Name</th>
                            <th onClick={() => this.sortHandler('last_name')}>Last Name</th>
                            <th onClick={() => this.sortHandler('company_name')}>Company Name</th>
                            <th onClick={() => this.sortHandler('city')}>City</th>
                            <th onClick={() => this.sortHandler('state')}>State</th>
                            <th onClick={() => this.sortHandler('zip')}>ZIP</th>
                            <th onClick={() => this.sortHandler('email')}>Email</th>
                            <th onClick={() => this.sortHandler('age')}>Age</th>
                            <th onClick={() => this.sortHandler('web')}>Web</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filteredArray.map(key => {
                                return (
                                    <tr key={key.id} onClick={() => this.detailHandler(key)}>
                                        <td>{key.first_name}</td>
                                        <td>{key.last_name}</td>
                                        <td>{key.company_name}</td>
                                        <td>{key.city}</td>
                                        <td>{key.state}</td>
                                        <td>{key.zip}</td>
                                        <td>{key.email}</td>
                                        <td>{key.age}</td>
                                        <td>{key.web}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>;
</div>

        )
    }
}

export default withRouter(Mapper);