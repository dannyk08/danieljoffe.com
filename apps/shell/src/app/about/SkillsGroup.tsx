import { Pill } from '../../components/Pill';

interface SkillGroupProps {
  title: string;
  skills: string[];
}

export function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div className="px-8 py-8">
      <h2 className="font-heading-two mb-6">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Pill key={skill}>{skill}</Pill>
        ))}
      </div>
    </div>
  );
}
