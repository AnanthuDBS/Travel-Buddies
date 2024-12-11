//1. test for creating a Trip

const request = require("supertest");
//const mongoose = require("mongoose");
const app = require("../app"); //to import my express app and server both
const Trip = require("../models/trip"); //to import the Trip model

describe("Trip API", () => {
    //to clear and populate the db before tests
    befireEach(async () => {
        await Trip.deleteMany(); //to clr all the trips
    });
    it("should create a new trip", async () => {
      const tripData = {
        destination: "Galway",
        modeOfTravel: "Bus",
        travelTime: "2024-12-20T10:00",
        //travelTime: "2024-12-20T10:00:00.000Z",
        participantLimit: 10,
      };
  
      const res = await request(app).post("/api/trips").send(tripData);
      expect(res.statusCode).toBe(201);
      expect(res.body.destination).toBe("Galway");
  
      const tripInDb = await Trip.findOne({ destination: "Galway" });
      expect(tripInDb).not.toBeNull();
    });

    it("should retrieve all the trips", async() => {
        //fill the db with sample trips
        const trips = [
            {
                destination: "Cork",
                modeOfTravel: "Train",
                travelTime: "2024-12-15T08:00",
                participantLimit: 5,
            },
            {
                destination: "Kildare",
                modeOfTravel: "Car",
                travelTime: "2024-12-18T09:00",
                participantLimit: 3,
            },
        ];
        await Trip.insertMany(trips);

        const res = await request(app).get("/api/trips");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].destination).toBe("Dublin");
        expect(res.body[1].destination).toBe("Kildare");
    });
});