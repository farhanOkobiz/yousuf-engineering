// const slugify = require("slugify");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Brand title is required"],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // categories: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Category",
    //   },
    // ],

    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// brandSchema.pre("save", function (next) {
//   if (this.isModified("title")) {
//     // this.slug = slugify(this.title, { lower: true });
//     this.title = this.title.toLowerCase();
//   }

//   next();
// });

const brand = model("Brand", brandSchema);

module.exports = brand;
