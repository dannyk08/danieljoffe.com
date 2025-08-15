import { heroContent } from '@/utils/heroContent';

export default function Achievements() {
  return (
    <div className="container flex flex-col py-14 px-4 self-center">
      <h3 className="text-center">My Achievements</h3>
      <div className="flex flex-col gap-4 py-4">
        {heroContent.achievements.map((achievement, index) => (
          <p key={index} className="flex justify-between gap-4">
            <span className="w-1/6 text-left">{achievement.icon}</span>
            <span className="w-4/6 text-center">{achievement.text}</span>
            <span className="w-1/6 text-right text-sm">
              {achievement.metric}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
