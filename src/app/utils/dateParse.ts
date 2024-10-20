import { formatDistance, format, differenceInDays, add, sub, startOfDay, endOfDay } from 'date-fns';

/**
 * Gets a human-readable distance from the given date to the current date.
 *
 * @param {string | Date} createdAt - The creation date, either as a string (ISO format) or a Date object.
 * @returns {string} - The distance in time from the `createdAt` date to now, with a suffix (e.g., "3 days ago").
 */
export const getTimeFrom = (createdAt: string | Date): string => {
    let displayTime = 'Unknown time';
    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
    displayTime = formatDistance(date, new Date(), { addSuffix: true });
    return displayTime;
};

/**
 * Gets the time remaining until a specific future date.
 *
 * @param {string | Date} futureDate - The future date, either as a string (ISO format) or a Date object.
 * @returns {string} - The distance in time from now to the `futureDate`, with a suffix (e.g., "in 3 days").
 */
export const getTimeUntil = (futureDate: string | Date): string => {
    const date = futureDate instanceof Date ? futureDate : new Date(futureDate);
    return formatDistance(new Date(), date, { addSuffix: true });
};

/**
 * Formats a date into a human-readable string.
 *
 * @param {string | Date} date - The date to format.
 * @param {string} [formatStr="MMMM do, yyyy"] - The format string for the date-fns format function.
 * @returns {string} - The formatted date.
 */
export const formatDate = (date: string | Date, formatStr: string = "MMMM do, yyyy"): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return format(parsedDate, formatStr);
};

/**
 * Checks if a given date is in the past.
 *
 * @param {string | Date} date - The date to check.
 * @returns {boolean} - True if the date is in the past, false otherwise.
 */
export const isDateInPast = (date: string | Date): boolean => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate < new Date();
};

/**
 * Gets the difference in days between two dates.
 *
 * @param {string | Date} date1 - The first date.
 * @param {string | Date} date2 - The second date.
 * @returns {number} - The number of days between the two dates.
 */
export const getDaysDifference = (date1: string | Date, date2: string | Date): number => {
    const parsedDate1 = date1 instanceof Date ? date1 : new Date(date1);
    const parsedDate2 = date2 instanceof Date ? date2 : new Date(date2);
    return differenceInDays(parsedDate1, parsedDate2);
};

/**
 * Gets the current date and time in a human-readable format.
 *
 * @param {string} [formatStr="yyyy-MM-dd HH:mm:ss"] - The format string for the date-fns format function.
 * @returns {string} - The current date and time.
 */
export const getCurrentDateTime = (formatStr: string = "yyyy-MM-dd HH:mm:ss"): string => {
    return format(new Date(), formatStr);
};

/**
 * Adds or subtracts a specific amount of time from a date.
 *
 * @param {string | Date} date - The date to manipulate.
 * @param {object} time - The time object specifying what to add/subtract (e.g., { days: 5 }).
 * @param {boolean} [isSubtraction=false] - Set to true to subtract the time.
 * @returns {Date} - The new date with the time added or subtracted.
 */
export const manipulateDate = (
    date: string | Date,
    time: { days?: number; weeks?: number; months?: number; years?: number },
    isSubtraction: boolean = false
): Date => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    if (isSubtraction) {
        return sub(parsedDate, time);
    } else {
        return add(parsedDate, time);
    }
};

/**
 * Gets the start of the given date's day.
 *
 * @param {string | Date} date - The date.
 * @returns {Date} - The start of the day.
 */
export const getStartOfDay = (date: string | Date): Date => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return startOfDay(parsedDate);
};

/**
 * Gets the end of the given date's day.
 *
 * @param {string | Date} date - The date.
 * @returns {Date} - The end of the day.
 */
export const getEndOfDay = (date: string | Date): Date => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return endOfDay(parsedDate);
};
