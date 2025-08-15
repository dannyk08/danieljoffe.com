import Container from '@/components/units/Container';
import { heroContent } from '@/utils/heroContent';

export default function Methodologies() {
  return (
    <Container>
      <h3 className="text-center">My Methodology</h3>
      <div className="flex flex-wrap py-4 justify-between">
        {heroContent.methodology.map((methodology, index) => (
          <div
            key={index}
            className="md:w-1/2 text-center flex flex-col p-4 gap-2 lg:p-8"
          >
            <p className="text-2xl">{methodology.icon}</p>
            <h4 className="text-lg">{methodology.title}</h4>
            <p>{methodology.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
