import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const params = useParams();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setContact(res);
      });
  }, [params.id]);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city} {contact.email} {contact.linkedIn}{" "}
        {contact.twitter}
      </p>
      <button>
        <Link to={`/contacts/edit/${params.id}`}>Edit</Link>
      </button>
    </div>
  );
}

export default ContactsView;
