import Container from '@/components/units/Container';
import { offerings } from '@/utils/offerings';

export default function Methodologies() {
  return (
    <Container>
      <h2 className="text-center">My Methodology</h2>
      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 justify-items-center items-center py-4">
        {offerings.methodology.map((methodology, index) => (
          <div
            key={index}
            className="text-center flex flex-col p-4 gap-2 lg:p-8"
          >
            <p className="text-2xl">{methodology.icon}</p>
            <h4>{methodology.title}</h4>
            <p>{methodology.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
