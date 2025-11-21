import React from 'react';
import { AgentItem } from '../types';
import { MetricPill } from './MetricPill';
import { PrototypeView } from './PrototypeView';

interface Props {
  agent: AgentItem;
  onClose: () => void;
}

export const AgentDetail: React.FC<Props> = ({ agent, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Column: Interactive Chat Simulator */}
        <div className="w-full md:w-6/12 bg-slate-50 p-8 flex flex-col border-b md:border-b-0 md:border-r border-slate-200">
           <div className="flex-1 h-full min-h-0 shadow-xl rounded-2xl overflow-hidden">
              <PrototypeView agent={agent} />
           </div>
        </div>

        {/* Right Column: Details, Metrics */}
        <div className="w-full md:w-6/12 p-8 md:p-10 overflow-y-auto flex flex-col relative bg-white">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-full transition-all z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Header Info */}
          <div className="mb-8 pr-8">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-sprout-50 rounded-2xl border border-sprout-100 flex items-center justify-center text-4xl shrink-0">
                {agent.icon.startsWith('<svg') ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: agent.icon
                        .replace('width="24"', 'width="40"')
                        .replace('height="24"', 'height="40"')
                    }}
                    className="flex items-center justify-center"
                  />
                ) : (
                  agent.icon
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{agent.title}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {agent.horizon} Release
                </span>
              </div>
            </div>
          </div>

          {/* What This Agent Solves */}
          {agent.whatItSolves && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3">What This Agent Solves</h3>
              {agent.whatItSolves.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* How It Drives Our 2026 Targets */}
          {agent.howItDrives2026 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">How It Drives Our 2026 Targets</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">MAU:</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {agent.howItDrives2026.mau}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Adoption:</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {agent.howItDrives2026.adoption}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Capacity:</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {agent.howItDrives2026.capacity}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Accuracy:</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {agent.howItDrives2026.accuracy}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};