
import { SubscriptionStatus } from '@prisma/client';
import prisma from '../../../../prisma/client';
import {
  expireSubscription,
  cancelSubscription,
  userHasActiveSubscription,
  create30DaySubscription
} from '../queries/queries.student'; // Adjust path to where these are exported
import { db_fetchUser } from '@/db_queries/user/queries';
import { getDaysLeftOfSubscription, add30DaysToDate } from '../utils';

// 1) Mock Prisma
jest.mock('../../../../prisma/client', () => ({
  __esModule: true,
  default: {
    subscription: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// 2) Mock other dependencies
jest.mock('@/db_queries/user/queries', () => ({
  __esModule: true,
  db_fetchUser: jest.fn(),
}));

jest.mock('../utils', () => ({
  __esModule: true,
  getDaysLeftOfSubscription: jest.fn(),
  add30DaysToDate: jest.fn(),
}));

// 3) Cast mocks for TypeScript
const prismaMock = prisma as unknown as {
  subscription: {
    create: jest.Mock<any, any>;
    findUnique: jest.Mock<any, any>;
    findFirst: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
  };
};
const mockDbFetchUser = db_fetchUser as jest.MockedFunction<typeof db_fetchUser>;
const mockGetDaysLeft = getDaysLeftOfSubscription as jest.MockedFunction<typeof getDaysLeftOfSubscription>;
const mockAdd30Days = add30DaysToDate as jest.MockedFunction<typeof add30DaysToDate>;

describe('Subscription Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------
  // 1) expireSubscription Tests
  // --------------------------------------------------
  describe('expireSubscription', () => {
    it('updates a subscription status to EXPIRED', async () => {
      prismaMock.subscription.update.mockResolvedValueOnce({
        id: 'subExpire',
        userId: 'userABC',
        startDate: new Date(),
        endDate: new Date(),
        status: SubscriptionStatus.EXPIRED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await expireSubscription('subExpire');
      expect(prismaMock.subscription.update).toHaveBeenCalledWith({
        where: { id: 'subExpire' },
        data: { status: SubscriptionStatus.EXPIRED },
      });

      expect(result.status).toBe(SubscriptionStatus.EXPIRED);
    });
  });

  // --------------------------------------------------
  // 2) cancelSubscription Tests
  // --------------------------------------------------
  describe('cancelSubscription', () => {
    it('updates a subscription status to CANCELLED', async () => {
      prismaMock.subscription.update.mockResolvedValueOnce({
        id: 'subCancel',
        userId: 'userABC',
        startDate: new Date(),
        endDate: new Date(),
        status: SubscriptionStatus.CANCELLED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await cancelSubscription('subCancel');
      expect(prismaMock.subscription.update).toHaveBeenCalledWith({
        where: { id: 'subCancel' },
        data: { status: SubscriptionStatus.CANCELLED },
      });

      expect(result.status).toBe(SubscriptionStatus.CANCELLED);
    });
  });

  // --------------------------------------------------
  // 3) userHasActiveSubscription Tests
  // --------------------------------------------------
  describe('userHasActiveSubscription', () => {
    it('returns false if no active subscription is found', async () => {
      // No subscription found
      prismaMock.subscription.findFirst.mockResolvedValueOnce(null);

      const result = await userHasActiveSubscription('userABC');
      expect(result).toBe(false);
    });

    it('returns false if subscription is found but daysLeft <= 0 (expires it)', async () => {
      // Suppose we find an active sub
      prismaMock.subscription.findFirst.mockResolvedValueOnce({
        id: 'subABC',
        userId: 'userABC',
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60),
        status: SubscriptionStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // But daysLeft is 0 => expired
      mockGetDaysLeft.mockReturnValueOnce(0);

      const result = await userHasActiveSubscription('userABC');
      expect(result).toBe(false);

      // We also expect that we "expired" it
      expect(prismaMock.subscription.update).toHaveBeenCalledWith({
        where: { id: 'subABC' },
        data: { status: SubscriptionStatus.EXPIRED },
      });
    });

    it('returns true if subscription is found and daysLeft > 0', async () => {
      // Active subscription
      prismaMock.subscription.findFirst.mockResolvedValueOnce({
        id: 'subActive',
        userId: 'userABC',
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        status: SubscriptionStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // 2 days left
      mockGetDaysLeft.mockReturnValueOnce(2);

      const result = await userHasActiveSubscription('userABC');
      expect(result).toBe(true);

      // Should not expire
      expect(prismaMock.subscription.update).not.toHaveBeenCalled();
    });
  });

  // --------------------------------------------------
  // 4) create30DaySubscription Tests
  // --------------------------------------------------
  describe('create30DaySubscription', () => {
    it('throws an error if db_fetchUser returns null', async () => {
      // No user in session
      mockDbFetchUser.mockResolvedValueOnce(null);

      await expect(create30DaySubscription()).rejects.toThrowError(
        'Unable to fetch user from session'
      );
    });

    it('throws an error if user already has an active subscription', async () => {
      // Mock a user
      mockDbFetchUser.mockResolvedValueOnce({
        id: 'userABC',
        userId: 'whatever',
        bio: '',
        questions: [],
        role: 'USER',
        status: 'PENDING',
        nickname: '',
      });
      // userHasActiveSubscription => true
      prismaMock.subscription.findFirst.mockResolvedValueOnce({
        id: 'subActive',
        userId: 'userABC',
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        status: SubscriptionStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockGetDaysLeft.mockReturnValueOnce(10);

      // calling create30DaySubscription => should throw
      await expect(create30DaySubscription()).rejects.toThrowError(
        'User userABC already has an active subscription.'
      );
    });

    it('creates a new subscription if no active subscription exists', async () => {
      // user is found
      mockDbFetchUser.mockResolvedValueOnce({
        id: 'userABC',
        userId: 'whatever',
        bio: '',
        questions: [],
        role: 'USER',
        status: 'PENDING',
        nickname: '',
      });
      // userHasActiveSubscription => false (no sub found)
      prismaMock.subscription.findFirst.mockResolvedValueOnce(null);

      // add30DaysToDate => mock returning endDate
      const startDate = new Date('2025-01-01T10:00:00Z');
      const endDate = new Date('2025-01-31T10:00:00Z');
      mockAdd30Days.mockReturnValueOnce(endDate);

      // prisma.subscription.create => returns new sub
      prismaMock.subscription.create.mockResolvedValueOnce({
        id: 'subNew',
        userId: 'userABC',
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // call with a custom startDate
      const result = await create30DaySubscription(startDate);

      // confirm it calls create
      expect(prismaMock.subscription.create).toHaveBeenCalledWith({
        data: {
          userId: 'userABC',
          startDate,
          endDate,
          status: SubscriptionStatus.ACTIVE,
        },
      });
      expect(result.id).toBe('subNew');
    });
  });
});