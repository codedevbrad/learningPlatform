import { format } from 'date-fns'
import { Subscription } from '@prisma/client'

/**
 * Returns the subscriptionMonth string in "YYYY-MM" format
 * from a given Date (e.g., 2025-11, 2025-12).
*/

export function getSubscriptionMonth(date: Date): string {
  return format(date, 'yyyy-MM');
}

/**
 * Adds 30 days to a given Date (strict 30 x 24 hours),
 * returning a new Date object.
*/

export function add30DaysToDate(date: Date): Date {
  // 30 days in milliseconds: 30 * 24 * 60 * 60 * 1000
  const millisecondsIn30Days = 30 * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + millisecondsIn30Days);
}


/**
 * Returns how many full days are left in a subscription, based on endDate.
 * For example, if endDate is 36 hours from now, this will return 2 (rounding up).
 * If the subscription is already expired (endDate <= now), returns 0.
*/

export function getDaysLeftOfSubscription(subscription: Subscription): number {
  const now = new Date();
  const endTime = subscription.endDate.getTime();
  const nowTime = now.getTime();

  // If already expired, no days left
  if (endTime <= nowTime) {
    return 0;
  }

  // Calculate difference in milliseconds and convert to days
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = (endTime - nowTime) / msPerDay;

  // Round up so that even part of a day counts as a full day
  return Math.ceil(diffDays);
}