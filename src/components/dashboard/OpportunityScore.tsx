import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions, fetchFunders } from '@/services/mockDataService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { Institution, Funder } from '@/types/dashboard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from "@/components/ui/drawer";

import OpportunityDetailsSidebar from './OpportunityDetailsSidebar';
import OpportunityScoreInfo from './OpportunityScoreInfo';

// Universal Blue colors for consistent charts
const CHART_COLORS = ['#42AAC7', '#6FC0D4', '#9ED4E0', '#1A4B6E'];

const OpportunityScore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('institutions');
  const [selectedItem, setSelectedItem] = useState<Institution | Funder | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { data: institutions, isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions
  });

  const { data: funders, isLoading: isLoadingFunders } = useQuery({
    queryKey: ['funders'],
    queryFn: fetchFunders
  });

  const filteredInstitutions = institutions?.filter(institution => 
    !institution.hasExistingDeal &&
    (searchTerm === '' || 
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      institution.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => b.opportunityScore - a.opportunityScore);

  const filteredFunders = funders?.filter(funder => 
    !funder.hasExistingDeal &&
    (searchTerm === '' || 
      funder.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      funder.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => b.opportunityScore - a.opportunityScore);

  const handleViewDetails = (item: Institution | Funder) => {
    setSelectedItem(item);
    setSidebarOpen(true);
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle>Opportunity Insights</AlertTitle>
        <AlertDescription>
          This view highlights institutions and funders without existing deals, ranked by their opportunity score. 
          Higher scores indicate better candidates for Transformative Agreements.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">High Opportunity Targets</h2>
        <div className="flex gap-4">
          <Input 
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Tabs defaultValue="institutions" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-[400px] grid-cols-2 bg-universal-blue-100">
          <TabsTrigger 
            value="institutions" 
            className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
          >
            Institutions
          </TabsTrigger>
          <TabsTrigger 
            value="funders" 
            className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
          >
            Funders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>High-Value Institutions without TA Deals</CardTitle>
              <OpportunityScoreInfo type="institution" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Opportunity Score</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>OA Articles</TableHead>
                    <TableHead>APC Spend</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingInstitutions ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredInstitutions?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">No institutions found</TableCell>
                    </TableRow>
                  ) : (
                    filteredInstitutions?.map((institution, index) => (
                      <TableRow key={institution.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{institution.name}</TableCell>
                        <TableCell>{institution.country}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            institution.opportunityScore >= 85 ? 'bg-universal-blue-500' :
                            institution.opportunityScore >= 70 ? 'bg-amber-500' : 'bg-gray-500'
                          }`}>
                            {institution.opportunityScore}
                          </Badge>
                        </TableCell>
                        <TableCell>{institution.submissionCount.toLocaleString()}</TableCell>
                        <TableCell>{institution.oaCount.toLocaleString()}</TableCell>
                        <TableCell>${(institution.apcSpend/1000).toFixed(0)}k</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(institution)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>High-Value Funders without TA Deals</CardTitle>
              <OpportunityScoreInfo type="funder" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Funder</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Opportunity Score</TableHead>
                    <TableHead>Total Articles</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingFunders ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredFunders?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">No funders found</TableCell>
                    </TableRow>
                  ) : (
                    filteredFunders?.map((funder, index) => (
                      <TableRow key={funder.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{funder.name}</TableCell>
                        <TableCell>{funder.country}</TableCell>
                        <TableCell>{funder.type}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            funder.opportunityScore >= 85 ? 'bg-universal-blue-500' :
                            funder.opportunityScore >= 70 ? 'bg-amber-500' : 'bg-gray-500'
                          }`}>
                            {funder.opportunityScore}
                          </Badge>
                        </TableCell>
                        <TableCell>{funder.totalFundedArticles.toLocaleString()}</TableCell>
                        <TableCell>${(funder.totalSpend/1000).toFixed(0)}k</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleViewDetails(funder)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Opportunity Details Sidebar */}
      <OpportunityDetailsSidebar 
        selectedItem={selectedItem} 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
      />
    </div>
  );
};

export default OpportunityScore;
