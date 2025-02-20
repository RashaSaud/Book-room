import Logo from "src/assets/Logo/g10.svg";

const Navbar = () => {
  return (
    <nav className="w-full  mobile:hidden">
      <div className=" mobile:flex mx-auto">
        <img src={Logo} alt="logo" className="size-56 mobile:size-36" />
      </div>
    </nav>
  );
};

export default Navbar;
