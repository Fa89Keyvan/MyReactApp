import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { baseUrl } from './ReqresSettings';

export default class Users extends Component {

    usersRoute = "/Reqres/UsersList"
    state = { usersList: [], showingItems: 0, page: 1, total: 0 };
    constructor(props) {
        super(props);

        this.loadUsersList = this.loadUsersList.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    // getQuery = () => {
    //     let hash = window.location.hash;
    //     return new URLSearchParams(hash.substring(hash.indexOf("?")));
    // }

    componentDidMount = () => { console.log("DidMount"); this.loadUsersList(); }

    changePage = (p) => this.setState({ ...this.state, page: p }, () => this.loadUsersList());

    

    loadUsersList = () => {
        const { page } = this.state;
        console.log("loding page:", page);
        fetch(baseUrl + `/users?page=${this.state.page}`)
            .then(response => response.json())
            .then((response) => {

                let usersList = response.data;
                let showingItems = usersList.length;

                this.setState(
                    {
                        ...this.state,
                        usersList: usersList,
                        total: response.total,
                        showingItems: showingItems
                    });
            });
    }


    // renderPagination = () =>{

    //     let paginationItems;
    //     let { total,  }
    //     let pagesCount = total / 


    //     for (let i = 0; i < ; i++) {

    //     }

    // }

    render() {
        console.log("calling render");
        return (
            <>
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        Users list
                  </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 justify-content-center">
                                <table className="table table-sm table-responsive table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Email</th>
                                            <th>Avatar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.usersList.map((user) => (
                                                <tr key={user.id} className="cursor-hand">
                                                    <td>{user.id}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td><img src={user.avatar} className="img img-thumbnail w-25" /></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>
                                                Showing {this.state.showingItems} items of {this.state.total}
                                            </td>
                                            <td>
                                                <ul className="pagination pagination-sm">
                                                    {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li> */}
                                                    <li className="page-item">
                                                        <button className="page-link" onClick={() => this.changePage(1)}>1</button>
                                                    </li>
                                                    <li className="page-item">
                                                        <button className="page-link" onClick={() => this.changePage(2)}>2</button>
                                                    </li>
                                                    {/* <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
