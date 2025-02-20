"use client";
import * as React from "react";
import useSWR from "swr";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import SubscriptionPlan from "../ui.plans";
import PaymentStep from "./step.[1]subscription";
import ConfirmationStep from "./step.[2]confirmation";

import { checkUserSubscription } from "../../queries/queries.student";

// SWR Fetcher Function
const fetchSubscriptionStatus = async () => {
  try {
    const hasSubscription = await checkUserSubscription();
    return hasSubscription ? "TUTORED" : "FREE"; // Convert boolean to expected tier
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return "FREE"; // Default to "FREE" on error
  }
};

export default function SubscriptionPlanModal({ hideIfActiveSubscription = true }) {
  const { data: currentTier, error, isLoading, mutate } = useSWR("fetchUserSubscription", fetchSubscriptionStatus);

  const steps = ["plan", "payment", "confirmation"] as const;
  const [activeTab, setActiveTab] = React.useState<(typeof steps)[number]>("plan");
  const activeIndex = steps.indexOf(activeTab);

  if (error) {
    console.error("Error loading subscription:", error);
  }

  // If `hideIfActiveSubscription` is true and user is already TUTORED, hide the modal
  if (hideIfActiveSubscription && currentTier === "TUTORED") return null;

  const handleTierSelect = (tierId: string) => {
    console.log("User selected tier: ", tierId);
    if (tierId === "TUTORED") {
      setActiveTab("payment");
    }
  };

  const handlePaymentComplete = async () => {
    setActiveTab("confirmation");

    // Revalidate subscription status after payment
    await mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="
            px-6 py-2 h-full
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
            text-white font-semibold rounded-lg shadow-lg
            hover:opacity-70 transition duration-300 ease-in-out cursor-pointer
          "
        >
          {isLoading ? "Checking..." : currentTier === "TUTORED" ? "Manage Subscription" : "Upgrade Plan"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] max-w-none overflow-y-auto h-[80%]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(newValue) => {
              const newIndex = steps.indexOf(newValue as (typeof steps)[number]);
              if (newIndex <= activeIndex) {
                setActiveTab(newValue as (typeof steps)[number]);
              }
            }}
            className="h-full flex flex-col"
          >
            {/* Hide TabsList when on the "plan" step */}
            {activeTab !== "plan" && (
              <TabsList className="mb-4">
                <TabsTrigger value="plan" disabled={steps.indexOf("plan") > activeIndex}>
                  Plan
                </TabsTrigger>
                <TabsTrigger value="payment" disabled={steps.indexOf("payment") > activeIndex}>
                  Payment
                </TabsTrigger>
                <TabsTrigger value="confirmation" disabled={steps.indexOf("confirmation") > activeIndex}>
                  Confirmation
                </TabsTrigger>
              </TabsList>
            )}

            {/* STEP 1: Plan Selection */}
            <TabsContent value="plan" className="flex-1">
              <SubscriptionPlan currentTier={ currentTier } onTierSelect={handleTierSelect} />
            </TabsContent>

            {/* STEP 2: Payment Flow */}
            <TabsContent value="payment" className="flex-1">
              <PaymentStep onPaymentComplete={handlePaymentComplete} />
            </TabsContent>

            {/* STEP 3: Confirmation */}
            <TabsContent value="confirmation" className="flex-1">
              <ConfirmationStep />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
