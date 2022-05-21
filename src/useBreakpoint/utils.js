export const breakpoints = {
  desktopLg: 1400,
  desktopMd: 1300,
  desktopSm: 1200,
  tabletLg: 1040,
  tabletMd: 991,
  tabletSm: 840,
  mobileLg: 767,
  mobileMd: 540,
  mobileSm: 400,
  mobileXsm: 350
};

/**
 * Returns a string of classes that match / are adjacent to the current breakpoint
 * @param {classObj} classObj           Obj containing key / value pairs for desired breakpoints
 * @param {Object} breakpoint           Obj describing current breakpoint state
 * @param {string} breakpoint.name      String defining current breakpoint name
 * @param {number} breakpoint.size      Number defining current breakpoint size
 * @return {string}                     Returns class string that matches correct breakpoint
 */
 export function setClassName(classObj, breakpoint) {
  if (typeof breakpoint !== 'object') {
    throw new Error(`Bad breakpoint type given: ${breakpoint} (${typeof breakpoint})`);
  }

  const def = classObj.default || '';

  if (breakpoint.name === 'default') return def;

  const sizeArray = Object.keys(breakpoints).reverse();
  const startingIndex = sizeArray.indexOf(breakpoint.name);
  const firstMatchedKey = sizeArray
    .slice(startingIndex)
    .find(key => classObj[key]) || 'default';

  return firstMatchedKey === 'default'
    ? def
    : classObj[firstMatchedKey];
}

function breakpointFromString(string, bps) {
  const breakpoint = bps[string];

  if (!breakpoint) {
    throw new Error(`Bad breakpoint variable given: ${string}`);
  }

  return breakpoint;
}

/**
 * Returns a boolean indicating whether or not the currentBreakpoint.size value
 * is greater than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {Object} currentBreakpoint             Object describing current breakpoint
 * @param {number} currentBreakpoint.size        Number indicating the current breakpoint value
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               greater than the currentBreakpoint
 */
export const bpIsGreaterThan = (breakpointToCompare, currentBreakpoint) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare, breakpoints)
    : breakpointToCompare;

  if (currentBreakpoint.size === null || currentBreakpoint.size > comparison) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns a boolean indicating whether or not the currentBreakpoint.size value
 * is less than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {Object} currentBreakpoint             Object describing current breakpoint
 * @param {number} currentBreakpoint.size        Number indicating the current breakpoint value
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               less than the currentBreakpoint
 */
export const bpIsLessThan = (breakpointToCompare, currentBreakpoint) => {
  const comparison = typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare, breakpoints)
    : breakpointToCompare;

  if (currentBreakpoint.size !== null
      && currentBreakpoint.size <= comparison) {
    return true;
  } else {
    return false;
  }
};
