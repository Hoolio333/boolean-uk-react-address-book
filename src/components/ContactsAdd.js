import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialNewContact = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const [newContact, setNewContact] = useState(initialNewContact);
  const navigate = useNavigate();

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const onFormSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then((result) => {
        setContacts([...contacts, result]);
        event.target.reset();
        setNewContact(initialNewContact);
        navigate("/");
      });
  };

  const updateContact = (property, value) => {
    setNewContact((previous) => {
      const updated = { ...previous };
      updated[property] = value;
      return updated;
    });
  };

  return (
    <form className="form-stack contact-form" onSubmit={onFormSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={(event) => updateContact("firstName", event.target.value)}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={(event) => updateContact("lastName", event.target.value)}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={(event) => updateContact("street", event.target.value)}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={(event) => updateContact("city", event.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={(event) => updateContact("email", event.target.value)}
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        onChange={(event) => updateContact("linkedIn", event.target.value)}
      />

      <label htmlFor="Twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={(event) => updateContact("twitter", event.target.value)}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
