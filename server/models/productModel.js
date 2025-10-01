// const slugify = require("slugify");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    photos: [
      {
        type: String,
        required: [true, "Minimum one photo is required"],
        trim: true,
      },
    ],

    details: {
      type: String,
      required: [true, "Details are required"],
      trim: true,
    },

    price: {
      type: Number,
      required: false
    },

    advantages: [
      {
        type: String,
      },
    ],
    specification: [
      {
        model: {
          type: String,
        },
        typeValue: [
          {
            type: {
              type: String,
            },
            value: {
              type: String,
            },
          },
        ],
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand ID is required"],
    },

    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Product = model("Product", productSchema);

module.exports = Product;
