import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getTimeFrom, formatDate } from '@/app/utils/dateParse'
import Title from '../../../../../content/title'

interface AuthorProps {
  name: string;
  createdAt: string | Date;
  avatarUrl: string;
}

/**
 * AuthorOf component displays the author's name, avatar, and the creation date of the content.
 *
 * @param {AuthorProps} props - The component's props.
 * @param {string} props.name - The name of the author.
 * @param {string | Date} props.createdAt - The date the content was created, as a string or Date object.
 * @param {string} props.avatarUrl - The URL of the author's avatar image.
 *
 * @description
 * - This component takes in the author's name, avatar URL, and the creation date.
 * - It formats and displays the time since the content was posted, along with the exact date.
 *
 * @example
 * // Example usage of AuthorOf
 * <AuthorOf 
 *   name="John Doe" 
 *   createdAt="2024-10-21T12:00:00Z" 
 *   avatarUrl="https://example.com/avatar.jpg" 
 * />
 */


const AuthorOf: React.FC<AuthorProps> = ({ name, createdAt, avatarUrl }) => {
  // Parse createdAt whether it's a string or Date
  const date = new Date(createdAt);
  const timePosted = getTimeFrom(date);
  const dateFormatted = formatDate(date);

  return (
    <div className="p-3 inline-flex items-center space-x-4 my-3">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex flex-row items-center space-x-1">
          <span> Developed by </span> 
          <Title title={name} variant="subheading2" noMargin={true} className="p-0 m-0" /> 
        </div>
        <p className="text-xs text-gray-500">{timePosted} on {dateFormatted}</p>
      </div>
    </div>
  );
};

export default AuthorOf;