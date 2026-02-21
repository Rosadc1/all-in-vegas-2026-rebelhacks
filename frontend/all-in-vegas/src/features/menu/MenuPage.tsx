import { Link, useNavigate } from 'react-router';
import { User, HelpCircle, Info, LogOut, LayoutDashboard, BookOpen, LogIn } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import { routerMap } from '@/global/routerMap';

type MenuItem =
  | { icon: React.ElementType; label: string; path: string; action?: never }
  | { icon: React.ElementType; label: string; action: () => void; path?: never };

export function MenuPage() {
  const navigate = useNavigate();
  const { userType, setUserType } = useAppContext();

  const handleLogout = () => {
    setUserType(null);
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    navigate(routerMap.HOME);
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Account',
      items: userType
        ? [
            // { icon: User, label: username, path: '/profile' },
            // { icon: Settings, label: 'Settings', path: '/settings' },
            ...(userType === 'OPERATOR'
              ? [{ icon: LayoutDashboard, label: 'Organizer Dashboard', path: '/org/dashboard' } as MenuItem]
              : []),
            { icon: LogOut, label: 'Log Out', action: handleLogout },
          ]
        : [
            { icon: LogIn, label: 'Login', path: `/${routerMap.LOGIN}` },
            { icon: BookOpen, label: 'Sign Up', path: `/${routerMap.SIGNUP}` },
          ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', path: `/${routerMap.HELP}` },
        { icon: Info, label: 'About', path: `/${routerMap.ABOUT}` },
      ],
    },
  ];

  const renderItem = (item: MenuItem, index: number, total: number) => {
    const borderClass = index !== total - 1 ? 'border-b border-border' : '';
    const baseClass = `flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${borderClass}`;
    const isLogout = item.label === 'Log Out';

    if ('action' in item && item.action) {
      return (
        <button
          key={item.label}
          onClick={item.action}
          className={`w-full text-left ${baseClass}`}
        >
          <item.icon className={`w-5 h-5 ${isLogout ? 'text-[#e63946]' : 'text-[#ffb703]'}`} />
          <span className={`flex-1 text-sm font-bold uppercase tracking-wide ${isLogout ? 'text-[#e63946]' : 'text-white'}`}>
            {item.label}
          </span>
          <span className="text-[#94a3b8]">›</span>
        </button>
      );
    }

    return (
      <Link
        key={item.label}
        to={item.path!}
        className={baseClass}
      >
        <item.icon className="w-5 h-5 text-[#ffb703]" />
        <span className="flex-1 text-sm font-bold text-white uppercase tracking-wide">{item.label}</span>
        <span className="text-[#94a3b8]">›</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          {/* <img src={logo} alt="All In Vegas" className="h-24 w-24 mx-auto mb-4 object-contain" /> */}
          <div className="flex flex-col items-center mb-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#e63946] font-black mb-1">Convention Platform</span>
            <h1 className="text-4xl font-black tracking-tighter">
              <span className="text-white">ALL IN</span>
              <span className="text-[#ffb703] ml-2">VEGAS</span>
            </h1>
            <div className="h-1 w-32 bg-[#e63946] mt-3" />
          </div>
          <p className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest mt-2">Schedule • Navigate • Connect</p>
        </div>

        {/* User Info */}
        {userType && (
          <Card className="mb-6 bg-card border-border overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb703]" />
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#e63946] to-[#ffb703] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(230,57,70,0.3)]">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    {userType === 'OPERATOR' ? 'Event Organizer' : 'Attendee Account'}
                  </h3>
                  {/* <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">user@example.com</p> */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[10px] font-black text-[#e63946] uppercase tracking-[0.2em] mb-3 px-2">
                {section.title}
              </h2>
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  {section.items.map((item, index) =>
                    renderItem(item, index, section.items.length)
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#94a3b8] mb-2">Version 1.0.0</p>
          <p className="text-xs text-[#94a3b8]">© 2026 All In Vegas. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
