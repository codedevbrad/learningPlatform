// Tag.js
import { colors } from "@/app/authed/data"; // Adjust the path as needed

export default function Tag({ level }: { level: number }) {
    const tagInfo = colors.difficulty.find(item => item.level === level);
    const color = tagInfo?.color || '';
    const tag = tagInfo?.tag || '';

    return (
        <span className={` pb-1 px-2 rounded-md ${color}`}>
            {tag}
        </span>
    );
}