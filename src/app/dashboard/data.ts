import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa'; // Import specific icons

export const navigation = [
    { name: 'Courses', href: '/content/courses', current: true },
    { name: 'My learning', href: '/' , current: false },
    { name: 'Explore', href: '/explore', current: false  }
];

export const navigationAuthItems = [
    { icon: FaHome, label: "Home" },
    { icon: FaUserAlt, label: "Profile" },
    { icon: FaCog, label: "Settings" },
  ];