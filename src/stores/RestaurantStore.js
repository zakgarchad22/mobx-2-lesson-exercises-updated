import { observable, computed, action, makeObservable } from  'mobx'
import {Reservation} from './ReservationStore'


export class RestaurantStore {
    constructor() {
        this.reservations = []
        this.numTables = 10

        makeObservable(this, {
            reservations: observable,
            numTables: observable,
            totalReservations: computed,
            openTables: computed,
            restPopulation: computed,
            completedTables: computed,
            addRes: action,
            seatRes: action,
            completeRes: action,
        })
    }

    get totalReservations() { //automatically calculates the total reservations
        return this.reservations.length
    }
    get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
        let counter = 0
        this.reservations.forEach(r => r.seated ? counter ++: null)
        return (this.numTables - counter)
    }
    get restPopulation() {
        return this.reservations.filter(reservation => reservation.seated && !reservation.completed).reduce((total, reservation) => total + reservation.numPeople, 0)
        
      }
      get completedTables() {
        return this.reservations.filter(res => res.completed).length
    }
    addRes = (name, numPeople) => {
        this.reservations.push(new Reservation(name, numPeople))
    }
    seatRes = (id) => {
        const res = this.reservations.find(r => r.id === id)
        if (res) {
            res.seated = true
        }
    }
    
    completeRes = (id) => {
        const res = this.reservations.find(r => r.id === id);
        if (res) {
            res.completed = true;
        }
    }
    
    completeRes = (id) => {
        const res = this.reservations.find(r => r.id === id)
        if (res) {
            res.completed = true
        }
    }
}