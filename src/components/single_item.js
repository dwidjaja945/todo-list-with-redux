import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
// imports everything from file and put into object called actions

class SingleItem extends Component {
    componentDidMount() {
        this.props.getSingleItem(this.props.match.params.id);
    }

    handleToggleComplete() {
        this.props.toggleComplete(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearSingleItem();
    }

    async handleDeleteItem() {
        await this.props.deleteItem(this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        console.log("single props: ", this.props);

        const { title, details, complete } = this.props.item;

        if(!title) {
            return <p>Loading ...</p>
        }

        return (
            <div>
                <h1 className='center' >To Do Item</h1>
                <div className="row right-align">
                    <Link to='/' className='btn blue-grey'> View Full List </Link>
                </div>
                <h4>{title}</h4>
                <p>{details}</p>
                <p>Item is {complete ? "Completed" : "Incomplete"}</p>
                <button
                    onClick={this.handleToggleComplete.bind(this)}
                    className={`btn ${complete ? 'red' : 'green'}`}
                >
                    { complete ? 'Make Incomplete' : 'Complete Item'}
                </button>
                <br/>
                <button onClick={this.handleDeleteItem.bind(this)} className='btn red darken-2'>Delete Item</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        item: state.list.single
    }
}

export default connect(mapStateToProps, actions)( SingleItem );