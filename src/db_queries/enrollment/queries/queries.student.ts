'use server'

import { Subscription, SubscriptionStatus } from '@prisma/client';
import { db_fetchUser } from '@/db_queries/user/queries';
import { add30DaysToDate, getDaysLeftOfSubscription } from '../utils';
import prisma from '../../../../prisma/client';

/**
 * Expires a subscription by setting status = EXPIRED.
 * This is used if we detect it's no longer valid (0 days left).
 **/
export async function expireSubscription(subscriptionId: string): Promise<Subscription> {
  try {
    return await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: SubscriptionStatus.EXPIRED },
    });
  } catch (error) {
    throw new Error(`Failed to expire subscription (ID: ${subscriptionId}): ${error}`);
  }
}

/**
 * Cancels a subscription (user-initiated cancellation).
 **/
export async function cancelSubscription(subscriptionId: string): Promise<Subscription> {
  try {
    return await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: SubscriptionStatus.CANCELLED },
    });
  } catch (error) {
    throw new Error(`Failed to cancel subscription (ID: ${subscriptionId}): ${error}`);
  }
}

/**
 * Returns `true` if the user has an active subscription, otherwise `false`.
 **/
export async function checkUserSubscription(): Promise<boolean> {
  try {
    // Ensure user is logged in
    const user = await db_fetchUser();
    if (!user) {
      throw new Error("User not found. Unable to check subscription.");
    }

    // Check if user has an active subscription
    return await userHasActiveSubscription(user.id);
  } catch (error) {
    throw new Error(`Failed to check user subscription: ${error}`);
  }
}

/**
 * Checks if a user has an active subscription.
 * If expired, marks it as EXPIRED and returns false.
 **/
export async function userHasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const sub = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
        endDate: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    // No active subscription found
    if (!sub) {
      return false;
    }

    // Check remaining days
    const daysLeft = getDaysLeftOfSubscription(sub);

    // If expired, mark as EXPIRED and return false
    if (daysLeft <= 0) {
      await expireSubscription(sub.id);
      return false;
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to check active subscription for user ${userId}: ${error}`);
  }
}

/**
 * Creates a new 30-day subscription if the user does not already have one.
 **/
export async function create30DaySubscription(startDate?: Date): Promise<Subscription> {
  try {
    // Ensure user is logged in
    const user = await db_fetchUser();
    if (!user) {
      throw new Error("User not found. Unable to create a subscription.");
    }

    const userId = user.id;

    // Check if the user already has a valid subscription
    const hasActive = await userHasActiveSubscription(userId);
    if (hasActive) {
      throw new Error(`User ${userId} already has an active subscription.`);
    }

    // Create new subscription
    const actualStart = startDate ?? new Date();
    const endDate = add30DaysToDate(actualStart);

    return await prisma.subscription.create({
      data: {
        userId,
        startDate: actualStart,
        endDate,
        status: SubscriptionStatus.ACTIVE,
      },
    });
  } catch (error) {
    throw new Error(`Failed to create a 30-day subscription: ${error}`);
  }
}

/**
 * Cancels the active subscription for the logged-in user.
 **/
export async function cancelSubscriptionForUser(): Promise<{ success: boolean; message: string }> {
  try {
    // Ensure user is logged in
    const user = await db_fetchUser();
    if (!user) {
      throw new Error("User not found. Unable to cancel subscription.");
    }

    const userId = user.id;

    // Find the most recent active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
      },
      orderBy: { createdAt: "desc" },
    });

    // No active subscription found
    if (!activeSubscription) {
      throw new Error("No active subscription found to cancel.");
    }

    // Cancel the subscription
    await cancelSubscription(activeSubscription.id);

    return { success: true, message: "Subscription cancelled successfully." };
  } catch (error) {
    throw new Error(`Failed to cancel user subscription: ${error}`);
  }
}
