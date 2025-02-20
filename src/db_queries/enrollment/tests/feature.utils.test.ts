import { SubscriptionStatus } from '@prisma/client'
import { getSubscriptionMonth, add30DaysToDate, getDaysLeftOfSubscription } from '../utils'

describe('subscriptionUtils', () => {
    // ---------------------------------------------------------
    // getSubscriptionMonth tests
    // ---------------------------------------------------------
    describe('getSubscriptionMonth', () => {
      it('formats a date as YYYY-MM', () => {
        const date = new Date('2025-11-15T10:00:00Z');
        const result = getSubscriptionMonth(date);
        expect(result).toBe('2025-11');

        const anotherDate = new Date('2025-02-01T00:00:00Z');
        const anotherResult = getSubscriptionMonth(anotherDate);
        expect(anotherResult).toBe('2025-02');
      });
    });

    // ---------------------------------------------------------
    // add30DaysToDate tests
    // ---------------------------------------------------------
    describe('add30DaysToDate', () => {
      it('adds exactly 30 days (30 x 24 hours) to a given date', () => {
        const startDate = new Date('2025-11-15T10:00:00Z');
        const resultDate = add30DaysToDate(startDate);
        // 30 days after 2025-11-15T10:00:00Z => 2025-12-15T10:00:00Z
        expect(resultDate.toISOString()).toBe('2025-12-15T10:00:00.000Z');
      });

      it('ensures we do not accidentally add more than 30 days (e.g. 33)', () => {
        // We'll check the exact difference in days between start & result
        const startDate = new Date('2025-11-15T10:00:00Z');
        const resultDate = add30DaysToDate(startDate);

        const diffMs = resultDate.getTime() - startDate.getTime();
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        expect(diffMs).toBe(thirtyDaysMs); // EXACT match
      });

      it('handles a date that is already in the future, adding 30 more days', () => {
        const futureStart = new Date(Date.now() + (10 * 24 * 60 * 60 * 1000));
        const resultDate = add30DaysToDate(futureStart);

        const diffMs = resultDate.getTime() - futureStart.getTime();
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        expect(diffMs).toBe(thirtyDaysMs);
      });

      it('correctly crosses the year boundary if near end of December', () => {
        const startDate = new Date('2025-12-10T23:59:59Z');
        const resultDate = add30DaysToDate(startDate);

        const diffDays = (resultDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        // We'll round to handle partial ms in some test environments
        expect(Math.round(diffDays)).toBe(30);

        // If you want to check exact string (depending on your timezone):
        // expect(resultDate.toISOString()).toBe('2026-01-09T23:59:59.000Z');
      });
    });

    // ---------------------------------------------------------
    // getDaysLeftOfSubscription tests
    // ---------------------------------------------------------
    
    describe('getDaysLeftOfSubscription', () => {
      // The subscription's end date is 2 days before the current date, so naturally, it’s expired.
      it('returns 0 if subscription is already expired', () => {
        // 1) We'll define an end date that is definitely in the past
        //    e.g. 2 days ago from "now."
        const now = Date.now();
        const twoDaysAgo = now - (2 * 24 * 60 * 60 * 1000);
        const endDate = new Date(twoDaysAgo);
    
        // 2) Build the subscription object
        const subscription = {
          id: 'subExpired',
          userId: 'userABC',
          subscriptionMonth: '2025-11',
          startDate: new Date(now - (5 * 24 * 60 * 60 * 1000)), // started 5 days ago
          endDate,
          status: SubscriptionStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
    
        // 3) It's guaranteed to be expired => 0 days left
        expect(getDaysLeftOfSubscription(subscription)).toBe(0);
      });

      it('returns 0 if subscription ended 40 days ago', () => {
        // Current system time in ms
        const now = Date.now();
        // 40 days in milliseconds
        const fortyDaysMs = 40 * 24 * 60 * 60 * 1000;
        // Subtract 40 days from "now"
        const endDate = new Date(now - fortyDaysMs);
      
        const subscription = {
          id: 'subSuperExpired',
          userId: 'userABC',
          subscriptionMonth: '2025-12',
          startDate: new Date(now - (45 * 24 * 60 * 60 * 1000)), // started 45 days ago
          endDate,
          status: SubscriptionStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      
        // endDate is definitely in the past => 0 days left
        expect(getDaysLeftOfSubscription(subscription)).toBe(0);
      });

      it('returns the correct number of full days remaining, rounded up', () => {
        // Let's say there's about 1.4 days left
        const now = Date.now();
        const oneAndHalfDaysInMs = 1.4 * 24 * 60 * 60 * 1000; 
        const endDate = new Date(now + oneAndHalfDaysInMs);

        const subscription = {
          id: 'subPartial',
          userId: 'userABC',
          subscriptionMonth: '2025-11',
          startDate: new Date(now),
          endDate,
          status: SubscriptionStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // 1.4 days => 2 when rounding up
        expect(getDaysLeftOfSubscription(subscription)).toBe(2);
      });

      it('returns 1 if there is less than one day left but not expired', () => {
        // e.g., 10 hours left
        const now = Date.now();
        const tenHoursInMs = 10 * 60 * 60 * 1000;
        const endDate = new Date(now + tenHoursInMs);

        const subscription = {
          id: 'subShort',
          userId: 'userABC',
          subscriptionMonth: '2025-11',
          startDate: new Date(now),
          endDate,
          status: SubscriptionStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // 0.4 days => 1 day when rounding up
        expect(getDaysLeftOfSubscription(subscription)).toBe(1);
      });
  });
});
