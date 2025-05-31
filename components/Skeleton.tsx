
import React from 'react';

const Skeleton= ({ 
  rows = 5, 
  columns = 4, 
  showHeader = true,
  className = "" 
}) => {
  const SkeletonBar = ({ width = "100%" }) => (
    <div 
      className={`h-4 bg-gray-300 rounded animate-pulse`}
      style={{ width }}
    />
  );

  return (
    <>
        <div className='container mx-auto'>
        <div className='text-xl font-semibold pl-10 mt-22 w-3/4 mx-auto'>DashBoard </div>
            <div className={`w-3/4 mx-auto overflow-hidden mt-6 rounded-lg border border-gray-200 ${className}`}>
        <table className="w-full">
            {showHeader && (
            <thead className="bg-gray-50">
                <tr>
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <th key={colIndex} className="px-4 py-4">
                        {colIndex === 0 && <p>Name</p>}
                        {colIndex === 1 && <p>Email</p>}
                        {colIndex === 2 && <p>Address</p>}
                        {colIndex === 3 && <p>Phone</p>}
                    </th>
                ))}
                </tr>
            </thead>
            )}
            <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                    <SkeletonBar width={`${40 + Math.random() * 50}%`} />
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </div>
    </>
  );
};

export default Skeleton;