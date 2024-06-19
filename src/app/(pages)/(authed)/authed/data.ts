import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa' // Import specific icons ..

export const navigation = [
    { name: 'Courses', href: '/content/courses', current: true  },
    { name: 'My learning', href: '/' , current: false },
    { name: 'Explore', href: '/explore', current: false  }
];

export const navigationAuthItems = [
    { icon: FaHome, label: "Home" },
    { icon: FaUserAlt, label: "Profile" },
    { icon: FaCog, label: "Settings" },
];

export const colors = {
    app_primary_bg :  "bg-white",
    difficulty: [
        { level: 1, color: 'bg-green-400', tag: 'easy' },
        { level: 2, color: 'bg-blue-400', tag: 'medium' },
        { level: 3, color: 'bg-orange-400' , tag: 'hard'},
        { level: 4, color: 'bg-red-500', tag: 'difficult' }
    ]
}