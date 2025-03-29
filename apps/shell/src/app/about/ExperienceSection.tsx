import { experience } from '../../utils/experience.json';

interface ExperienceProps {
  company: string;
  position: string;
  period: string;
  description: string;
  remote: boolean;
}

function ExperienceItem({
  company,
  position,
  period,
  description,
  remote,
}: ExperienceProps) {
  return (
    <div className="mb-8">
      <h3 className="font-heading-four mb-1">
        {company}
        {remote && <span className="text-gray-500 font-large"> (Remote)</span>}
      </h3>
      <p className="font-large text-gray-700 mb-1">
        {position} • {period}
      </p>
      <p className="font-body text-gray-600">{description}</p>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <div className="px-8 py-8">
      <h2 className="font-heading-two mb-6">Experience</h2>
      {experience.map((item) => (
        <ExperienceItem
          key={item.company}
          company={item.company}
          position={item.position}
          period={item.dates}
          description={item.description}
          remote={item.remote || false}
        />
      ))}
    </div>
  );
}
