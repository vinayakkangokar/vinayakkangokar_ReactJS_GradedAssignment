import Alert from "react-bootstrap/Alert";

type Props = {
  variant: string;
  message: string;
};

const AlertHelper = ({ variant, message }: Props) => {
  return (
    <Alert key={variant} variant={variant} className="mt-2">
      {message}
    </Alert>
  );
};

export default AlertHelper;
