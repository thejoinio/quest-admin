import Link from 'next/link';
import { ProfileAvatarDropdown } from './profile-avatar-dropdown';
import { LeaderboardIcon, ReferralIcon } from './task-svgs';
import { getSingleRank } from './ranks';
import { nameImageMap } from './rank-card';
import Image from 'next/image';

const BottomNavbar = ({currentPoint}:{currentPoint: number}) => {
    const rank = getSingleRank(currentPoint)
  const navItems = [
      {
        name: "Referrals",
        icon: <ReferralIcon />,
        link: "/referrals",
      },
      {
        name: `Ranks`,
        icon: <LeaderboardIcon />,
        link: "/all-ranks",
      },
      {
        name: rank?.name || "Water",
        link: "/my-rank",
        icon: <Image src={nameImageMap[(rank?.name || "WATER") as keyof typeof nameImageMap]} alt={rank?.difficulty || "Water"} className='rounded-full' />,
      },
      {
        name: "Leaderboard",
        icon: <ReferralIcon />,
        link: "/leaderboard",
      },
    ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-[999999]
                    lg:hidden xl:hidden 2xl:hidden bottom-nav-container">
      <div className="flex justify-around items-center h-16 sm:h-20">
        {navItems.map((item, index) => {
          // Determine if this is the middle item (index 2 for 5 items)
          const isCenterItem = index === Math.floor(navItems.length / 2);

          return (
            <Link 
              href={item.link} 
              key={item.name} 
              className={`flex flex-col items-center justify-center text-sm font-medium text-gray-700 hover:text-primary-purple transition-colors duration-200
                ${isCenterItem ? '-translate-y-8' : ''}`
              }
            >
              <div 
                className={`flex flex-col items-center justify-center custom-gradient-bg rounded-full
                  ${isCenterItem ? 'custom-gradient-bg-nav-image border-[0.192px] border-primary-blue size-[60px]' : 'border border-primary-blue p-[3px] size-[30px]'}`
                }
              >
                {item.icon}
              </div>
              <span className={`mt-1 text-white text-[10px] font-semibold`}>{item.name}</span>
            </Link>
          );
        })}
        <div className='flex flex-col items-center gap-1'>
            <ProfileAvatarDropdown big={false} />
            <div className='text-white text-[10px] font-semibold'>Profile</div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;