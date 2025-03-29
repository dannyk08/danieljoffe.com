import { Props } from 'next/script';

export default function Home(params: Props) {
  return (
    <div>
      <h1 className="font-heading-one">Primary Heading</h1>
      <h2 className="font-heading-two">Secondary Heading</h2>
      <h3 className="font-heading-three">Tertiary Heading</h3>
      <p className="font-body">
        Regular body text. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p className="font-large">
        Larger body text for emphasis or introductory paragraphs.
      </p>
      <p className="font-small">Small text for captions or notes.</p>
      <button className="font-cta">Call to Action</button>
    </div>
  );
}
