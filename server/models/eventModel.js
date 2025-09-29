const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    photo: {
      type: String,
      required: [true, "Photo is required"],
      trim: true,
    },

    heading: {
      type: String,
      // required: [true, "Heading is required"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
