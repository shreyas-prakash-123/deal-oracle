
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchInstitutions, getLicenseDistribution, getJournalTypeDistribution } from '@/services/mockDataService';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';

// Universal Blue colors for consistent charts
const CHART_COLORS = ['#42AAC7', '#6FC0D4', '#9ED4E0', '#1A4B6E'];

const InstitutionSummary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: institutions, isLoading } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions
  });

  const filteredInstitutions = institutions?.filter(institution => 
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    institution.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const licenseData = getLicenseDistribution();
  const journalTypeData = getJournalTypeDistribution();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Institutions Overview</h2>
        <div className="flex gap-4">
          <Input 
            placeholder="Search institutions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">License Distribution</h3>
          <ChartContainer config={{}} className="h-64">
            <PieChart>
              <Pie
                data={licenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {licenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>

        <div className="bg-card border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Journal Type Distribution</h3>
          <ChartContainer config={{}} className="h-64">
            <PieChart>
              <Pie
                data={journalTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {journalTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Accepted</TableHead>
              <TableHead>OA Articles</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>APC Spend</TableHead>
              <TableHead>Deal Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : filteredInstitutions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No institutions found</TableCell>
              </TableRow>
            ) : (
              filteredInstitutions?.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell className="font-medium">{institution.name}</TableCell>
                  <TableCell>{institution.country}</TableCell>
                  <TableCell>{institution.submissionCount.toLocaleString()}</TableCell>
                  <TableCell>{institution.acceptedCount.toLocaleString()}</TableCell>
                  <TableCell>{institution.oaCount.toLocaleString()}</TableCell>
                  <TableCell>{institution.subscriptionCount.toLocaleString()}</TableCell>
                  <TableCell>${(institution.apcSpend/1000).toFixed(0)}k</TableCell>
                  <TableCell>
                    {institution.hasExistingDeal ? (
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
      </div>
    </div>
  );
};

export default InstitutionSummary;
