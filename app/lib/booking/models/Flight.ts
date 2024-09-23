import mongoose, { Document, Schema } from "mongoose";

export interface IFlight extends Document {
    departureCity: string,
    departureAirport: string;
    destinationCity: string;
    destinationAirport: string;
    blockOffTime: string;
    flightName:string;
}

const flightSchema: Schema = new mongoose.Schema({
    departureCity: {
        type: String,
        required: true,
    },
    departureAirport: {
        type: String,
        required: true,
    },
    destinationCity: {
        type: String,
        required: true,
    },
    destinationAirport: {
        type: String,
        required: true,
    },
    blockOffTime: {
        type: String,
        required: true,
    },
    flightName: {
        type: String,
        required: true,
    },
});

const Flight = mongoose.models.Flight ||  mongoose.model<IFlight>('Flight', flightSchema);

export default Flight;
