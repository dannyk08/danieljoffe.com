import { useState } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import { experience } from '../../utils/experience.json';
import profileInfo from '../../utils/profile-info.json';

const positions = Array.from(
  new Set(experience.map(({ position }) => position))
).join(' • ');

export function ProfileInfo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative px-8 pt-16 pb-8">
      {/* Menu Button */}
      <div className="absolute top-4 right-4">
        <button
          className="p-2 hover:bg-black/10 rounded-full"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="w-5 h-5 text-gray-600"
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-10 right-4 bg-white shadow-lg rounded-lg p-4">
          <button
            type="button"
            onClick={() => {
              const resumeUrl = profileInfo.resume;
              const link = document.createElement('a');
              link.href = resumeUrl;
              link.download = 'daniel-joffe-resume.pdf';
              link.click();
            }}
            className="block w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded-md"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" />{' '}
            resume
          </button>
        </div>
      )}

      {/* Name */}
      <h1 className="font-heading-two mb-4">{profileInfo.name}</h1>

      {/* Title */}
      <p className="font-body text-gray-700 mb-2">{positions}</p>

      {/* Location */}
      <p className="font-body text-gray-600 mb-8">{profileInfo.location}</p>

      {/* Social Links */}
      <div className="flex gap-4 mb-4">
        <a
          href={profileInfo.socials[0].url}
          className="text-gray-600 hover:text-gray-900"
          aria-label={profileInfo.socials[0].name}
        >
          <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
        </a>
        <a
          href={profileInfo.socials[1].url}
          className="text-gray-600 hover:text-gray-900"
          aria-label={profileInfo.socials[1].name}
        >
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
