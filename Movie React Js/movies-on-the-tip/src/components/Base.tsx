import BackToHome from "./navigation/BackToHome";
import Navigation from "./navigation/Navigation";
import { Container } from "react-bootstrap";

type Props = {
  showNav: boolean;
  showBackToHome: boolean;
  children: JSX.Element;
  contextHandler: Function;
};

const Base = ({ showNav, showBackToHome, children, contextHandler }: Props) => {
  return (
    <>
      {showNav && <Navigation contextHandler={contextHandler} />}
      {showBackToHome && <BackToHome contextHandler={contextHandler} />}

      <Container fluid>{children}</Container>
    </>
  );
};
export default Base;
