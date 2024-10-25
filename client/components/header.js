import Link from "next/link";
import {UserPlus, LogIn, Ticket, ShoppingCart, LogOut} from "lucide-react";

const Header = ({currentUser}) => {
  const links = [
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
      icon: <UserPlus size={16} />,
    },
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
      icon: <LogIn size={16} />,
    },
    currentUser && {
      label: "Sell Tickets",
      href: "/tickets/create",
      icon: <Ticket size={16} />,
    },
    currentUser && {
      label: "My Orders",
      href: "/orders",
      icon: <ShoppingCart size={16} />,
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
      icon: <LogOut size={16} />,
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({label, href, icon}) => (
      <li key={href} className="nav-item">
        <Link href={href} className="nav-link d-flex align-items-center gap-1">
          {icon}
          {label}
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand fs-4 fw-bold">
          Wiki-Tic
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
