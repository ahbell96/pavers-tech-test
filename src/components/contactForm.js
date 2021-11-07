import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ContactForm = ({ handleSubmit }) => {
  // have a validated state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDoa, setFormDoa] = useState(new Date());
  const [formAboutYou, setFormAboutYou] = useState("");
  const [formReasonForApplying, setFormReasonForApplying] = useState("");
  const [formKnowAboutPavers, setFormKnowAboutPavers] = useState("");
  const [formProfilePicture, setFormProfilePicture] = useState("");
  const [submitForm, setSubmitForm] = useState({});

  const handleOnSubmit = (event) => {
    // axios post data
    // https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
    event.preventDefault();

    setSubmitForm({
      applicantName: formName,
      applicantEmail: formEmail,
      dateOfApplication: formDoa,
      aboutYou: formAboutYou,
      reasonForApplying: formReasonForApplying,
      whatYouKnowAboutPavers: formKnowAboutPavers,
      file: formProfilePicture,
    });

    axios
      .post("https://staging.interview-api.paversdev.co.uk/upload", submitForm)
      .then((res) => {
        console.log(res.data);
        setFormName("");
        setFormEmail("");
        setFormDoa(new Date());
        setFormAboutYou("");
        setFormReasonForApplying("");
        setFormKnowAboutPavers("");
        setFormProfilePicture("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date of Application</Form.Label>
        <Form.Control
          required
          type="date"
          placeholder="Enter date"
          value={formDoa}
          onChange={(e) => setFormDoa(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAboutYou">
        <Form.Label>About you</Form.Label>
        <Form.Control
          required
          type="text"
          value={formAboutYou}
          onChange={(e) => setFormAboutYou(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formReasonApplying">
        <Form.Label>Reason for applying</Form.Label>
        <Form.Control
          required
          type="text"
          value={formReasonForApplying}
          onChange={(e) => setFormReasonForApplying(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDoYouKnowPavers">
        <Form.Label>What do you know about Pavers Ltd?</Form.Label>
        <Form.Control
          required
          type="text"
          value={formKnowAboutPavers}
          onChange={(e) => setFormKnowAboutPavers(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
