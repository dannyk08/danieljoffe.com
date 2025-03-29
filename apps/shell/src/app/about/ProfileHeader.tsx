export function ProfileHeader() {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-400"></div>

      {/* Profile Image */}
      <div className="absolute bottom-0 left-8 transform translate-y-1/2">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
          <img
            src="/assets/profile-picture.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
