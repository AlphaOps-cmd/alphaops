import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <img 
        src="/lovable-uploads/d868f952-c216-4786-83c4-484176a94b79.png" 
        alt="AlphaOps Logo" 
        className="h-16 w-16"
      />
      <h1 className="text-2xl font-bold">AlphaOps</h1>
    </div>
  );
};

export default Header;