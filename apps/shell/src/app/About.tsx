import { ProfileHeader } from './about/ProfileHeader';
import { ProfileInfo } from './about/ProfileInfo';
import { ExperienceSection } from './about/ExperienceSection';
import { SkillGroup } from './about/SkillsGroup';
import { techSkills } from '../utils/tech-skills.json';
import { nonTechSkills } from '../utils/nontech-skills.json';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ProfileHeader />
      <ProfileInfo />
      <hr className="border-gray-200" />
      <ExperienceSection />
      <hr className="border-gray-200" />
      <SkillGroup title="Soft Skills" skills={nonTechSkills} />
      <hr className="border-gray-200" />
      <SkillGroup title="Skills" skills={techSkills} />
      <hr className="border-gray-200" />
    </div>
  );
}
