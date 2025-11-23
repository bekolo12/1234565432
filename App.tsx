import * as React from 'react';
import { 
  Shovel, 
  CheckCircle2, 
  AlertTriangle, 
  UtilityPole, 
  Building2,
  Activity
} from 'lucide-react';

import StatCard from './components/StatCard';
import { CivilWorksChart, NetworkDonutChart, HardwareChart } from './components/Charts';
import AIInsights from './components/AIInsights';
import { ProjectData } from './types';

// Static Data based on User Request
const PROJECT_DATA: ProjectData = {
  name: "Project Shatra",
  manager: "Rashid",
  status: "On Going",
  kpis: {
    excavation: { label: "Total Excavation", value: 84395, unit: "m", status: "neutral" },
    reinstatement: { label: "Reinstatement", value: 82810, unit: "m", status: "success", note: "98.1% Completion" },
    openTrenches: { label: "Open Trenches", value: 1585, unit: "m", status: "danger", note: "Requires Closure" },
    hdpe: { label: "Total HDPE Ducting", value: 124475, unit: "m", status: "neutral" },
    poles: { label: "Poles Installed", value: 1530, unit: "", status: "neutral" }
  },
  network: [
    { name: "Feeder Network", value: 42550, color: "#3b82f6" },
    { name: "Distribution Network", value: 81925, color: "#6366f1" }
  ],
  hardware: [
    { name: "Poles", value: 1530 },
    { name: "HH", value: 51 },
    { name: "FDTs", value: 15 }
  ]
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-blue-500" />
              <h2 className="text-xs font-bold tracking-widest text-blue-500 uppercase">Infrastructure Division</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{PROJECT_DATA.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                Manager: <span className="text-slate-200 font-medium">{PROJECT_DATA.manager}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="flex items-center gap-2">
                 Status: 
                 <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                   {PROJECT_DATA.status}
                 </span>
              </span>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-slate-500">Last Updated</p>
            <p className="text-slate-300 font-mono">{new Date().toLocaleDateString()}</p>
          </div>
        </header>

        {/* Zone A: Top Level Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Excavation"
            value="84,395"
            subValue="m"
            icon={Shovel}
            status="neutral"
            trend="High Volume Activity"
          />
          <StatCard 
            title="Reinstatement"
            value="82,810"
            subValue="m"
            icon={CheckCircle2}
            status="success"
            trend="98.1% Completion Rate"
          />
          <StatCard 
            title="Backlog (Risk)"
            value="1,585"
            subValue="m"
            icon={AlertTriangle}
            status="danger"
            trend="Open Trenches Gap"
          />
          <StatCard 
            title="Poles Installed"
            value="1,530"
            icon={UtilityPole}
            status="neutral"
            trend="Primary Hardware Asset"
          />
        </section>

        {/* Main Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Zone B: Civil Works Progress */}
          <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Civil Works Progress
                </h3>
                <span className="text-xs text-slate-500">Excavation vs Reinstatement</span>
            </div>
            <CivilWorksChart 
                data={[
                    { name: 'Excavation', value: PROJECT_DATA.kpis.excavation.value, fill: '#3b82f6' },
                    { name: 'Reinstatement', value: PROJECT_DATA.kpis.reinstatement.value, fill: '#10b981' }
                ]} 
            />
          </div>

          {/* Zone C: Network Composition */}
          <div className="col-span-1 bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Network Split</h3>
                <span className="text-xs text-slate-500">HDPE Composition</span>
            </div>
            <NetworkDonutChart data={PROJECT_DATA.network} />
          </div>

          {/* Zone D: Hardware & Assets (Horizontal) */}
          <div className="col-span-1 lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Hardware Installations</h3>
                <span className="text-xs text-slate-500">Asset Distribution</span>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                 <HardwareChart data={PROJECT_DATA.hardware} />
                 <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4">Asset Summary</h4>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400 text-sm">Poles</span>
                            <span className="font-mono text-white">1,530</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400 text-sm">Handholes (HH)</span>
                            <span className="font-mono text-white">51</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-slate-400 text-sm">Fiber Distribution Terminals (FDT)</span>
                            <span className="font-mono text-white">15</span>
                        </li>
                    </ul>
                 </div>
             </div>
          </div>
          
          {/* AI Insights Section */}
          <AIInsights data={PROJECT_DATA} />

        </div>
      </div>
    </div>
  );
};

export default App;