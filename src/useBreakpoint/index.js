/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext, useContext } from 'react';
import { breakpoints, bpIsLessThan, bpIsGreaterThan, setClassName } from './utils';

function dispatchActiveQuery(mediaQueryState, action, rule) {
  if (rule === 'min-width') mediaQueryState.reverse();

  // Reduce media query to the smallest or largest breakpoint depending on rule
  const activeQuery = mediaQueryState.reduce((prev, curr) => {
    if (curr.matches) {
      return curr;
    } else {
      return (prev && prev.matches) ? prev : null;
    }
  });

  const name = activeQuery ? activeQuery.name : 'default';
  const size = activeQuery && activeQuery.breakpoint;

  // Pushes active query string to store. If no breakpoint is active, pushes 'default'
  action({ name, size });
}

export const useBreakpoint = (rule = 'max-width') => {
  const [breakpoint, setBreakpoint] = useState({ name: 'default', size: null });
  const mediaQueryList = [];

  useEffect(() => {
    Object.keys(breakpoints).forEach((key) => {
      // Create breakpoint object
      const query = window.matchMedia(`(${rule}: ${breakpoints[key]}px)`);
  
      // Add breakpoint value
      query.breakpoint = breakpoints[key];
  
      // Add breakpoint name
      query.name = key;
  
      // Add breakpoint change handler
      function breakpointChange() {
        dispatchActiveQuery(mediaQueryList, setBreakpoint, rule);
      }
  
      query.addEventListener('change', breakpointChange);
  
      // Push breakpoint into array
      mediaQueryList.push(query);
    });

    dispatchActiveQuery(mediaQueryList, setBreakpoint, rule);
  }, []);

  const setClass = obj => setClassName(obj, breakpoint);
  const bpIsGT = comparison => bpIsGreaterThan(comparison, breakpoint);
  const bpIsLT = comparison => bpIsLessThan(comparison, breakpoint);

  return { breakpoint, setClass, bpIsGT, bpIsLT, breakpoints };
};

const BreakpointContext = createContext(null);

export const BreakpointProvider = ({ children }) => {
  const breakpoint = useBreakpoint();
  
  return (
    <BreakpointContext.Provider value={ { ...breakpoint } }>
      { children }
    </BreakpointContext.Provider>
  )
}

export const useBreakpointContext = () => {
  return useContext(BreakpointContext);
}
