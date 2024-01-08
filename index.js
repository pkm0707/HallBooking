import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors";
import { getRoom, createRoom ,getBookingByRoomId,createBooking ,getBooking,createCustomer,getCustomer,getBookingByCusName} from "./helper.js";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json()); 
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  client.connect();
  console.log("MONGODB conected");
  return client;
}

export const client = await createConnection();

// Home
app.get("/", (req, res) => {
  res.send("Welcome to Hall-Booking Website");
});

//get rooms
app.get("/getrooms", async (req, res) => {
  const result = await getRoom();
  res.send(result);
  console.log(result);
});

//get room by booking Id
app.get("/rooms:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  const isRoomExist = await getRoomByRoomId(id);   
    if(!isRoomExist){
      res.status(400).send({message:"Room does not exist"})
    }
    else{
      res.send(isRoomExist)
    }
});

//create room
app.post("/createroom", async (req, res) => {
  const result = await createRoom(req.body);
  res.send({ success: true, message: "Room Created Successfully" });
});

//book room
app.post("/bookroom",async (req,res)=>{
    const{id,customer_name,room_id,starttime,endtime,date}=req.body;
    console.log(id,customer_name,room_id,starttime,endtime,date)
    const newCustomer = {
        "name":customer_name,
        "room_id":room_id,
        "date":date
    }
    const isBookingExist = await getBookingByRoomId(room_id);   
    if(isBookingExist){
      res.status(400).send({message:"Room is already booked"})
    }
    else{
      const result = await createCustomer(newCustomer)
      console.log(result)
      const newBooking = await createBooking(req.body);       
      res.send(newBooking)
    }
})
 //get bookings
 app.get("/getbookings", async (req, res) => {
    const result = await getBooking();
    res.send(result);
    console.log(result);
});  

//get bookings by customer 
app.get("/getbookings:name", async (req, res) => {
    const{cus_name} = req.params;
    console.log(cus_name)
    const result = await getBookingByCusName(cus_name);
    res.send(result);
    console.log(result);
});  

//get customers
app.get("/getcustomers", async (req, res) => {
    const result = await getCustomer();
    res.send(result);
    console.log(result);
});  
app.listen(PORT, () => console.log("Server started in the port ", PORT)); //port number to listen