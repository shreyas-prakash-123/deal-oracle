
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface OpportunityScoreInfoProps {
  type: 'institution' | 'funder';
}

const OpportunityScoreInfo: React.FC<OpportunityScoreInfoProps> = ({ type }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-universal-blue-700">
          <Info className="h-5 w-5" />
          <span className="sr-only">Scoring Info</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-universal-blue-900">
            {type === 'institution' ? 'Institution' : 'Funder'} Opportunity Score Calculation
          </h3>
          
          <p className="text-sm text-gray-600">
            The opportunity score is calculated using a weighted algorithm that considers
            multiple factors to determine the potential value of establishing a Transformative Agreement.
          </p>

          <div className="mt-3 space-y-2">
            <h4 className="font-medium text-universal-blue-800">Factors Considered:</h4>
            
            {type === 'institution' ? (
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li><span className="font-medium">Submission Volume (25%)</span>: Total research output</li>
                <li><span className="font-medium">Open Access Ratio (20%)</span>: Current OA adoption</li>
                <li><span className="font-medium">APC Spend (30%)</span>: Financial commitment to publishing</li>
                <li><span className="font-medium">Acceptance Rate (15%)</span>: Quality of research</li>
                <li><span className="font-medium">Non-OA Volume (10%)</span>: Potential for conversion to OA</li>
              </ul>
            ) : (
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li><span className="font-medium">Total Funded Articles (25%)</span>: Research funding volume</li>
                <li><span className="font-medium">Open Access Ratio (20%)</span>: Current OA policy adoption</li>
                <li><span className="font-medium">Total Spend (30%)</span>: Financial capacity</li>
                <li><span className="font-medium">Subscription Articles (25%)</span>: Potential for conversion to OA</li>
              </ul>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Scores range from 0-100, with higher scores indicating better candidates for Transformative Agreements.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OpportunityScoreInfo;
