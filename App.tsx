import React, { useState, useEffect } from 'react';
import { ROADMAP_DATA, JARVIS_ROADMAP_DATA } from './constants';
import { AgentItem, Horizon } from './types';
import { AgentDetail } from './components/AgentDetail';
import { LandingPage } from './components/LandingPage';
import { UnifiedAgentChatModal } from './components/UnifiedAgentChatModal';

type JarvisCategory = 'Employee' | 'People Leader' | 'HR Manager' | 'Sprout Internal';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<'friday' | 'jarvis'>('friday');
  const [selectedJarvisCategory, setSelectedJarvisCategory] = useState<JarvisCategory>('Employee');
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(null);

  // 0 = Initial, 1 = Q1, 2 = Q2, 3 = Q3, 4 = Q4
  const [visibleStage, setVisibleStage] = useState(0);

  // Merge animation states
  const [isMerging, setIsMerging] = useState(false);
  const [showUnifiedModal, setShowUnifiedModal] = useState(false);

  // Sequence the reveal animation once started
  useEffect(() => {
    if (started) {
      // Initial small delay to let the landing page fade out
      const startDelay = setTimeout(() => {
        setVisibleStage(1); // Reveal Q1
        
        const interval = setInterval(() => {
          setVisibleStage((prev) => {
            if (prev < 4) return prev + 1;
            clearInterval(interval);
            return prev;
          });
        }, 1200); // 1.2s per quarter for a cinematic pace

        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(startDelay);
    }
  }, [started]);

  // Select the appropriate roadmap data based on product
  let activeRoadmapData = selectedProduct === 'friday' ? ROADMAP_DATA : JARVIS_ROADMAP_DATA;

  // Filter by category for Jarvis
  if (selectedProduct === 'jarvis') {
    activeRoadmapData = activeRoadmapData.filter(agent => agent.category === selectedJarvisCategory);
  }

  // Filter items by horizon
  const q1Items = activeRoadmapData.filter(i => i.horizon === Horizon.Q1);
  const q2Items = activeRoadmapData.filter(i => i.horizon === Horizon.Q2);
  const q3Items = activeRoadmapData.filter(i => i.horizon === Horizon.Q3);
  const q4Items = activeRoadmapData.filter(i => i.horizon === Horizon.Q4);

  // Handle merge animation
  const handleMerge = () => {
    // Jarvis: Redirect to Figma prototype
    if (selectedProduct === 'jarvis') {
      window.location.href = 'https://www.figma.com/proto/eGQOJiZAaRMHsGxiTeNyDt/%F0%9F%94%B7%F0%9F%94%B6-Unified-Sidekick-Central--IN-PROG--HAND-OFF---Copy-?page-id=13%3A927&node-id=4906-52842&viewport=84%2C-173%2C0.13&t=xzZ9Wycr98Zfzbhk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4906%3A52842&hide-ui=1';
      return;
    }

    // Friday: Existing merge animation
    setIsMerging(true);
    // After animation completes, show modal
    setTimeout(() => {
      setShowUnifiedModal(true);
    }, 1500);
  };

  // Handle back from modal
  const handleBackToRoadmap = () => {
    setShowUnifiedModal(false);
    setIsMerging(false);
  };

  if (!started) {
    return <LandingPage onEnter={(product) => {
      setSelectedProduct(product);
      setStarted(true);
    }} />;
  }

  return (
    <div className="h-screen bg-gray-50 font-sans text-slate-900 flex flex-col overflow-hidden animate-fade-in">
      
      {/* Top Navigation */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 flex-shrink-0 z-40">
         <div>
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setStarted(false)}
                className="text-lg font-bold text-slate-900 hover:text-sprout-600 transition-colors"
              >
                Sidekick Tribe
              </button>
              <span className="text-slate-400">›</span>

              {/* Product Switcher */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProduct('friday')}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-all ${
                    selectedProduct === 'friday'
                      ? 'bg-sprout-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  FRIDAY
                </button>
                <button
                  onClick={() => setSelectedProduct('jarvis')}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-all ${
                    selectedProduct === 'jarvis'
                      ? 'bg-sprout-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  JARVIS
                </button>
              </div>
            </div>

            {/* Subtitle */}
            <div className="text-sm text-slate-500">
              <span>Foundation of Sprout's next-generation workflow automation</span>
            </div>
         </div>
         
         <div className="ml-auto">
           <div className="flex items-center gap-2">
             <div className={`h-2 w-2 rounded-full transition-all duration-500 ${visibleStage >= 1 ? 'bg-sprout-500' : 'bg-slate-200'}`}></div>
             <div className={`h-2 w-2 rounded-full transition-all duration-500 ${visibleStage >= 2 ? 'bg-sprout-500' : 'bg-slate-200'}`}></div>
             <div className={`h-2 w-2 rounded-full transition-all duration-500 ${visibleStage >= 3 ? 'bg-sprout-500' : 'bg-slate-200'}`}></div>
             <div className={`h-2 w-2 rounded-full transition-all duration-500 ${visibleStage >= 4 ? 'bg-sprout-500' : 'bg-slate-200'}`}></div>
           </div>
         </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-8 bg-gray-50">
         
         {/* Dashboard-style Roadmap Container */}
         <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col">
            
            {/* Main Visualization Card */}
            <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">

              {/* Chart Header */}
              <div className={`relative z-10 ${selectedProduct === 'jarvis' ? 'bg-white pb-10' : 'mb-8'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedProduct === 'friday' ? 'Payroll Agent Roadmap 2026' : 'Jarvis Roadmap 2026'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {selectedProduct === 'friday'
                        ? 'A focused rollout plan for automating core payroll operations'
                        : 'Intelligent HR agents designed to streamline people operations and employee experiences'}
                    </p>
                  </div>

                  {/* Try it Now Button */}
                  {visibleStage === 4 && !isMerging && !showUnifiedModal && (
                    <button
                      onClick={handleMerge}
                      className="relative bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-sprout-400 text-slate-700 hover:text-sprout-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-pulse-border"
                    >
                      <span className="font-medium text-sm">Try it Now</span>
                    </button>
                  )}
                </div>

                {/* Jarvis Category Chips */}
                {selectedProduct === 'jarvis' && (
                  <div className="flex items-center gap-2 mt-4">
                    {(['Employee', 'People Leader', 'HR Manager', 'Sprout Internal'] as JarvisCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedJarvisCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedJarvisCategory === category
                            ? 'bg-sprout-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid Background */}
              <div className={`absolute inset-0 ${selectedProduct === 'jarvis' ? 'top-50' : 'top-24'} border-t border-slate-100 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]`}></div>

              {/* The Curve SVG - Revealed via Clip Path */}
              <div
                className={`absolute inset-0 top-32 bottom-12 w-full pointer-events-none ${
                  isMerging ? 'transition-opacity duration-[1500ms] opacity-0' : 'transition-all duration-[1200ms] ease-in-out'
                }`}
                style={{
                  clipPath: isMerging ? 'inset(0)' : `inset(0 ${100 - (visibleStage * 25)}% 0 0)`
                }}
              >
                 <svg className="w-full h-full" preserveAspectRatio="none">
                   <defs>
                     <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                       <stop offset="50%" stopColor="#16a34a" stopOpacity="0.5" />
                       <stop offset="100%" stopColor="#15803d" stopOpacity="0.8" />
                     </linearGradient>

                     {/* Subtle pulsing gradient */}
                     <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2">
                         <animate attributeName="stop-opacity" values="0.2;0.35;0.2" dur="4s" repeatCount="indefinite" />
                       </stop>
                       <stop offset="50%" stopColor="#16a34a" stopOpacity="0.5">
                         <animate attributeName="stop-opacity" values="0.5;0.65;0.5" dur="4s" repeatCount="indefinite" begin="0.5s" />
                       </stop>
                       <stop offset="100%" stopColor="#15803d" stopOpacity="0.8">
                         <animate attributeName="stop-opacity" values="0.8;0.95;0.8" dur="4s" repeatCount="indefinite" begin="1s" />
                       </stop>
                     </linearGradient>
                   </defs>

                   {/* Base path with subtle pulsing gradient */}
                   <path
                     d="M 0 550 C 300 550, 500 350, 800 300 S 1200 100, 1600 50"
                     fill="none"
                     stroke="url(#pulseGradient)"
                     strokeWidth="6"
                     strokeLinecap="round"
                     className="drop-shadow-xl"
                   />

                   {/* Animated dashed line flowing along the path */}
                   <path
                     d="M 0 550 C 300 550, 500 350, 800 300 S 1200 100, 1600 50"
                     fill="none"
                     stroke="#22c55e"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeDasharray="8 12"
                     className="opacity-60"
                   >
                     <animate
                       attributeName="stroke-dashoffset"
                       from="20"
                       to="0"
                       dur="2s"
                       repeatCount="indefinite"
                     />
                   </path>
                 </svg>
              </div>

              {/* Interactive Nodes Layer */}
              <div className="absolute inset-0 top-32 z-20">

                {/* Q1 Group */}
                <div className={`absolute left-[1%] ${selectedProduct === 'jarvis' ? 'bottom-[18%]' : 'bottom-[28%]'} w-[23%] flex flex-col gap-4 ${
                  isMerging
                    ? 'transition-all duration-[1500ms] ease-in-out'
                    : `transition-all duration-700 ${visibleStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
                }`} style={isMerging ? {
                  transform: 'translate(37.5%, -6%) scale(0.1)',
                  opacity: 0.3,
                  transformOrigin: 'center'
                } : {}}>
                  {q1Items.map((item) => (
                    <AgentCard
                      key={item.id}
                      item={item}
                      onClick={() => selectedProduct === 'friday' ? setSelectedAgent(item) : undefined}
                    />
                  ))}
                </div>

                {/* Q2 Group */}
                <div className={`absolute left-[26%] ${selectedProduct === 'jarvis' ? 'bottom-[36%]' : 'bottom-[46%]'} w-[23%] flex flex-col gap-4 ${
                  isMerging
                    ? 'transition-all duration-[1500ms] ease-in-out'
                    : `transition-all duration-700 ${visibleStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
                }`} style={isMerging ? {
                  transform: 'translate(12.5%, -20%) scale(0.1)',
                  opacity: 0.3,
                  transformOrigin: 'center'
                } : {}}>
                  {q2Items.map((item) => (
                    <AgentCard
                      key={item.id}
                      item={item}
                      onClick={() => selectedProduct === 'friday' ? setSelectedAgent(item) : undefined}
                    />
                  ))}
                </div>

                {/* Q3 Group */}
                <div className={`absolute left-[51%] top-[32%] w-[23%] flex flex-col gap-4 ${
                  isMerging
                    ? 'transition-all duration-[1500ms] ease-in-out'
                    : `transition-all duration-700 ${visibleStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
                }`} style={isMerging ? {
                  transform: 'translate(-12.5%, 22%) scale(0.1)',
                  opacity: 0.3,
                  transformOrigin: 'center'
                } : {}}>
                  {q3Items.map((item) => (
                    <AgentCard
                      key={item.id}
                      item={item}
                      onClick={() => selectedProduct === 'friday' ? setSelectedAgent(item) : undefined}
                    />
                  ))}
                </div>

                {/* Q4 Group */}
                <div className={`absolute left-[75%] top-[8%] w-[23%] flex flex-col gap-4 ${
                  isMerging
                    ? 'transition-all duration-[1500ms] ease-in-out'
                    : `transition-all duration-700 ${visibleStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
                }`} style={isMerging ? {
                  transform: 'translate(-37.5%, 42%) scale(0.1)',
                  opacity: 0.3,
                  transformOrigin: 'center'
                } : {}}>
                  {q4Items.map((item) => (
                    <AgentCard
                      key={item.id}
                      item={item}
                      onClick={() => selectedProduct === 'friday' ? setSelectedAgent(item) : undefined}
                    />
                  ))}
                </div>

              </div>

              {/* Bottom X-Axis Quarter Labels */}
              <div className={`absolute bottom-4 left-0 right-0 grid grid-cols-4 gap-4 px-4 z-30 ${
                isMerging ? 'transition-opacity duration-[1500ms] opacity-0' : ''
              }`}>
                 <div className={`text-center transition-opacity duration-700 ${visibleStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-sm font-bold text-sprout-700 uppercase tracking-wide">Q1</div>
                 </div>
                 <div className={`text-center transition-opacity duration-700 delay-100 ${visibleStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-sm font-bold text-sprout-700 uppercase tracking-wide">Q2</div>
                 </div>
                 <div className={`text-center transition-opacity duration-700 delay-100 ${visibleStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-sm font-bold text-sprout-700 uppercase tracking-wide">Q3</div>
                 </div>
                 <div className={`text-center transition-opacity duration-700 delay-100 ${visibleStage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-sm font-bold text-sprout-700 uppercase tracking-wide">Q4</div>
                 </div>
              </div>

            </div>
         </div>
      </main>

      {selectedAgent && !showUnifiedModal && (
        <AgentDetail agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

      {/* Unified Agent Chat Modal */}
      {showUnifiedModal && (
        <UnifiedAgentChatModal onBack={handleBackToRoadmap} />
      )}
    </div>
  );
};

const AgentCard: React.FC<{ item: AgentItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative bg-white border border-slate-200 p-3 rounded-lg text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-sprout-300 w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-sprout-500 transition-colors"></div>

      <div className="flex items-start gap-3 pl-1.5">
        <div className="w-10 h-10 rounded-lg bg-sprout-50 border border-sprout-100 flex items-center justify-center text-xl shrink-0 group-hover:bg-sprout-100 transition-colors">
          {item.icon.startsWith('<svg') ? (
            <div dangerouslySetInnerHTML={{ __html: item.icon }} />
          ) : (
            item.icon
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-sprout-700 transition-colors truncate">{item.title}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">{item.shortDescription}</p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-md px-1.5 py-0.5">
              <svg className="w-2.5 h-2.5 text-sprout-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <span className="text-[9px] font-semibold text-slate-700">{item.goals[0].value.replace(/^[↑↓]\s*/, '')}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default App;