import React from 'react';
import '../css/copyright.scss'; // Assuming you want to style it

const Copyright = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <div className="copyright">
      <p>&copy; {currentYear} MonkeyPainting. All rights reserved.</p>
    </div>
  );
};

export default Copyright;
