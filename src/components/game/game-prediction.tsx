'use client';

import { PickResponse } from '@/types/api.types';

interface GamePredictionProps {
  prediction: PickResponse;
}

export function GamePrediction({ prediction }: GamePredictionProps) {
  // Format confidence as percentage
  const confidencePercent = Math.round(prediction.confidence * 100);
  
  // Determine confidence level class
  const getConfidenceClass = () => {
    if (confidencePercent >= 70) {
      return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    } else if (confidencePercent >= 40) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    } else {
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Game Prediction</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(prediction.generatedAtUTC).toLocaleString()}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center mb-6">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {prediction.game.away} @ {prediction.game.home}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {prediction.league.toUpperCase()} • Total: {prediction.game.line} • Odds: {prediction.game.odds}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full text-lg font-bold ${
              prediction.pick === 'Over' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                : 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
            }`}>
              {prediction.pick}
            </div>
            
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceClass()}`}>
              {confidencePercent}% Confidence
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Reasoning</h3>
          <p className="text-gray-700 dark:text-gray-300">{prediction.reasoning}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Signals</h3>
          <div className="space-y-3">
            {prediction.signals.recentFormNote && (
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Recent Form</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{prediction.signals.recentFormNote}</div>
              </div>
            )}
            
            {prediction.signals.injuryOrRestNote && (
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Injury/Rest</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{prediction.signals.injuryOrRestNote}</div>
              </div>
            )}
            
            {prediction.signals.contextNote && (
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Context</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{prediction.signals.contextNote}</div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sources</h3>
          <div className="flex flex-wrap gap-2">
            {prediction.sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Source {index + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

