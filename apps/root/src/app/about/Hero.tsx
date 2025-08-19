'use client';
import { Button } from '@/components/units/Button';
import Container from '@/components/units/Container';
import { profileData } from '@/utils/profileData';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h1>About</h1>
        <div className="flex flex-col gap-4 items-center md:flex-row ">
          <div className="flex flex-col gap-2 justify-center w-full max-w-[16rem]">
            <Image
              src="/images/daniel-joffe-profile.png"
              alt="Daniel Joffe"
              title="Daniel Joffe"
              width={300}
              height={300}
              className="rounded-full"
              priority={true}
              fetchPriority="high"
            />
            <div className="flex gap-2 items-center justify-center">
              <p className="text-sm">{profileData.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Hello, I&apos;m Daniel Joffe,</p>
            <p>
              I&apos;m a full-stack engineer with 8+ years of experience
              building scalable solutions that drive real business impact.
              Currently, I&apos;m strengthening my computer science foundation
              through formal education while taking on strategic engineering
              projects, because I believe in never stopping the pursuit of
              growth.
            </p>
            <div>
              <p>You can connect with me on:</p>
              <div className="flex">
                <Button
                  size="sm"
                  variant="icon"
                  aria-label="Send Email"
                  title="Email"
                  onClick={() =>
                    window.open(`mailto:${profileData.social.email}`, '_blank')
                  }
                >
                  <Mail />
                </Button>
                <Button
                  size="sm"
                  variant="icon"
                  aria-label="Visit LinkedIn Profile"
                  title="LinkedIn"
                  onClick={() =>
                    window.open(profileData.social.linkedin, '_blank')
                  }
                >
                  <Linkedin />
                </Button>
                <Button
                  size="sm"
                  variant="icon"
                  aria-label="Visit GitHub Profile"
                  title="GitHub"
                  onClick={() =>
                    window.open(profileData.social.github, '_blank')
                  }
                >
                  <Github />
                </Button>
                <Button
                  size="sm"
                  variant="icon"
                  aria-label="Download Resume PDF"
                  title="Download Resume"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href =
                      'https://docs.google.com/document/d/1v4IB1-XA_-h-wq5HLgzH8_dFzMbOm-PaqOwom8k5_i4/export?format=pdf&portrait=true';
                    link.download = 'daniel-joffe-resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
