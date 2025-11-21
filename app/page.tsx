'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '@/lib/api';
import { useWebSocketMock } from '@/hooks/useWebSocketMock';
import { TokenCardGrid, ErrorBoundary } from '@/components/organisms';
import type { TokenPair } from '@/types';

export default function Home() {
  const [displayOpen, setDisplayOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'mc' | 'volume' | 'price' | 'age'>('mc');
  const [mobileTab, setMobileTab] = React.useState<'new' | 'final-stretch' | 'migrated'>('new');

  // Fetch initial token data
  const { data: tokens = [], isLoading, error } = useQuery<TokenPair[]>({
    queryKey: ['tokens'],
    queryFn: () => fetchTokens(),
  });

  // Disable WebSocket initially for better performance
  const [wsEnabled, setWsEnabled] = React.useState(false);
  
  // Enable WebSocket after initial render
  React.useEffect(() => {
    const timer = setTimeout(() => setWsEnabled(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useWebSocketMock(wsEnabled);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setDisplayOpen(false);
    if (displayOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [displayOpen]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Error loading tokens</h2>
          <p className="text-gray-400">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="h-screen overflow-hidden bg-black text-gray-100 flex flex-col">
        {/* Top Header */}
        <header className="border-b border-gray-800/50 bg-black z-20 shrink-0">
          <div className="px-3 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center justify-between">
              {/* Left - Logo and Nav */}
              <div className="flex items-center gap-6">
                <img 
                  src="/logo.png" 
                  alt="AXIOM Pro" 
                  className="h-11 w-auto"
                />
                <nav className="hidden xl:flex items-center gap-8 text-sm">
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Discover</a>
                  <a href="#" className="text-blue-500 font-semibold text-[13px]">Pulse</a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Trackers</a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Perpetuals</a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Yield</a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Vision</a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors font-semibold text-[13px]">Portfolio</a>
                </nav>
              </div>

              {/* Right - Search, Chain Selector, Deposit, Icons */}
              <div className="flex items-center gap-2 sm:gap-3">
                  {/* Search Bar - hide on small/medium */}
                  <div className="relative hidden xl:block">
                    <svg className="w-5 h-5 text-white absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by token or CA..."
                      className="w-64 pl-10 pr-4 py-2 text-[12px] bg-[#0a0a0a] border border-gray-700/50 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                    />
                  </div>
                
                {/* Search Icon for mobile/tablet - hide on small screens */}
                <button className="hidden sm:flex xl:hidden w-9 h-9 items-center justify-center text-white hover:text-blue-400 transition-colors rounded-full border border-gray-700/50 bg-[#0a0a0a]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Chain Selector - hide on small screens */}
                <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#0a0a0a] hover:bg-gray-800/70 border border-gray-700/50 rounded-full text-sm transition-colors">
                  <div className="flex items-center gap-2 px-1">
                    <svg className="w-3 h-3" viewBox="0 0 397.7 311.7">
                      <defs>
                        <linearGradient id="solGradient" x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00ffa3" />
                          <stop offset="1" stopColor="#dc1fff" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#solGradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">SOL</span>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Deposit Button - hide on small screens */}
                <button className="hidden sm:flex px-3 py-1 bg-blue-500 hover:bg-blue-700 text-black text-sm font-bold rounded-full transition-colors">
                  Deposit
                </button>

                {/* Icon Buttons - hide on small screens */}
                <button className="hidden sm:flex w-9 h-9 items-center justify-center text-white hover:text-blue-400 transition-colors rounded-full border border-gray-700/50 bg-[#0a0a0a]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button className="hidden sm:flex w-9 h-9 items-center justify-center text-white hover:text-blue-400 transition-colors rounded-full border border-gray-700/50 bg-[#0a0a0a]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {/* Joined Wallet/Coin Buttons Group - hide on very small screens */}
                <div className="hidden sm:flex items-center">
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0a] hover:bg-gray-800/70 border border-gray-700/50 rounded-l-full text-sm transition-colors">
                    <div className="flex items-center gap-2 px-1">
                    <svg className="w-3 h-3" viewBox="0 0 397.7 311.7">
                      <defs>
                        <linearGradient id="solGradient" x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00ffa3" />
                          <stop offset="1" stopColor="#dc1fff" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#solGradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" />
                    </svg>
                  </div>
                    <span className="text-white font-semibold">0</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0a] hover:bg-gray-800/70 border-y border-r border-gray-700/50 rounded-r-full text-sm transition-colors border-l-0">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      0
                    </div>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {/* Profile Button */}
                <button className="w-9 h-9 flex items-center justify-center text-white hover:text-blue-400 transition-colors rounded-full border border-gray-700/50 bg-[#0a0a0a]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {/* Main Content Area - Flex Container */}
        <div className="flex-1 overflow-hidden flex flex-col mx-1.5">
          <div className="max-w-[1600px] mx-auto w-full px-4 flex flex-col h-full">
            {/* Spacing section with 3 control buttons - hide on mobile/tablet */}
            <div className="hidden lg:flex items-center justify-start gap-2  shrink-0">
              <button className="w-7 h-7 rounded bg-[#0a0a0a] hover:bg-gray-800/70 border border-gray-700/50 flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="w-7 h-7 rounded bg-[#0a0a0a] hover:bg-gray-800/70 border border-gray-700/50 flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="w-7 h-7 rounded bg-[#0a0a0a] hover:bg-gray-800/70 border border-gray-700/50 flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Pulse Header Row */}
            <div className="flex items-center justify-between py-4.5 shrink-0 border-b border-gray-800/30">
              {/* Left Section - Pulse title with action buttons */}
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-[20px] font-semibold ml-1 text-white">Pulse</h2>
                
                {/* Menu/Hamburger Button */}
                <button 
                  className="w-7 h-7 rounded bg-black hover:bg-gray-900 border border-black flex items-center justify-center transition-colors"
                  aria-label="Menu"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Cube/Package Button */}
                <button 
                  className="w-7 h-7 rounded bg-black hover:bg-gray-900 border border-black flex items-center justify-center transition-colors"
                  aria-label="Packages"
                >
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </button>
              </div>

              {/* Right - Display Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="hidden md:flex w-8 h-8 rounded bg-black hover:bg-gray-900 border border-black items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setDisplayOpen(!displayOpen)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#222222] border border-gray-700/50 rounded-full text-sm transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span className="text-white font-medium">Display</span>
                    <svg className={`w-3.5 h-3.5 text-white transition-transform ${displayOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {displayOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-[#1a1a1a] border border-gray-700/50 rounded-lg shadow-xl z-50 min-w-[200px] py-2">
                      <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase">Sort By</div>
                      <button
                        onClick={() => { setSortBy('mc'); setDisplayOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                          sortBy === 'mc' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <span>Market Cap</span>
                        {sortBy === 'mc' && <span className="text-blue-400">✓</span>}
                      </button>
                      <button
                        onClick={() => { setSortBy('volume'); setDisplayOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                          sortBy === 'volume' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <span>24h Volume</span>
                        {sortBy === 'volume' && <span className="text-blue-400">✓</span>}
                      </button>
                      <button
                        onClick={() => { setSortBy('price'); setDisplayOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                          sortBy === 'price' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <span>Price</span>
                        {sortBy === 'price' && <span className="text-blue-400">✓</span>}
                      </button>
                      <button
                        onClick={() => { setSortBy('age'); setDisplayOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                          sortBy === 'age' ? 'bg-blue-600/20 text-blue-400' : 'text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <span>Token Age</span>
                        {sortBy === 'age' && <span className="text-blue-400">✓</span>}
                      </button>
                    </div>
                  )}
                </div>
                <button className="hidden lg:flex w-8 h-8 rounded bg-black hover:bg-gray-900 border border-black items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="hidden md:flex w-8 h-8 rounded bg-black hover:bg-gray-900 border border-black items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <button className="hidden xl:flex w-8 h-8 rounded bg-black hover:bg-gray-900 border border-black items-center justify-center transition-colors">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-black hover:bg-gray-900 border border-black rounded text-sm transition-colors relative">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-medium">1</span>
                </button>
                <button className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-black hover:bg-gray-900 border border-black rounded text-sm transition-colors">
                <div className="flex items-center gap-2 px-1">
                    <svg className="w-3 h-3" viewBox="0 0 397.7 311.7">
                      <defs>
                        <linearGradient id="solGradient" x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00ffa3" />
                          <stop offset="1" stopColor="#dc1fff" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#solGradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">0</span>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Tab Navigation (below 1024px) */}
            <div className="lg:hidden flex gap-2 mb-3 shrink-0">
              <button 
                onClick={() => setMobileTab('new')}
                className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                  mobileTab === 'new' 
                    ? 'bg-[#1a1a1a] text-white border border-gray-700' 
                    : 'bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-[#151515]'
                }`}
              >
                New Pairs
              </button>
              <button 
                onClick={() => setMobileTab('final-stretch')}
                className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                  mobileTab === 'final-stretch' 
                    ? 'bg-[#1a1a1a] text-white border border-gray-700' 
                    : 'bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-[#151515]'
                }`}
              >
                Final Stretch
              </button>
              <button 
                onClick={() => setMobileTab('migrated')}
                className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                  mobileTab === 'migrated' 
                    ? 'bg-[#1a1a1a] text-white border border-gray-700' 
                    : 'bg-[#0a0a0a] text-gray-400 hover:text-white hover:bg-[#151515]'
                }`}
              >
                Migrated
              </button>
            </div>

            {/* Token Card Grid - Three Columns */}
            <TokenCardGrid tokens={tokens} isLoading={isLoading} globalSortBy={sortBy} mobileTab={mobileTab} />
          </div>
        </div>

        {/* Footer Stats Bar */}
        <footer className="border-t border-gray-800/50 bg-black shrink-0 hidden md:block">
          <div className="px-6 py-2.5">
            <div className="flex items-center justify-between text-xs">
              {/* Left side */}
              <div className="flex items-center gap-8">
                <button className="flex items-center gap-1.5 bg-blue-900 opacity-80 text-blue-400 font-semibold hover:text-blue-400 transition-colors px-2 py-1 rounded-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[12px]">PRESET 1</span>
                </button>
                <div className="flex items-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-white">1</span>
                  <div className="flex items-center gap-2 px-1">
                    <svg className="w-3 h-3" viewBox="0 0 397.7 311.7">
                      <defs>
                        <linearGradient id="solGradient" x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00ffa3" />
                          <stop offset="1" stopColor="#dc1fff" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#solGradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
                      <path fill="url(#solGradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">0</span>
                </div>
                <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Wallet</span>
                </button>
                <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span>Twitter</span>
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Discover</span>
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Pulse</span>
                </button>
                <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Pnl...</span>
                </button>
                <div className="flex items-center gap-2 ml-1">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-yellow-500 font-medium">$86.6K</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span className="text-blue-300 font-medium">$2828</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-500 font-medium">$131.9</span>
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-8">
                <span className="text-white">$54.2K</span>
                <div className="flex items-center gap-1.5 text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>00:36</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>0.003</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500 font-medium">Connection is stable</span>
                </div>
                <button className="px-2 py-0.5 bg-[#161b22] hover:bg-gray-800/70 border border-gray-700/50 rounded text-white hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>GLOBAL</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-5 h-5 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </ErrorBoundary>
  );
}
