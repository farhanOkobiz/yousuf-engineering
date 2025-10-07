const OfficeLocation = () => {
  return (
    <div className="py- bg-white rounded-lg">
      <iframe
        className="h-[480px] w-full"
        src="https://maps.google.com/maps?q=23.7918356,90.3678483&z=18&output=embed"
        width="600"
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default OfficeLocation;
