
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OpportunityScore from '@/components/dashboard/OpportunityScore';
import InstitutionSummary from '@/components/dashboard/InstitutionSummary';
import FunderInfluenceMap from '@/components/dashboard/FunderInfluenceMap';
import ValueRealizedTracker from '@/components/dashboard/ValueRealizedTracker';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('opportunityScore');

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-universal-blue-900">Universal Publishing Value Dashboard</h1>
        <Button 
          onClick={handleRefreshData}
          className="bg-universal-blue-500 hover:bg-universal-blue-700"
        >
          Refresh Data
        </Button>
      </div>

      <Tabs defaultValue="opportunityScore" value={activeView} onValueChange={setActiveView} className="w-full">
        <div className="border-b border-universal-blue-300">
          <TabsList className="relative h-auto w-full bg-transparent p-0 flex">
            <TabsTrigger 
              value="opportunityScore"
              className="flex-1 rounded-t-lg py-3 text-base font-medium border-b-2 border-transparent data-[state=active]:border-universal-blue-500 data-[state=active]:bg-universal-blue-100/70 data-[state=active]:text-universal-blue-900 transition-all"
            >
              Opportunity Score
            </TabsTrigger>
            <TabsTrigger 
              value="institutionSummary"
              className="flex-1 rounded-t-lg py-3 text-base font-medium border-b-2 border-transparent data-[state=active]:border-universal-blue-500 data-[state=active]:bg-universal-blue-100/70 data-[state=active]:text-universal-blue-900 transition-all"
            >
              Institution Summary
            </TabsTrigger>
            <TabsTrigger 
              value="funderInfluence"
              className="flex-1 rounded-t-lg py-3 text-base font-medium border-b-2 border-transparent data-[state=active]:border-universal-blue-500 data-[state=active]:bg-universal-blue-100/70 data-[state=active]:text-universal-blue-900 transition-all"
            >
              Funder Influence Map
            </TabsTrigger>
            <TabsTrigger 
              value="valueRealized"
              className="flex-1 rounded-t-lg py-3 text-base font-medium border-b-2 border-transparent data-[state=active]:border-universal-blue-500 data-[state=active]:bg-universal-blue-100/70 data-[state=active]:text-universal-blue-900 transition-all"
            >
              Value Realized
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="opportunityScore" className="mt-6">
          <Card className="border-universal-blue-300">
            <CardHeader className="bg-universal-blue-100/50 py-6">
              <CardTitle className="text-universal-blue-900">Opportunity Score</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <OpportunityScore />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="institutionSummary" className="mt-6">
          <Card className="border-universal-blue-300">
            <CardHeader className="bg-universal-blue-100/50 py-6">
              <CardTitle className="text-universal-blue-900">Institution Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <InstitutionSummary />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funderInfluence" className="mt-6">
          <Card className="border-universal-blue-300">
            <CardHeader className="bg-universal-blue-100/50 py-6">
              <CardTitle className="text-universal-blue-900">Funder Influence Map</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <FunderInfluenceMap />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="valueRealized" className="mt-6">
          <Card className="border-universal-blue-300">
            <CardHeader className="bg-universal-blue-100/50 py-6">
              <CardTitle className="text-universal-blue-900">Value Realized Tracker</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ValueRealizedTracker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
