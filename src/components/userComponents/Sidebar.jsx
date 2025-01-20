
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  ShoppingCart,
  Map,
  Wallet,
  Calendar,
  X
} from 'lucide-react';
import { useMobileNav } from '../../hooks/useMobileNav';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', link: "" },
  { icon: Sparkles, label: 'New Events', link: 'NewArrivals' },
  { icon: History, label: 'Booking History', link: 'BookingHistory' },
  { icon: ShoppingCart, label: 'Cart', link: 'Cart' },
  { icon: Map, label: 'Tickets', link: 'Ticket' },
  { icon: Wallet, label: 'Payment', link: 'Payment' },

];

export default function Sidebar() {
  const location = useLocation();
  const { isOpen, close } = useMobileNav();

  return (
    <aside className={`
      fixed left-0 top-28 h-[calc(80vh-3.5rem)] bg-white shadow-lg
      transition-transform duration-300 ease-in-out z-40  
      border md:border-blue-900 lg:ml-10 md:rounded-lg
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      w-64     `}>
      <div className="p-4">
        <div className="flex items-center justify-between px-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-800">Eventia</span>
          </div>
          <button 
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <ul className="space-y-2 relative ">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              
                <NavLink
                  key={item.link}
                  to={item.link}
                  onClick={close}
                  className={`
                    flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
             
            );
          })}
        </ul>
      </div>
    </aside>
  );
}