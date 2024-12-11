//1. test for creating a Trip

const request = require("supertest");
//const mongoose = require("mongoose");
const app = require("../app"); //to import my express app and server both
const Trip = require("../models/trip"); //to import the Trip model

describe("Trip API", () => {
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
  });