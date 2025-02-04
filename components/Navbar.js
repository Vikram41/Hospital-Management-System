export default function Navbar({ role, id }) {
    const links = {
      admin: `/admin/${id}`,
      doctor: `/doctor/${id}`,
      patient: `/patient/${id}`,
      staff: `/staff/${id}`,
    };
  
    return (
      <nav className="navbar">
        <h1>Hospital Management System</h1>
        <a href={links[role]}>Dashboard</a>
        <a href="/">Logout</a>
      </nav>
    );
  }
  