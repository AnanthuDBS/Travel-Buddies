//1. test for creating a Trip

const request = require("supertest");
const app = require("../app"); //to import my express app
const Trip = require("../models/trip"); //to import the Trip model