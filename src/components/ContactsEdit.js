import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialNewContact = null;

function ContactsEdit(props) {
  const { setContacts, contacts } = props;

  const [contact, setContact] = useState({});
  const [newContact, setNewContact] = useState(initialNewContact);
  const navigate = useNavigate();
  const params = useParams();

  const onFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then((updated) => {
        setContacts(
          contacts.map(existing.id === updated.id ? updated : existing)
        );
        event.target.reset();
        setNewContact(initialNewContact);
        navigate("/");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setContact(res);
      });
  }, [params.id]);

  const updateContact = (property, value) => {
    setNewContact((previous) => {
      const updated = { ...previous };
      updated[property] = value;
      return updated;
    });
  };

  if (!contact) {
    return <p>Loading</p>;
  }

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
        <button className="button blue" type="submit" onSubmit={updateContact}>
          Edit
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
