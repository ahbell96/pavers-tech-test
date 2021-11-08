import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDoa, setFormDoa] = useState(0);
  const [formAboutYou, setFormAboutYou] = useState("");
  const [formReasonForApplying, setFormReasonForApplying] = useState("");
  const [formKnowAboutPavers, setFormKnowAboutPavers] = useState("");
  const [formProfilePicture, setFormProfilePicture] = useState("");
  const [previewProfilePicture, setPreviewProfilePicture] = useState("");
  const [submitForm, setSubmitForm] = useState({});
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // timeout for formComplete - 5 seconds, then disappear
  }, []);

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

    if (validateForm()) {
      setFormComplete(true);
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
          setPreviewProfilePicture("");
          setValidated(false);
          setSubmitForm({});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleProfilePicture = (e) => {
    setFormProfilePicture(e.target.files[0]);
    setPreviewProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <h2 className="text-center">Application Form</h2>
      <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            maxLength="50"
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
            maxLength="100"
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
            maxLength="255"
            value={formAboutYou}
            as="textarea"
            rows={3}
            onChange={(e) => setFormAboutYou(e.target.value)}
          />
          <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter something about you.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReasonApplying">
          <Form.Label>Reason for applying</Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            maxLength="255"
            rows={3}
            value={formReasonForApplying}
            onChange={(e) => setFormReasonForApplying(e.target.value)}
          />
          <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your reason for applying.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDoYouKnowPavers">
          <Form.Label>What do you know about Pavers Ltd?</Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            maxLength="255"
            rows={3}
            value={formKnowAboutPavers}
            onChange={(e) => setFormKnowAboutPavers(e.target.value)}
          />
          <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please let us know how you found out about Pavers.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload profile picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => handleProfilePicture(e)}
          />
        </Form.Group>
        {formProfilePicture && (
          <div className="my-4">
            <div>
              <h4>Profile preview</h4>
            </div>
            <img
              src={previewProfilePicture}
              width="150"
              height="150"
              alt="profile"
            />
          </div>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {formComplete && (
        <div>
          <h4>Thanks! we've got your application.</h4>
        </div>
      )}
    </>
  );
};

export default ContactForm;
