import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, Shield } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = isAdmin ? [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/reports", label: "Reports" },
    { to: "/", label: "User Portal" }
  ] : [
    { to: "/", label: "Home" },
    { to: "/application", label: "Apply" },
    { to: "/status", label: "Status" },
    { to: "/tutorials", label: "Tutorials" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/admin", label: "Admin" }
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">LKP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Liet Ka Pas</h1>
              <p className="text-xs opacity-90">Community Development</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button 
                  variant={location.pathname === link.to ? "secondary" : "ghost"}
                  className="text-primary-foreground hover:bg-primary-hover"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Badge variant={isAdmin ? "destructive" : "secondary"} className="ml-2">
              {isAdmin ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
              {isAdmin ? "Admin" : "User"}
            </Badge>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-hover"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-hover">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant={location.pathname === link.to ? "secondary" : "ghost"}
                    className="w-full justify-start text-primary-foreground hover:bg-primary-hover"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="pt-2">
                <Badge variant={isAdmin ? "destructive" : "secondary"}>
                  {isAdmin ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                  {isAdmin ? "Admin Mode" : "User Mode"}
                </Badge>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;