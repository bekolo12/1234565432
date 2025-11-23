import * as React from 'react';
import { useState } from 'react';
import { generateProjectInsight } from '../services/geminiService';
import { ProjectData } from '../types';
import { Bot, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface AIInsightsProps {
  data: ProjectData;
}

const AIInsights: React.FC<AIInsightsProps> = ({ data }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateInsight = async () => {
    setLoading(true);
    try {
      const result = await generateProjectInsight(data);
      setInsight(result);
    } catch (e) {
      setInsight("Failed to retrieve analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-1 lg:col-span-4 mt-6">
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Bot className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Gemini Strategic Analysis</h3>
                    <p className="text-sm text-slate-400">AI-powered risk assessment and executive summary</p>
                </div>
            </div>
            
            <button
                onClick={handleGenerateInsight}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-lg shadow-indigo-500/20"
            >
                {loading ? (
                    <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyzing Data...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4" />
                        Generate Insights
                    </>
                )}
            </button>
        </div>

        {insight && (
            <div className="mt-4 p-4 bg-slate-950/50 rounded-lg border border-indigo-500/20 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="prose prose-invert prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                       {insight} 
                    </div>
                </div>
            </div>
        )}

        {!insight && !loading && (
            <div className="mt-4 p-4 rounded-lg border border-dashed border-slate-700 flex items-center gap-3 text-slate-500">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">Click "Generate Insights" to process KPIs via Google Gemini 2.5 Flash model.</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;