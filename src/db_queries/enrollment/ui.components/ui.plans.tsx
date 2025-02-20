"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import { tiers } from "../tiers";
import { classNames } from "@/lib/utils";

/**
 * If `previewOnly` is `true`, we do NOT require `currentTier` or `onTierSelect`.
 */
enum ENROLLMENTTYPE {
  FREE = "FREE",
  TUTORED = "TUTORED"
}

type PreviewModeProps = {
  previewOnly: true;
  currentTier : ENROLLMENTTYPE;
  onTierSelect?: never;
};

/**
 * If `previewOnly` is `false` or undefined,
 * we DO require `currentTier` & `onTierSelect`.
 */
type NonPreviewModeProps = {
  previewOnly?: false;
  currentTier: ENROLLMENTTYPE;
  onTierSelect: (tierId: ENROLLMENTTYPE) => void;
};

type SubscriptionPlanProps = PreviewModeProps | NonPreviewModeProps;

/**
 * Determines the button label based on the current tier and the displayed tier.
 */
function getButtonLabel(
  currentTier: ENROLLMENTTYPE,
  displayedTier: ENROLLMENTTYPE
): string {
  if (currentTier === displayedTier) return "Current Tier";
  if (currentTier === ENROLLMENTTYPE.FREE && displayedTier === ENROLLMENTTYPE.TUTORED) {
    return "Upgrade to Tutored";
  }
  if (currentTier === ENROLLMENTTYPE.TUTORED && displayedTier === ENROLLMENTTYPE.FREE) {
    return "Downgrade to Free Tier";
  }
  return "Switch Plan";
}

export default function SubscriptionPlan({
  currentTier,
  onTierSelect,
  previewOnly = false
}: SubscriptionPlanProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Our Bootcamp
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Invest in Your Future
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg font-medium leading-loose text-gray-600">
          Choose a plan that fits your learning journey. Whether you're completely new
          to coding or looking to level up your skills, our bootcamp provides the
          resources and mentorship to help you succeed.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => {
            const isCurrent = !previewOnly && currentTier === tier.id;

            return (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? "lg:z-10" : "lg:mt-8",
                  "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                        "text-lg/8 font-semibold"
                      )}
                    >
                      {tier.name}
                      {!previewOnly && isCurrent && (
                        <span className="ml-2 text-sm text-indigo-600">(Current Tier)</span>
                      )}
                    </h3>
                    {tier.mostPopular && (
                      <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                        Most popular
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-semibold tracking-tight text-gray-900">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-sm/6 font-semibold text-gray-600">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {!previewOnly && (
                  <div className="mt-8">
                    {isCurrent ? (
                      <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      >
                        Current Tier
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onTierSelect(tier.id)}
                        className="w-full rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
                      >
                        {getButtonLabel(currentTier!, tier.id)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
