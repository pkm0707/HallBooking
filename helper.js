import { client } from './index.js';


export async function createRoom(room) {
    return await client.db("hallbooking").collection("room").insertOne(room);
}

export async function getRoomByRoomId(id) {
    return await client.db("hallbooking").collection("room").findOne({id:id});
}

export async function getRoom() {
    return await client.db("hallbooking").collection("room").find().toArray();
}  
  
export async function getBookingByRoomId(room_id) {
    return await client.db("hallbooking").collection("booking").findOne({room_id:room_id})
}  

export async function createBooking(booking) {
    return await client.db("hallbooking").collection("booking").insertOne(booking);
}  

export async function getBooking() {
    return await client.db("hallbooking").collection("booking").find().toArray();
}  

export async function createCustomer(customer) {
    return await client.db("hallbooking").collection("customer").insertOne(customer);
}  

export async function getCustomer() {
    return await client.db("hallbooking").collection("customer").find().toArray();
}  

export async function getBookingByCusName(name) {
    return await client.db("hallbooking").collection("booking").find({customer_name:name});
}  

  
  
