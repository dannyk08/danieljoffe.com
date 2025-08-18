import TimelineMobile from './TimelineMobile';
import TimelineTU from './TimelineTU';

export default function Overview() {
  return (
    <div className="flex flex-col gap-4">
      <h3>Overview</h3>
      <p>
        I&apos;ve worked in a variety of roles, from frontend developer to
        technical leader. I&apos;ve also worked in a variety of industries, from
        wine subscription to healthcare to library software.
      </p>
      <TimelineMobile />
      <TimelineTU />
    </div>
  );
}
