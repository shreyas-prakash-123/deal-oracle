
import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { Institution, Funder } from '@/types/dashboard';
import OpportunityOverlay from './OpportunityOverlay';

interface OpportunityDetailsSidebarProps {
  selectedItem: Institution | Funder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OpportunityDetailsSidebar: React.FC<OpportunityDetailsSidebarProps> = ({ 
  selectedItem, 
  open, 
  onOpenChange 
}) => {
  if (!selectedItem) return null;

  // Generate simulated opportunity data for charts
  const generateOpportunityData = () => {
    // For institutions
    if ('submissionCount' in selectedItem) {
      return [
        { name: 'Current Submissions', value: selectedItem.submissionCount },
        { name: 'Current OA Articles', value: selectedItem.oaCount },
        { name: 'Potential OA Growth', value: Math.round(selectedItem.submissionCount * 0.4) },
      ];
    } 
    // For funders
    else {
      return [
        { name: 'Current Funded Articles', value: selectedItem.totalFundedArticles },
        { name: 'Current OA Articles', value: selectedItem.oaArticles },
        { name: 'Potential OA Growth', value: Math.round(selectedItem.totalFundedArticles * 0.35) },
      ];
    }
  };

  // Generate revenue projection data
  const generateRevenueData = () => {
    // Base calculations on the type of entity
    const baseValue = 'apcSpend' in selectedItem 
      ? selectedItem.apcSpend 
      : selectedItem.totalSpend;
    
    return [
      { name: 'Current Revenue', value: baseValue },
      { name: 'Year 1 Projected', value: Math.round(baseValue * 1.2) },
      { name: 'Year 2 Projected', value: Math.round(baseValue * 1.4) },
      { name: 'Year 3 Projected', value: Math.round(baseValue * 1.65) },
    ];
  };

  return (
    <>
      <OpportunityOverlay isVisible={open} onClose={() => onOpenChange(false)} />
      <div 
        className={`fixed inset-y-0 right-0 w-[380px] bg-white border-l border-universal-blue-300 shadow-lg transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'} z-30 overflow-y-auto flex flex-col`}
      >
        <div className="p-3 bg-universal-blue-100/70 sticky top-0 z-10 border-b border-universal-blue-300 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-universal-blue-900">
              {'submissionCount' in selectedItem ? 'Institution' : 'Funder'} Opportunity
            </h2>
            <p className="text-gray-600 text-sm">{selectedItem.name} - {selectedItem.country}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-7 w-7 hover:bg-universal-blue-300/30"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Card className="shadow-sm border-universal-blue-300">
                <CardHeader className="pb-2 pt-3 bg-universal-blue-100/30">
                  <CardTitle className="text-base text-universal-blue-900">Opportunity Metrics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Opportunity Score:</span>
                      <Badge className={`${
                        selectedItem.opportunityScore >= 85 ? 'bg-universal-blue-700 hover:bg-universal-blue-900' :
                        selectedItem.opportunityScore >= 70 ? 'bg-universal-blue-500 hover:bg-universal-blue-700' : 'bg-universal-blue-300 hover:bg-universal-blue-500'
                      }`}>
                        {selectedItem.opportunityScore}
                      </Badge>
                    </div>
                    
                    {'submissionCount' in selectedItem ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Total Submissions:</span>
                          <span className="font-medium">{selectedItem.submissionCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Current OA Articles:</span>
                          <span className="font-medium">{selectedItem.oaCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Current APC Spend:</span>
                          <span className="font-medium">${selectedItem.apcSpend.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Department:</span>
                          <span className="font-medium">{selectedItem.department || 'Multiple'}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Total Articles:</span>
                          <span className="font-medium">{selectedItem.totalFundedArticles.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Current OA Articles:</span>
                          <span className="font-medium">{selectedItem.oaArticles.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Funder Type:</span>
                          <span className="font-medium">{selectedItem.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Total Spend:</span>
                          <span className="font-medium">${selectedItem.totalSpend.toLocaleString()}</span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-slate-700">Est. Conversion Rate:</span>
                      <span className="font-medium">
                        {Math.round(70 + (selectedItem.opportunityScore / 5))}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-universal-blue-300">
                <CardHeader className="pb-2 pt-3 bg-universal-blue-100/30">
                  <CardTitle className="text-base text-universal-blue-900">Growth Potential</CardTitle>
                </CardHeader>
                <CardContent className="h-[240px] pt-0 pb-3">
                  <ChartContainer 
                    config={{
                      "Current Submissions": { color: "#94a3b8" },
                      "Current OA Articles": { color: "#2681A7" },
                      "Potential OA Growth": { color: "#42AAC7" },
                      "Current Funded Articles": { color: "#94a3b8" },
                    }}
                  >
                    <BarChart data={generateOpportunityData()} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Bar dataKey="value" fill="#42AAC7" radius={[4, 4, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-universal-blue-300">
              <CardHeader className="pb-2 pt-3 bg-universal-blue-100/30">
                <CardTitle className="text-base text-universal-blue-900">Projected Revenue Impact</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] pt-0 pb-3">
                <ChartContainer 
                  config={{
                    "Current Revenue": { color: "#94a3b8" },
                    "Year 1 Projected": { color: "#6FC0D4" },
                    "Year 2 Projected": { color: "#42AAC7" },
                    "Year 3 Projected": { color: "#1A4B6E" },
                  }}
                >
                  <BarChart data={generateRevenueData()} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                    <ChartTooltip />
                    <Bar dataKey="value" fill="#2681A7" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-universal-blue-300">
              <CardHeader className="pb-2 pt-3 bg-universal-blue-100/30">
                <CardTitle className="text-base text-universal-blue-900">Recommended Steps</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-3">
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li className="text-slate-800">
                    Contact {selectedItem.name} to schedule initial meeting
                  </li>
                  <li className="text-slate-800">
                    Prepare proposal based on {
                      'submissionCount' in selectedItem ? 
                        `${selectedItem.submissionCount} submissions` : 
                        `${selectedItem.totalFundedArticles} funded articles`
                    }
                  </li>
                  <li className="text-slate-800">
                    Highlight cost savings vs current expenditure
                  </li>
                  <li className="text-slate-800">
                    Emphasize compliance with {selectedItem.country} OA policies
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="sticky bottom-0 p-3 w-full border-t border-universal-blue-300 bg-universal-blue-100/50 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="border-universal-blue-500 text-universal-blue-700">Close</Button>
          <Button size="sm" className="bg-universal-blue-500 hover:bg-universal-blue-700">Create Proposal</Button>
        </div>
      </div>
    </>
  );
};

export default OpportunityDetailsSidebar;
