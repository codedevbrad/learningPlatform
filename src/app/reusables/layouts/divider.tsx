
export default function DividerWithText ({ className, children }) {
    return (
      <div className={`relative flex items-center justify-center py-2 z-0 ${className}`}>
        <p className={`bg-white px-2 z-10 `}>{children}</p>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    );
};  