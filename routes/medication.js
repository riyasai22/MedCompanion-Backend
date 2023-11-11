const express = require("express");
const router = express.Router();
const Med = require("../models/Med");
const Relative = require("../models/Relatives");
const { MessagingResponse } = require("twilio").twiml;
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

// Create a new relative
router.post("/relative", async (req, res) => {
  try {
    // Extract relative data from the request body
    const { name, relation, number } = req.body;

    // Create a new Relative instance
    const newRelative = new Relative({
      name,
      relation,
      number,
    });

    const relative = await newRelative.save();
    res.status(201).json(relative);
  } catch (error) {
    console.error("Error creating relative:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Create a new medication
router.post("/", async (req, res) => {
  try {
    // Extract medication data from the request body
    const {
      icon,
      name,
      dosage,
      type,
      instruction,
      medicationPeriod,
      medicationPeriodType,
      reminder,
      days,
      alarmSound,
      alarmDuration,
    } = req.body;

    // Create a new Medication instance
    const newMedication = new Med({
      icon,
      name,
      dosage,
      type,
      instruction,
      medicationPeriod,
      medicationPeriodType,
      reminder,
      days,
      alarmSound,
      alarmDuration,
    });
    const medication = await newMedication.save();
    res.status(201).json(medication);
  } catch (error) {
    console.error("Error creating medication:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const medications = await Med.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch the list of emergency contacts
router.get("/relative", async (req, res) => {
  try {
    const relatives = await Relative.find();
    res.status(200).json(relatives);
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/notify", async (req, res) => {
  try {
    const message =
      "This is an emergency notification from MedCompanion. Mrs. Indira K requires emergency medical assistance.";

    const sentMessage = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: "+919360772873",
    });

    console.log("Emergency SMS sent successfully:", sentMessage.sid);

    res.status(200).json({ message: "Emergency SMS sent successfully." });
  } catch (error) {
    console.error("Failed to send emergency SMS:", error);
    res.status(500).json({ error: "Failed to send emergency SMS." });
  }
});

router.post("/send-whatsapp", async (req, res) => {
  try {
    const { to, from, body } = req.body;

    // // Initialize your Twilio client
    const sentMessage = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: "+919360772873",
      body: body,
    });
    console.log(to + " " + from + " " + body + " " + sentMessage.sid);
    res.status(200).json({ message: "WhatsApp message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
