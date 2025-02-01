const IconWrapper = ({ IconComponent, size = "medium", ...props }) => {
    // Define size mappings for reusable icons
    const sizeClasses = {
      small: "w-7 h-7",
      medium: "w-10 h-10",
      large: "w-14 h-14",
    };
  
    // Default to "medium" size if the size is not in the map
    const svgSizeClass = sizeClasses[size] || sizeClasses.medium;
  
    return (
      <div className={` ${svgSizeClass}`}>
             { IconComponent ? (
                 <IconComponent className={  `${svgSizeClass}`} {...props}  />
             ) : (
                null
             )}
      </div>
    );
  };
  
  export default IconWrapper;  