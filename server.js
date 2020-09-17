const fs = require("fs")
const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());







