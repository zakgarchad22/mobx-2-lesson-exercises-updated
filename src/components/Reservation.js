import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class Reservation extends Component {
    completeReservation = () => {
        this.props.RestaurantStore.completeRes(this.props.reservation.id)
    }

    seatReservation = () => {
        this.props.RestaurantStore.seatRes(this.props.reservation.id)
    }

    render() {
        const { reservation } = this.props
        return (
            <li className={`collection-item ${reservation.completed ? "conditional" : ""}`}>
                Name: {reservation.name}, Number of People: {reservation.numPeople}
                {reservation.seated && !reservation.completed && <button className="btn-small waves-effect waves-light red" onClick={this.completeReservation}>Complete</button>}
                {!reservation.seated && <button className="btn-small waves-effect waves-light" onClick={this.seatReservation}>Seat</button>}
            </li>
        )
    }
}

export default inject("RestaurantStore")(observer(Reservation));
