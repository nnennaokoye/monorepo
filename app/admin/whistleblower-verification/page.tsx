"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Lock,
  Zap,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WhistleblowerVerificationPanel() {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<
    "pending" | "approved" | "rejected" | "all"
  >("pending");

  // Mock data for whistleblower applications
  const applications = [
    {
      id: 1,
      name: "Chiamaka Okonkwo",
      email: "chiamaka@email.com",
      phone: "+234 812 345 6789",
      address: "Block 5, Flat 2A, Yaba, Lagos",
      linkedin: "https://linkedin.com/in/chiamaka-okonkwo",
      facebook: "https://facebook.com/chiamaka.okonkwo",
      instagram: "https://instagram.com/chiamaka_ok",
      status: "pending",
      appliedDate: "Dec 20, 2024",
      redFlags: ["New Instagram account (created 3 months ago)"],
      greenFlags: [
        "Real LinkedIn profile with job history at tech company",
        "Facebook account with real friends and location check-ins in Yaba",
        "Job title matches profile bio",
      ],
      socialScore: 78,
    },
    {
      id: 2,
      name: "John Property Consultant",
      email: "john@realestate.com",
      phone: "+234 801 234 5678",
      address: "Block 3, Flat 1C, Yaba, Lagos",
      linkedin: "https://linkedin.com/in/john-realtor",
      facebook: "https://facebook.com/johnproperty",
      instagram: "https://instagram.com/johnproperties",
      status: "pending",
      appliedDate: "Dec 18, 2024",
      redFlags: [
        'Instagram bio explicitly says "Properties for rent - DM me"',
        "Posts 20+ properties per week on Instagram",
        "Instagram account created 2 weeks ago",
        "Email domain is real estate company",
        "This is their 5th application this month",
        "Location posts show properties in multiple cities",
      ],
      greenFlags: [],
      socialScore: 8,
    },
    {
      id: 3,
      name: "Adanna Smith",
      email: "adanna@email.com",
      phone: "+234 803 456 7890",
      address: "Block 2, Flat 4D, Yaba, Lagos",
      linkedin: "https://linkedin.com/in/adanna-smith",
      facebook: "https://facebook.com/adanna.smith",
      instagram: "https://instagram.com/adanna_smith",
      status: "approved",
      appliedDate: "Dec 15, 2024",
      approvedDate: "Dec 16, 2024",
      redFlags: [],
      greenFlags: [
        "Strong LinkedIn profile with 5+ year work history",
        "Real job at established company",
        "Facebook shows real social life with friends",
        "Instagram has regular personal posts (not property focused)",
        "All location tags match Yaba address",
      ],
      socialScore: 92,
    },
  ];

  const filtered =
    filterStatus === "all"
      ? applications
      : applications.filter((app) => app.status === filterStatus);
  const selected = selectedApplication
    ? applications.find((app) => app.id === Number(selectedApplication))
    : null;

  const handleApprove = (id: number) => {
    // In real app, this would call an API
    console.log("Approved:", id);
  };

  const handleReject = (id: number) => {
    // In real app, this would call an API
    console.log("Rejected:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-3 border-foreground bg-card p-4 md:p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-black md:text-3xl">
            Whistleblower Verification Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Review and approve/reject whistleblower applications
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Application List */}
          <div className="lg:col-span-1">
            <div className="mb-4 border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <label className="text-sm font-bold mb-3 block">
                Filter by Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["pending", "approved", "rejected", "all"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`border-2 border-foreground p-2 text-xs font-bold transition-all ${
                      filterStatus === status
                        ? "bg-primary shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                        : "bg-card"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {filtered.map((app) => (
                <Card
                  key={app.id}
                  onClick={() => setSelectedApplication(String(app.id))}
                  className={`border-3 border-foreground p-3 cursor-pointer transition-all ${
                    selectedApplication === String(app.id)
                      ? "bg-primary shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                      : "bg-card hover:bg-muted shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {app.appliedDate}
                      </p>
                    </div>
                    {app.status === "pending" && (
                      <AlertCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    )}
                    {app.status === "approved" && (
                      <CheckCircle className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                    )}
                    {app.status === "rejected" && (
                      <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Detail View */}
          {selected && (
            <div className="lg:col-span-2">
              <Card className="border-3 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selected.address}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 border-2 border-foreground font-bold text-sm ${
                      selected.status === "pending"
                        ? "bg-accent"
                        : selected.status === "approved"
                        ? "bg-secondary"
                        : "bg-destructive"
                    }`}
                  >
                    {selected.status.toUpperCase()}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-3 border-foreground p-4 mb-6 bg-muted">
                  <p className="text-xs font-bold text-muted-foreground mb-3">
                    CONTACT INFO
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-bold">Email:</span> {selected.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {selected.phone}
                    </p>
                    <p>
                      <span className="font-bold">Applied:</span>{" "}
                      {selected.appliedDate}
                    </p>
                  </div>
                </div>

                {/* Social Score */}
                <div className="mb-6 p-4 border-3 border-foreground bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold">
                      SOCIAL VERIFICATION SCORE
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center border-3 border-foreground bg-secondary font-bold">
                      {selected.socialScore}
                    </div>
                  </div>
                  <div className="w-full border-2 border-foreground h-2 bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selected.socialScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Score above 70 = Generally safe • Below 30 = Likely fraud
                  </p>
                </div>

                {/* Green Flags */}
                {selected.greenFlags.length > 0 && (
                  <div className="mb-6 border-3 border-secondary bg-green-50 p-4">
                    <p className="font-bold text-sm text-secondary mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      VERIFIED SIGNALS
                    </p>
                    <ul className="space-y-2">
                      {selected.greenFlags.map((flag, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-secondary flex gap-2"
                        >
                          <span className="mt-0.5">✓</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Red Flags */}
                {selected.redFlags.length > 0 && (
                  <div className="mb-6 border-3 border-destructive bg-red-50 p-4">
                    <p className="font-bold text-sm text-destructive mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      RED FLAGS
                    </p>
                    <ul className="space-y-2">
                      {selected.redFlags.map((flag, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-destructive flex gap-2"
                        >
                          <span className="mt-0.5">!</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Social Links */}
                <div className="mb-6 border-3 border-foreground p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-3">
                    SOCIAL PROFILES (Click to verify)
                  </p>
                  <div className="space-y-2">
                    <a
                      href={selected.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline border-b border-foreground pb-2"
                    >
                      <Eye className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={selected.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline border-b border-foreground pb-2"
                    >
                      <Eye className="h-4 w-4" />
                      Facebook Profile
                    </a>
                    <a
                      href={selected.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      Instagram Profile
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                {selected.status === "pending" && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(selected.id)}
                      className="flex-1 border-3 border-foreground bg-secondary px-6 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(selected.id)}
                      className="flex-1 border-3 border-destructive bg-transparent px-6 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                    >
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
