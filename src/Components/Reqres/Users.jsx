import React, { Component } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { baseUrl } from './ReqresSettings';

export default class Users extends Component {

    usersRoute = "/Reqres/UsersList"
    state = { usersList: [], showingItems: 0, page: 1, total: 0, pageSize: 5, lastPage: 0 };
    constructor(props) {
        super(props);
    }

    // getQuery = () => {
    //     let hash = window.location.hash;
    //     return new URLSearchParams(hash.substring(hash.indexOf("?")));
    // }

    componentDidMount = () => this.loadUsersList();

    changePage = (p) => {
        
        let { lastPage } = this.state;
 
        if(p < 1){
            p = 1;
        } else if(p > lastPage){
            p = lastPage;
        }
        
        this.setState({ ...this.state, page: p }, () => this.loadUsersList());
    }

    loadUsersList = () => {
        const { page,pageSize } = this.state;
        console.log("loding page:", page);
        fetch(baseUrl + `/users?page=${page}&per_page=${pageSize}`)
            .then(response => response.json())
            .then((response) => {

                let usersList = response.data;
                let showingItems = usersList.length;
                let total = response.total;
                let lastPage = Math.ceil(total / pageSize);
                console.log("LastPage:",lastPage);
                this.setState(
                    {
                        ...this.state,
                        lastPage: lastPage,
                        usersList: usersList,
                        total: total,
                        showingItems: showingItems
                    });
            });
    }


    renderPagination = () =>{
        let paginationItems = [];
        let { lastPage  } = this.state;
        
        for (let i = 0; i < lastPage; i++) {
            paginationItems.push( 
                <li className="page-item" key={i}>
                    <button className="page-link" onClick={() => this.changePage(i+1)}>{i+1}</button>
                </li>
            )
        }
        
        return paginationItems;
    }

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
                                                    <li className="page-item">
                                                        <button className="page-link" onClick={() => this.changePage(this.state.page - 1)}>Previous</button>
                                                    </li>
                                                    {
                                                        this.renderPagination().map((elem)=>elem)
                                                    }
                                                    <li className="page-item">
                                                        <button className="page-link" onClick={() => this.changePage(this.state.page + 1)}>Next</button>
                                                    </li>
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
