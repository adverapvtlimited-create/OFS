'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Search, Check, AlertCircle } from 'lucide-react';
import { COUNTRIES, getCountryByCode, validatePhoneNumber } from '@/lib/countries';

export default function InternationalPhoneInput({
  value = '',
  onChange,
  name = 'phone',
  id = 'phone',
  required = false,
  disabled = false,
  defaultCountry = 'IN',
  className = '',
  inputClassName = '',
  label,
  error: externalError,
}) {
  const initialCountry = useMemo(() => getCountryByCode(defaultCountry), [defaultCountry]);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [nationalNumber, setNationalNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const listRef = useRef(null);

  // Sync internal state when external value changes
  useEffect(() => {
    if (!value) {
      setNationalNumber('');
      return;
    }

    const trimmed = String(value).trim();
    if (trimmed.startsWith('+')) {
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
      const match = sortedCountries.find((c) => trimmed.startsWith(c.dialCode));
      if (match) {
        setSelectedCountry(match);
        const digits = trimmed.slice(match.dialCode.length).trim();
        setNationalNumber(digits);
        return;
      }
    }
    setNationalNumber(trimmed);
  }, [value]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Separate and filter countries
  const { priorityList, otherList, isSearching } = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return {
        priorityList: COUNTRIES.filter((c) => c.priority),
        otherList: COUNTRIES.filter((c) => !c.priority),
        isSearching: false,
      };
    }
    const filtered = COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
    return {
      priorityList: [],
      otherList: filtered,
      isSearching: true,
    };
  }, [searchQuery]);

  // Validation calculation
  const validationResult = useMemo(() => {
    const fullNumber = `${selectedCountry.dialCode} ${nationalNumber}`.trim();
    if (!nationalNumber) {
      return { isValid: false, error: required ? 'Phone number is required.' : null };
    }
    return validatePhoneNumber(fullNumber, selectedCountry.code);
  }, [nationalNumber, selectedCountry, required]);

  // Notify parent of changes
  const notifyChange = (newCountry, newNational) => {
    const cleanNational = newNational.trim();
    const fullValue = cleanNational ? `${newCountry.dialCode} ${cleanNational}` : '';
    if (onChange) {
      onChange({
        target: {
          name,
          value: fullValue,
        },
        phone: fullValue,
        countryCode: newCountry.code,
        dialCode: newCountry.dialCode,
        nationalNumber: cleanNational,
        isValid: cleanNational ? validatePhoneNumber(fullValue, newCountry.code).isValid : !required,
      });
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    notifyChange(country, nationalNumber);
    numberInputRef.current?.focus();
  };

  const handleNumberChange = (e) => {
    let raw = e.target.value;

    // Handle pasted full international number with '+'
    if (raw.trim().startsWith('+')) {
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
      const match = sortedCountries.find((c) => raw.trim().startsWith(c.dialCode));
      if (match) {
        setSelectedCountry(match);
        const rest = raw.trim().slice(match.dialCode.length).replace(/[^\d\s-]/g, '').trim();
        setNationalNumber(rest);
        notifyChange(match, rest);
        return;
      }
    }

    const cleaned = raw.replace(/[^\d\s\-()]/g, '');
    setNationalNumber(cleaned);
    notifyChange(selectedCountry, cleaned);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const hasError = isTouched && nationalNumber && !validationResult.isValid;
  const isComplete = nationalNumber && validationResult.isValid;

  const renderCountryItem = (country) => {
    const isSelected = country.code === selectedCountry.code;
    return (
      <li
        key={`${country.code}-${country.dialCode}`}
        role="option"
        aria-selected={isSelected}
        onClick={() => handleCountrySelect(country)}
        className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors select-none ${
          isSelected
            ? 'bg-ofs-navy-50 text-ofs-navy-950 font-bold'
            : 'hover:bg-slate-100/90 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <span className="inline-flex items-center justify-center min-w-[28px] h-5 px-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 shrink-0">
            {country.flag || country.code}
          </span>
          <span className="truncate text-xs">{country.name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-500">
          <span>{country.dialCode}</span>
          {isSelected && <Check size={13} className="text-ofs-navy-900 stroke-[3]" />}
        </div>
      </li>
    );
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={id} className="form-label mb-1.5 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-ofs-red-600">*</span>}
          </span>
          {selectedCountry && (
            <span className="text-[0.7rem] text-ofs-gray-400 font-mono font-normal">
              {selectedCountry.name} ({selectedCountry.dialCode})
            </span>
          )}
        </label>
      )}

      {/* Main Unified Input Container */}
      <div
        className={`flex items-stretch w-full rounded-lg border transition-all duration-150 bg-white ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/10'
            : 'border-slate-300 focus-within:border-ofs-navy-900 focus-within:ring-2 focus-within:ring-ofs-navy-900/15'
        }`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border-r border-slate-200 rounded-l-lg text-slate-800 font-mono text-sm transition-colors shrink-0 focus:outline-none focus:bg-slate-100 select-none"
        >
          <span className="inline-flex items-center justify-center min-w-[24px] h-5 px-1 rounded bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 shrink-0 shadow-xs">
            {selectedCountry.flag || selectedCountry.code}
          </span>
          <span className="font-bold text-xs text-slate-900 tracking-tight">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-ofs-navy-900' : ''}`}
          />
        </button>

        {/* National Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            ref={numberInputRef}
            id={id}
            name={name}
            type="tel"
            required={required}
            disabled={disabled}
            value={nationalNumber}
            onChange={handleNumberChange}
            onBlur={handleBlur}
            placeholder={selectedCountry.placeholder || 'Enter phone number'}
            className={`w-full px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent rounded-r-lg outline-none font-medium ${inputClassName}`}
            autoComplete="tel"
          />

          {/* Validation Status Indicator */}
          <div className="pr-3 flex items-center pointer-events-none">
            {isComplete && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600">
                <Check size={13} strokeWidth={3} />
              </span>
            )}
            {hasError && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-red-500">
                <AlertCircle size={15} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inline Feedback / Guidance */}
      {hasError && (
        <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
          <span>{validationResult.error}</span>
        </p>
      )}
      {externalError && !hasError && (
        <p className="mt-1 text-xs text-red-600 font-medium">{externalError}</p>
      )}

      {/* Dropdown Menu (data-lenis-prevent is mandatory to avoid smooth scroll hijacking) */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="absolute top-[calc(100%+4px)] left-0 z-[999] w-full sm:w-[330px] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Sticky Search Header */}
          <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0 z-20">
            <div className="relative flex items-center">
              <Search size={14} className="absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (e.g. UAE, +1, UK)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md outline-none focus:border-ofs-navy-900 focus:ring-1 focus:ring-ofs-navy-900 text-slate-800 placeholder:text-slate-400 font-sans"
              />
            </div>
          </div>

          {/* Fully Scrollable Countries List Container with Lenis Protection */}
          <div
            ref={listRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="max-h-[260px] overflow-y-scroll overscroll-contain focus:outline-none"
            style={{
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: '#94a3b8 #f1f5f9',
            }}
          >
            <ul role="listbox" className="divide-y divide-slate-50 text-xs py-1">
              {!isSearching && priorityList.length > 0 && (
                <>
                  <li className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-50/70 select-none">
                    Frequently Used
                  </li>
                  {priorityList.map(renderCountryItem)}
                  <li className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-50/70 border-t border-slate-200 select-none">
                    All Countries
                  </li>
                </>
              )}

              {otherList.length === 0 && isSearching ? (
                <li className="px-4 py-8 text-center text-slate-400 text-xs italic">
                  No matching countries found for &ldquo;{searchQuery}&rdquo;
                </li>
              ) : (
                otherList.map(renderCountryItem)
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
