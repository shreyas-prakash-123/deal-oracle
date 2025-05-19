
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchInstitutions, 
  fetchDashboardStats, 
  getAPCTrendData 
} from '@/services/mockDataService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

// Universal Blue colors for consistent charts
const CHART_COLORS = ['#42AAC7', '#6FC0D4', '#9ED4E0', '#1A4B6E'];

const ValueRealizedTracker: React.FC = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  const { data: institutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions
  });

  const existingDealInstitutions = institutions?.filter(institution => 
    institution.hasExistingDeal
  ).sort((a, b) => b.apcSpend - a.apcSpend);

  const apcTrendData = getAPCTrendData();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {isLoadingStats ? "Loading..." : stats?.totalSubmissions.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Access Articles</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {isLoadingStats ? "Loading..." : stats?.totalOA.toLocaleString()}
              <span className="text-sm text-muted-foreground ml-2">
                ({isLoadingStats ? "-" : Math.round((stats?.totalOA / stats?.totalAccepted) * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">APC Revenue</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {isLoadingStats ? "Loading..." : `$${(stats?.totalAPCRevenue / 1000000).toFixed(1)}M`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">Waived Amount</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {isLoadingStats ? "Loading..." : `$${(stats?.totalWaivedAmount / 1000000).toFixed(1)}M`}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="my-8">
        <CardHeader className="py-6">
          <CardTitle>APC Spend Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ChartContainer config={{}} className="h-80">
            <LineChart
              data={apcTrendData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke={CHART_COLORS[0]} 
                activeDot={{ r: 8 }} 
                name="APC Amount"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="my-8">
        <CardHeader className="py-6">
          <CardTitle>Value Realized from Existing TA Deals</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-4">Institution</TableHead>
                <TableHead className="py-4">Country</TableHead>
                <TableHead className="py-4">OA Articles</TableHead>
                <TableHead className="py-4">Subscription Articles</TableHead>
                <TableHead className="py-4">APC Spend</TableHead>
                <TableHead className="py-4">Estimated Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!existingDealInstitutions || existingDealInstitutions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No data available</TableCell>
                </TableRow>
              ) : (
                existingDealInstitutions.map((institution) => (
                  <TableRow key={institution.id}>
                    <TableCell className="font-medium py-4">{institution.name}</TableCell>
                    <TableCell className="py-4">{institution.country}</TableCell>
                    <TableCell className="py-4">{institution.oaCount.toLocaleString()}</TableCell>
                    <TableCell className="py-4">{institution.subscriptionCount.toLocaleString()}</TableCell>
                    <TableCell className="py-4">${(institution.apcSpend/1000).toFixed(0)}k</TableCell>
                    <TableCell className="text-green-600 py-4">
                      ${(institution.apcSpend * 0.25/1000).toFixed(0)}k
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueRealizedTracker;
