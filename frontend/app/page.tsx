"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletButton } from "@/components/wallet-button";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Auto-redirect if already connected
  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">FUNDit</h1>
          </div>
          <WalletButton />
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold tracking-tight">
            Automated Savings on Base
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save USDC automatically with every transaction. Secure, transparent, and fully non-custodial.
          </p>
          <div className="pt-8">
            <WalletButton />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Spend & Save</CardTitle>
              <CardDescription>
                Automatically save a percentage or fixed amount on every USDC spend
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Non-Custodial</CardTitle>
              <CardDescription>
                You always maintain full control of your funds. No intermediaries.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Base Network</CardTitle>
              <CardDescription>
                Fast, cheap transactions on Base. Built for scale and efficiency.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Saving?</CardTitle>
              <CardDescription>
                Connect your wallet and start automating your savings today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WalletButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}