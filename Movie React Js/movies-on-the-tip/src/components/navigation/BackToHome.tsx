import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  contextHandler: Function;
};

const BackToHome = ({ contextHandler }: Props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          onClick={() => {
            //navigate to default home page
            contextHandler("movies-in-theaters");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} className="me-2" />
          Back to Home
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default BackToHome;
