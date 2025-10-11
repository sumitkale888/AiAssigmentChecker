import React from "react";

const Contacts: React.FC = () => {
  const contacts = [
    {
      title: "General Enquiries",
      phone: "+91 9423190104",
      email: "pruthvirajgawande@gmail.com",
      hours: "Mon - Fri, 9:00 AM - 5:00 PM",
    },
    {
      title: "Admissions",
      phone: "+91 7498760502",
      email: "prashik.sasane@vit.edu",
      hours: "Mon - Fri, 9:00 AM - 6:00 PM",
    },
    {
      title: "Technical Support",
      phone: "+91 70288 74211",
      email: "parthkadam@vit.edu",
      hours: "Mon - Sat, 10:00 AM - 7:00 PM",
    },
    {
      title: "Emergency Helpline",
      phone: "+91 8010770930",
      email: "pranavgawade@gmail.com",
      hours: "24/7",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <div className="text-center mb-12 bg-blue-600 py-12 rounded-2xl shadow-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">
          Here is how you can reach us. Call, email, or visit us during office hours.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-blue-100"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{contact.title}</h2>
            <div className="flex items-center mb-3">
              <span className="material-icons text-red-500 mr-3">phone</span>
              <a href={`tel:${contact.phone}`} className="text-gray-800 hover:text-blue-600 font-medium">
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center mb-3">
              <span className="material-icons text-green-500 mr-3">email</span>
              <a href={`mailto:${contact.email}`} className="text-gray-800 hover:text-green-600 font-medium">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-yellow-500 mr-3">schedule</span>
              <p className="text-gray-800 font-medium">{contact.hours}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="mt-12 flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2 h-[350px] rounded-2xl overflow-hidden shadow-xl border-2 border-blue-600">
          <iframe
            title="VIT Pune Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.030445303257!2d73.8629371749074!3d18.467491687388673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c19b0ff750ff%3A0x7d36b9a4f2c8eae7!2sVishwakarma%20Institute%20of%20Technology%20(VIT)%2C%20Pune!5e0!3m2!1sen!2sin!4v1697048840123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
