import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pasona-logo.png";
import logo_home from "../assets/home_button.png";
import survey_logo from "../assets/survey.png";
import contact_logo from "../assets/contact.png";
import question_logo from "../assets/question.png";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Contact = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Company 1" },
    { id: 2, name: "Company 2" },
    { id: 3, name: "Company 3" },
    { id: 4, name: "Company 4" },
    { id: 5, name: "Company 5" },
    { id: 6, name: "Company 6" },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/upload");
  };
  const handleEdit = (id) => {
    setIsEditing(id);
    const contact = contacts.find((contact) => contact.id === id);
    setNewName(contact.name);
  };

  const handleSave = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, name: newName } : contact
      )
    );
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleAdd = () => {
    const newContact = {
      id: contacts.length + 1,
      name: `Company ${contacts.length + 1}`,
    };
    setContacts([...contacts, newContact]);
  };

  return (
    <div className="flex h-screen bg-grayLight">
    {/* Sidebar */}
    <div className="w-1/6 bg-gray-300 flex flex-col">
      {/* Logo */}
      <div className="w-full px-6 mb-8">
        <Link to="/home">
          <img
            src={logo}
            alt="Pasona Logo"
            className="w-full h-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        <Link
          to="/home"
          className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
        >
          <img src={logo_home} alt="Survey Logo" className="h-6" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link
          to="/all-survey"
          className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
        >
          <img src={survey_logo} alt="Survey Logo" className="h-6" />
          <span className="font-semibold">All Surveys</span>
        </Link>
        <Link
          to="/upload"
          className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
        >
          <AiOutlineCloudUpload className="text-primary cursor-pointer text-xl"/>
          <span className="font-semibold">Upload Survey</span>
        </Link>
        <Link
          to="/contact"
          className="flex items-center space-x-2 text-primary px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
        >
          <img src={contact_logo} alt="Contact Logo" className="h-6" />
          <span className="font-semibold">Contacts</span>
        </Link>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary h-14 flex items-center px-6 shadow-md">
        <h2 className="text-white text-lg font-semibold">Contact</h2>
        <div className="ml-auto cursor-pointer">
          <img
            src={question_logo}
            alt="Question Logo"
            className="h-6 text-white"
          />
        </div>
      </div>

      {/* Center Content */}
      <div className="grid grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-grayLight rounded-lg p-4 flex flex-col items-center shadow-md"
          >
            {isEditing === contact.id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <span className="text-lg font-medium">{contact.name}</span>
            )}
            <div className="flex space-x-2 mt-3">
              {isEditing === contact.id ? (
                <button
                  onClick={() => handleSave(contact.id)}
                  className="bg-primary text-white px-4 py-1 rounded shadow hover:bg-secondary transition"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(contact.id)}
                    className="text-primary hover:text-secondary"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-primary hover:text-secondary"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        <div
          onClick={handleAdd}
          className="bg-white border-2 border-primary text-primary text-2xl flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
        >
          +
        </div>
      </div>
    </div>
  </div>
  );
};

export default Contact;
