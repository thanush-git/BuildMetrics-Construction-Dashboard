const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const path = require('path');
//app.use(express.static(__dirname, 'public'));


// Serve static files from the 'public' directory
//app.use('/static',express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
mongoose.connect("mongodb+srv://thanush:thanush03@cluster0.tsx7ksj.mongodb.net/NodeDB", { useNewUrlParser: true}, { useUnifiedTopology: true});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/admin-page.html");
});

//Schema
const SampleTestSchema = {
    stage: Number,
    cement_usage: Number,
    steel_usage: Number,
    bricks_usage: Number,
    timber_usage: Number,
    //budget: Number,
    labour: Number,
    remarks: String
}

const Sample = mongoose.model("Sample",SampleTestSchema);

app.post("/", async function(req, res) {
    const updateFields = {
        stage: req.body.stage,
        cement_usage: req.body.cement_usage,
        steel_usage: req.body.steel_usage,
        bricks_usage: req.body.bricks_usage,
        timber_usage: req.body.timber_usage,
        //budget: req.body.budget,
        labour: req.body.labour,
        remarks: req.body.remarks
    };

    try {
        const updatedSample = await Sample.findOneAndUpdate(
            { /* condition to find the existing document to update */ },
            updateFields,
            { new: true, upsert: true } // Options: "new" returns the updated document, "upsert" creates the document if not found
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error updating sample:", error);
        // Handle error here
        res.status(500).send("Error updating sample");
    }
});

app.listen(3000, function() {
    console.log("server is running on 3000");
});
