import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getTimeFrom, formatDate } from '@/app/utils/dateParse'
import Title from '../../../../../content/title';

interface AuthorProps {
  name: string;
  createdAt: string | Date;
  avatarUrl: string;
}

const AuthorOf: React.FC<AuthorProps> = ({ name, createdAt, avatarUrl }) => {
  const timePosted = getTimeFrom(createdAt);
  const dateFormatted = formatDate( createdAt );

  return (
    <div className="flex items-center space-x-4 my-3">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <Title title={ name } variant="subheading2" noMargin={ true } className="p-0 m-0" />
        <p className="text-xs text-gray-500">{timePosted} on { dateFormatted } </p>
      </div>
    </div>
  );
};

export default AuthorOf;