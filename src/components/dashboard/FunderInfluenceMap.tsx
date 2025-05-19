import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFunders } from '@/services/mockDataService';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Universal Blue colors for consistent charts
const CHART_COLORS = ['#42AAC7', '#6FC0D4', '#9ED4E0', '#1A4B6E'];

const FunderInfluenceMap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dealFilter, setDealFilter] = useState('all'); // 'all', 'active', or 'no-deal'
  
  const { data: funders, isLoading } = useQuery({
    queryKey: ['funders'],
    queryFn: fetchFunders
  });

  const filteredFundersBySearch = funders?.filter(funder => 
    funder.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    funder.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply deal status filter
  const filteredFunders = filteredFundersBySearch?.filter(funder => {
    if (dealFilter === 'all') return true;
    if (dealFilter === 'active') return funder.hasExistingDeal;
    if (dealFilter === 'no-deal') return !funder.hasExistingDeal;
    return true;
  });

  const chartData = funders?.map(funder => ({
    name: funder.name,
    OA: funder.oaArticles,
    Subscription: funder.subscriptionArticles,
    spend: funder.totalSpend
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Funder Influence Overview</h2>
        <div className="flex gap-4">
          <Input 
            placeholder="Search funders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Funder Types</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={dealFilter} onValueChange={setDealFilter} className="mb-4">
              <TabsList className="grid grid-cols-3 w-full bg-universal-blue-100">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
                >
                  All Funders
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
                >
                  Active Deal
                </TabsTrigger>
                <TabsTrigger 
                  value="no-deal"
                  className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
                >
                  No Deal
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Government</span>
                <span className="font-semibold">
                  {filteredFunders?.filter(f => f.type === 'Government').length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Private</span>
                <span className="font-semibold">
                  {filteredFunders?.filter(f => f.type === 'Private').length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>NGO</span>
                <span className="font-semibold">
                  {filteredFunders?.filter(f => f.type === 'NGO').length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Academic</span>
                <span className="font-semibold">
                  {filteredFunders?.filter(f => f.type === 'Academic').length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Funder Article Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <BarChart 
                data={chartData.slice(0, 5)} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="OA" stackId="a" fill={CHART_COLORS[0]} />
                <Bar dataKey="Subscription" stackId="a" fill={CHART_COLORS[2]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <Tabs defaultValue="all" className="w-full">
          <div className="bg-muted/50 px-4 py-2 border-b">
            <TabsList className="inline-flex bg-universal-blue-100">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
              >
                All Funders
              </TabsTrigger>
              <TabsTrigger 
                value="active-deals"
                className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
              >
                Active Deals
              </TabsTrigger>
              <TabsTrigger 
                value="no-deals"
                className="data-[state=active]:bg-universal-blue-500 data-[state=active]:text-white"
              >
                No Deals
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <TableView 
              funders={filteredFundersBySearch} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="active-deals">
            <TableView 
              funders={filteredFundersBySearch?.filter(f => f.hasExistingDeal)} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="no-deals">
            <TableView 
              funders={filteredFundersBySearch?.filter(f => !f.hasExistingDeal)} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Modified TableView component to use consistent badge styling
const TableView: React.FC<{ funders: any[] | undefined, isLoading: boolean }> = ({ funders, isLoading }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Funder</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Total Articles</TableHead>
          <TableHead>OA Articles</TableHead>
          <TableHead>Subscription</TableHead>
          <TableHead>Total Spend</TableHead>
          <TableHead>Deal Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">Loading...</TableCell>
          </TableRow>
        ) : funders?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">No funders found</TableCell>
          </TableRow>
        ) : (
          funders?.map((funder) => (
            <TableRow key={funder.id}>
              <TableCell className="font-medium">{funder.name}</TableCell>
              <TableCell>{funder.country}</TableCell>
              <TableCell>{funder.type}</TableCell>
              <TableCell>{funder.totalFundedArticles.toLocaleString()}</TableCell>
              <TableCell>{funder.oaArticles.toLocaleString()}</TableCell>
              <TableCell>{funder.subscriptionArticles.toLocaleString()}</TableCell>
              <TableCell>${(funder.totalSpend/1000).toFixed(0)}k</TableCell>
              <TableCell>
                {funder.hasExistingDeal ? (
                  <Badge className="bg-universal-blue-500 hover:bg-universal-blue-700">Active Deal</Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-500 text-amber-500">No Deal</Badge>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default FunderInfluenceMap;
