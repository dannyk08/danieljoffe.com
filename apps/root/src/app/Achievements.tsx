import Container from '@/components/units/Container';
import { offerings } from '@/utils/offerings';

export default function Achievements() {
  return (
    <Container className="bg-neutral-800 text-white">
      <h2 className="text-center">My Achievements</h2>
      <div className="flex flex-col gap-4 py-4 items-center">
        {offerings.achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex gap-4 items-center w-full max-w-[28rem] p-4 bg-white text-black rounded-[5px]"
          >
            <p className="text-2xl">{achievement.icon}</p>
            <div className="flex flex-col">
              <h4>{achievement.metric}</h4>
              <p className="text-sm">{achievement.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
