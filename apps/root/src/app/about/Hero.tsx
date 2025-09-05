'use client';
import { Button } from '@/components/units/Button';
import Container from '@/components/units/Container';
import { GOOGLE_DOCS_URL, NAME } from '@/utils/constants';
import { profileData } from '@/utils/profileData';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <Container>
      <div className='flex flex-col gap-4'>
        <h1 className='text-center'>About</h1>
        <div className='flex flex-col gap-4 items-center md:flex-row '>
          <div className='flex flex-col gap-2 justify-center items-center w-full max-w-[16rem]'>
            <Image
              src='/images/daniel-joffe-profile.png'
              alt={NAME}
              title={NAME}
              width={300}
              height={300}
              className='rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'
              priority={true}
              fetchPriority='high'
              sizes='(max-width: 640px) 12rem, (max-width: 768px) 14rem, 16rem'
            />
          </div>
          <div className='flex flex-col gap-2 text-center md:text-left'>
            <p>Hello, I&apos;m {NAME},</p>
            <p>
              I&apos;m a full-stack engineer with 8+ years of experience
              building scalable solutions that drive real business impact.
              Currently, I&apos;m strengthening my computer science foundation
              through formal education while taking on strategic engineering
              projects, because I believe in never stopping the pursuit of
              growth.
            </p>
            <div className='flex flex-col gap-2 items-center md:items-start'>
              <p>You can connect with me on:</p>
              <div className='flex'>
                <Button
                  size='sm'
                  variant='icon'
                  aria-label='Send Email'
                  title='Email'
                  onClick={() =>
                    window.open(`mailto:${profileData.social.email}`, '_blank')
                  }
                >
                  <Mail />
                </Button>
                <Button
                  size='sm'
                  variant='icon'
                  aria-label='Visit LinkedIn Profile'
                  title='LinkedIn'
                  onClick={() =>
                    window.open(profileData.social.linkedin, '_blank')
                  }
                >
                  <Linkedin />
                </Button>
                <Button
                  size='sm'
                  variant='icon'
                  aria-label='Visit GitHub Profile'
                  title='GitHub'
                  onClick={() =>
                    window.open(profileData.social.github, '_blank')
                  }
                >
                  <Github />
                </Button>
                <Button
                  size='sm'
                  variant='icon'
                  aria-label='Download Resume PDF'
                  title='Download Resume'
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `${GOOGLE_DOCS_URL}/1v4IB1-XA_-h-wq5HLgzH8_dFzMbOm-PaqOwom8k5_i4/export?format=pdf&portrait=true`;
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
