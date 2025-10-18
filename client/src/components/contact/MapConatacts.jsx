import React from "react";

const MapConatacts = () => {
  return (
    <div className="">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d456.34905776821876!2d90.36641156489274!3d23.790403631007976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c89187b3bd%3A0x5949ab399ebc916!2sOrganon%20Homeo%20Hall!5e0!3m2!1sen!2sbd!4v1760260755416!5m2!1sen!2sbd"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Location"
      ></iframe>
    </div>
  );
};

export default MapConatacts;
