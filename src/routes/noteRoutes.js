const express = require("express");
const auth = require("../middlewares/auth")
const { getNote, createNote, deleteNote, updateNote } = require("../controller/noteController")

const noteRouter = express.Router();

noteRouter.post("/", auth, createNote);// Create a new note
noteRouter.get("/",auth,getNote);       // Get all notes   
noteRouter.delete("/:id", auth, deleteNote);  // Delete a note by ID
noteRouter.put("/:id", auth, updateNote);     // Update a note by ID

module.exports= noteRouter;