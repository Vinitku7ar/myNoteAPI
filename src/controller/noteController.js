const noteModel = require("../model/note");

// CREATE Note
const createNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new noteModel({
        title,
        description,
        userId: req.userId,
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// GET All Notes
const getNote = async (req, res) => {
    try {
        const notes = await noteModel.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch notes" });
    }
};

// UPDATE Note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    

    try {
        const updatedNote = await noteModel.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, description },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update note" });
    }
};

// DELETE Note
const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await noteModel.findOneAndDelete({
            _id: id,
            userId: req.userId,
        });

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete note" });
    }
};

module.exports = { createNote, getNote, updateNote, deleteNote };
