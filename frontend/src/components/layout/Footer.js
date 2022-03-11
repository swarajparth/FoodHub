import React from "react";

const Footer = () => {
  return (
    <footer className="footer green darken-4" style={{textAlign: "center", backgroundColor: '#4e4949', margin: 0, padding: 0}}>
        <span className='text-white' style={{paddingTop: '5px', color: 'white'}}>Copyright &copy; {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;