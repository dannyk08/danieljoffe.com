import {
  EMAIL_ADDRESS,
  GITHUB_PROFILE_URL,
  JOB_TITLE,
  LINKEDIN_PROFILE_URL,
  FULL_NAME,
} from './constants';

export const profileData = {
  name: FULL_NAME,
  title: JOB_TITLE,
  tagline:
    'I build exceptional digital experiences that drive results and inspire users.',
  status: 'Available for Senior Frontend/Full-Stack roles',
  social: {
    email: EMAIL_ADDRESS,
    linkedin: LINKEDIN_PROFILE_URL,
    github: GITHUB_PROFILE_URL,
  },
};
