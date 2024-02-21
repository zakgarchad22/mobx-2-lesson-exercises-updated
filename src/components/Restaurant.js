import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ResInput from './ResInput';
import Reservation from './Reservation';

class Restaurant extends Component {

    addReservation = () => {
        const { name, numPeople } = this.props.GeneralStore
        this.props.RestaurantStore.addRes(name, parseInt(numPeople, 10))
        this.props.GeneralStore.handleInput('name', '')
        this.props.GeneralStore.handleInput('numPeople', 0)
    }

    render() {
        const { openTables, reservations, restPopulation, completedTables } = this.props.RestaurantStore
        return (
            <div className="container">
                <h5>You have {openTables} open tables</h5>
                <p>People in restaurant: {restPopulation}</p>
                <p>Completed tables: {completedTables}</p>
                <ResInput />
                <button className="btn waves-effect waves-light" onClick={this.addReservation}>
                    Add Reservation
                    <i className="material-icons right">add</i>
                </button>
                <ul className="collection with-header">
                    {reservations.map(res => (
                        <Reservation key={res.id} reservation={res} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default inject("GeneralStore", "RestaurantStore")(observer(Restaurant));
