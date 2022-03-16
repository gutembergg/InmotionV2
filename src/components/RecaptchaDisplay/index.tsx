import Link from "next/dist/client/link";
import { Container } from "./styles";



const RecaptchaDisplay = () => {
  return (
    <Container>
      This site is protected by reCAPTCHA and the Google
    <Link href="https://policies.google.com/privacy"><a> Privacy Policy</a></Link> and
    <Link href="https://policies.google.com/terms"><a> Terms of Service</a></Link> apply.
    </Container>
  );
};

export default RecaptchaDisplay;
