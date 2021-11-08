import Fade from "react-reveal/Fade";
import Background from "../assets/background.jpg";

const LandingBackground = () => {
  return (
    <section>
      <>
        <div className="landing-overlay"></div>
        <div className="d-flex flex-column justify-content-center align-items-center h-full">
          <img
            alt="landing background"
            src={Background}
            style={{ width: "100%", height: "100vh" }}
          />
          <Fade>
            <h3
              className="text-center position-absolute pb-5 text-white"
              style={{ zIndex: 3 }}
            >
              Pavers React Developer Application Form
            </h3>
          </Fade>

          <Fade>
            <p
              className="text-center position-absolute pt-5 text-white"
              style={{ zIndex: 3 }}
            >
              Apply using the application form below.
            </p>
          </Fade>
        </div>
      </>
    </section>
  );
};

export default LandingBackground;
