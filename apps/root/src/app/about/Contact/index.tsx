import Container from '@/components/units/Container';
import './Contact.scss';
import Form from './Form';

export default function Contact() {
  return (
    <Container className="bg-blue-500 text-white contact-form">
      <div className="flex flex-col gap-4 w-full max-w-[32rem] self-center">
        <h2>Contact</h2>
        <Form />
      </div>
    </Container>
  );
}
