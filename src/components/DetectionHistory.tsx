import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, CheckCircle2, AlertTriangle, Eye, ShieldCheck, ShieldAlert, Download } from 'lucide-react';
import { DetectionRecord } from '../types';

interface DetectionHistoryProps {
  history: DetectionRecord[];
  onToggleStatus: (id: string) => void;
  onViewRecord: (record: DetectionRecord) => void;
}

export const DetectionHistory: React.FC<DetectionHistoryProps> = ({
  history,
  onToggleStatus,
  onViewRecord
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Accident' | 'Normal' | 'Reviewed' | 'Unreviewed'>('All');
  const [sortField, setSortField] = useState<'time' | 'confidence' | 'id'>('time');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      // Search
      const matchesSearch =
        item.videoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter
      if (filterType === 'Accident') return item.prediction === 'ACCIDENT';
      if (filterType === 'Normal') return item.prediction === 'NORMAL';
      if (filterType === 'Reviewed') return item.status === 'Reviewed';
      if (filterType === 'Unreviewed') return item.status === 'Unreviewed';

      return true;
    }).sort((a, b) => {
      if (sortField === 'confidence') {
        return sortAsc ? a.confidence - b.confidence : b.confidence - a.confidence;
      }
      if (sortField === 'id') {
        return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }
      // default: time / order
      return sortAsc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time);
    });
  }, [history, searchQuery, filterType, sortField, sortAsc]);

  const exportHistoryCsv = () => {
    const headers = ['ID', 'Date', 'Time', 'Video Name', 'Prediction', 'Confidence (%)', 'Status', 'Location'];
    const rows = filteredHistory.map((item) => [
      item.id,
      item.date,
      item.time,
      item.videoName,
      item.prediction,
      item.confidence.toFixed(1),
      item.status,
      `"${item.location || 'Surveillance Node'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ai_sentinel_detection_history.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section id="history" className="py-20 bg-neutral-950/80 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Surveillance Audit Trail
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                DEMO AUDIT LOG
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Detection History
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              Chronological log of analyzed surveillance video sequences, predicted incident classifications, model confidence ratings, and review status.
            </p>
          </div>

          <button
            onClick={exportHistoryCsv}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-neutral-800 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by video name, ID, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-neutral-950/80 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {(['All', 'Accident', 'Normal', 'Reviewed', 'Unreviewed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterType === tab
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs font-mono">
            <span className="text-neutral-500">Sort:</span>
            <button
              onClick={() => {
                if (sortField === 'confidence') {
                  setSortAsc(!sortAsc);
                } else {
                  setSortField('confidence');
                  setSortAsc(false);
                }
              }}
              className={`px-2 py-1 rounded border flex items-center gap-1 ${
                sortField === 'confidence'
                  ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
                  : 'border-neutral-800 text-neutral-400'
              }`}
            >
              <span>Confidence</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* History Table */}
        <div className="glass-panel rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Video Source</th>
                  <th className="py-3 px-4">Prediction</th>
                  <th className="py-3 px-4 text-right">Confidence</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-500">
                      No detection records match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => {
                    const isAcc = item.prediction === 'ACCIDENT';
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-cyan-950/20 transition-colors group"
                      >
                        {/* ID */}
                        <td className="py-3.5 px-4 font-bold text-white">
                          {item.id}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-neutral-400">
                          {item.date}
                        </td>

                        {/* Time */}
                        <td className="py-3.5 px-4 text-neutral-300">
                          {item.time}
                        </td>

                        {/* Video */}
                        <td className="py-3.5 px-4 max-w-[220px]">
                          <div className="truncate text-white font-medium" title={item.videoName}>
                            {item.videoName}
                          </div>
                          {item.location && (
                            <div className="text-[10px] text-neutral-500 truncate">
                              {item.location}
                            </div>
                          )}
                        </td>

                        {/* Prediction */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-[11px] ${
                              isAcc
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {isAcc ? (
                              <AlertTriangle className="w-3 h-3 text-rose-400" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            )}
                            {item.prediction}
                          </span>
                        </td>

                        {/* Confidence */}
                        <td className="py-3.5 px-4 text-right font-bold tabular-nums">
                          <span className={isAcc ? 'text-rose-400' : 'text-emerald-400'}>
                            {item.confidence.toFixed(1)}%
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => onToggleStatus(item.id)}
                            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                              item.status === 'Reviewed'
                                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60'
                            }`}
                            title="Click to toggle Reviewed / Unreviewed"
                          >
                            {item.status}
                          </button>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onViewRecord(item)}
                            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-cyan-400 transition-colors"
                            title="Inspect video incident details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="bg-neutral-900/60 px-4 py-3 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              Showing {filteredHistory.length} of {history.length} surveillance log records
            </span>
            <span className="text-amber-300/80">
              * Sample records represent prototype demo data for evaluation
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
