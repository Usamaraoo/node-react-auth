import React from 'react';

const Widget = ({ title, children, bgColor, textColor }) => {
  return (
    <div className={`w-64 h-48 bg-white shadow-md m-4 rounded-lg ${bgColor} ${textColor}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Widget;
