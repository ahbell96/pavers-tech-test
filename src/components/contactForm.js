import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import moment from "moment";

const ContactForm = () => {
  // have a validated state
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDoa, setFormDoa] = useState(0);
  const [formAboutYou, setFormAboutYou] = useState("");
  const [formReasonForApplying, setFormReasonForApplying] = useState("");
  const [formKnowAboutPavers, setFormKnowAboutPavers] = useState("");
  const [formProfilePicture, setFormProfilePicture] = useState("");
  const [submitForm, setSubmitForm] = useState({});

  const validateForm = () => {
    if (formName.length === 0) {
      return false;
    }
    if (formEmail.length === 0) {
      return false;
    }
    if (!formDoa) {
      return false;
    }
    if (formAboutYou.length === 0) {
      return false;
    }
    if (formReasonForApplying.length === 0) {
      return false;
    }
    if (formKnowAboutPavers.length === 0) {
      return false;
    }

    return true;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    console.log("hello");

    if (validateForm()) {
      setSubmitForm({
        applicantName: formName,
        applicantEmail: formEmail,
        dateOfApplication: formDoa,
        aboutYou: formAboutYou,
        reasonForApplying: formReasonForApplying,
        whatYouKnowAboutPavers: formKnowAboutPavers,
        file: formProfilePicture,
      });

      console.log("hello 2");

      axios
        .post(
          "https://staging.interview-api.paversdev.co.uk/upload",
          submitForm
        )
        .then((res) => {
          console.log(res.data);
          setFormName("");
          setFormEmail("");
          setFormDoa(0);
          setFormAboutYou("");
          setFormReasonForApplying("");
          setFormKnowAboutPavers("");
          setFormProfilePicture("");
          setValidated(false);
          setSubmitForm({});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleProfilePicture = (e) => {
    // preview profile picture and put into a URL.createObjectURL?
    // https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your name.
        </Form.Control.Feedback>
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
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your email address.
        </Form.Control.Feedback>
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
        <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter a valid Date.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAboutYou">
        <Form.Label>About you</Form.Label>
        <Form.Control
          required
          type="text"
          value={formAboutYou}
          as="textarea"
          rows={3}
          onChange={(e) => setFormAboutYou(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formReasonApplying">
        <Form.Label>Reason for applying</Form.Label>
        <Form.Control
          required
          type="text"
          as="textarea"
          rows={3}
          value={formReasonForApplying}
          onChange={(e) => setFormReasonForApplying(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDoYouKnowPavers">
        <Form.Label>What do you know about Pavers Ltd?</Form.Label>
        <Form.Control
          required
          type="text"
          as="textarea"
          rows={3}
          value={formKnowAboutPavers}
          onChange={(e) => setFormKnowAboutPavers(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setFormProfilePicture(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
