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
      <Link
        href="https://docs.google.com/document/d/1v4IB1-XA_-h-wq5HLgzH8_dFzMbOm-PaqOwom8k5_i4/export?format=pdf&portrait=true"
        download="daniel-joffe-resume.pdf"
        className={[
          buttonBaseStyles,
          buttonVariantStyles.primary,
          buttonSizeStyles.md,
        ].join(' ')}
      >
        Download Resume
      </Link>
    </div>
  );
}
