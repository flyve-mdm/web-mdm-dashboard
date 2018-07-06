/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

import days from '../days'
import months from '../months'
import years from '../years'

describe('DatePicker', () => {
  it('should get the days of February', () => {
    expect(JSON.parse(JSON.stringify(days(2018, 'February')))).toEqual([{
      _owner: null, _store: {}, key: 'day1', props: { children: 1, value: 1 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day2', props: { children: 2, value: 2 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day3', props: { children: 3, value: 3 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day4', props: { children: 4, value: 4 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day5', props: { children: 5, value: 5 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day6', props: { children: 6, value: 6 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day7', props: { children: 7, value: 7 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day8', props: { children: 8, value: 8 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day9', props: { children: 9, value: 9 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day10', props: { children: 10, value: 10 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day11', props: { children: 11, value: 11 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day12', props: { children: 12, value: 12 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day13', props: { children: 13, value: 13 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day14', props: { children: 14, value: 14 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day15', props: { children: 15, value: 15 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day16', props: { children: 16, value: 16 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day17', props: { children: 17, value: 17 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day18', props: { children: 18, value: 18 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day19', props: { children: 19, value: 19 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day20', props: { children: 20, value: 20 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day21', props: { children: 21, value: 21 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day22', props: { children: 22, value: 22 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day23', props: { children: 23, value: 23 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day24', props: { children: 24, value: 24 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day25', props: { children: 25, value: 25 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day26', props: { children: 26, value: 26 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day27', props: { children: 27, value: 27 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day28', props: { children: 28, value: 28 }, ref: null, type: 'option',
    }])
  })
  it('should get the days of February in a leap year', () => {
    expect(JSON.parse(JSON.stringify(days(2016, 'February')))).toEqual([{
      _owner: null, _store: {}, key: 'day1', props: { children: 1, value: 1 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day2', props: { children: 2, value: 2 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day3', props: { children: 3, value: 3 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day4', props: { children: 4, value: 4 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day5', props: { children: 5, value: 5 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day6', props: { children: 6, value: 6 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day7', props: { children: 7, value: 7 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day8', props: { children: 8, value: 8 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day9', props: { children: 9, value: 9 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day10', props: { children: 10, value: 10 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day11', props: { children: 11, value: 11 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day12', props: { children: 12, value: 12 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day13', props: { children: 13, value: 13 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day14', props: { children: 14, value: 14 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day15', props: { children: 15, value: 15 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day16', props: { children: 16, value: 16 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day17', props: { children: 17, value: 17 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day18', props: { children: 18, value: 18 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day19', props: { children: 19, value: 19 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day20', props: { children: 20, value: 20 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day21', props: { children: 21, value: 21 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day22', props: { children: 22, value: 22 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day23', props: { children: 23, value: 23 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day24', props: { children: 24, value: 24 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day25', props: { children: 25, value: 25 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day26', props: { children: 26, value: 26 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day27', props: { children: 27, value: 27 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day28', props: { children: 28, value: 28 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'day29', props: { children: 29, value: 29 }, ref: null, type: 'option',
    }])
  })
  it('should get the months of a year', () => {
    expect(JSON.parse(JSON.stringify(months()))).toEqual([{
      _owner: null, _store: {}, key: 'monthJanuary', props: { children: 'January', value: 'January' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthFebruary', props: { children: 'February', value: 'February' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthMarch', props: { children: 'March', value: 'March' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthApril', props: { children: 'April', value: 'April' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthMay', props: { children: 'May', value: 'May' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthJune', props: { children: 'June', value: 'June' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthJuly', props: { children: 'July', value: 'July' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthAugust', props: { children: 'August', value: 'August' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthSeptember', props: { children: 'September', value: 'September' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthOctober', props: { children: 'October', value: 'October' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthNovember', props: { children: 'November', value: 'November' }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'monthDecember', props: { children: 'December', value: 'December' }, ref: null, type: 'option',
    }])
  })
  it('should get the years from 1980 to 2100', () => {
    expect(JSON.parse(JSON.stringify(years()))).toEqual([{
      _owner: null, _store: {}, key: 'year1980', props: { children: 1980, value: 1980 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1981', props: { children: 1981, value: 1981 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1982', props: { children: 1982, value: 1982 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1983', props: { children: 1983, value: 1983 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1984', props: { children: 1984, value: 1984 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1985', props: { children: 1985, value: 1985 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1986', props: { children: 1986, value: 1986 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1987', props: { children: 1987, value: 1987 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1988', props: { children: 1988, value: 1988 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1989', props: { children: 1989, value: 1989 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1990', props: { children: 1990, value: 1990 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1991', props: { children: 1991, value: 1991 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1992', props: { children: 1992, value: 1992 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1993', props: { children: 1993, value: 1993 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1994', props: { children: 1994, value: 1994 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1995', props: { children: 1995, value: 1995 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1996', props: { children: 1996, value: 1996 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1997', props: { children: 1997, value: 1997 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1998', props: { children: 1998, value: 1998 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year1999', props: { children: 1999, value: 1999 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2000', props: { children: 2000, value: 2000 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2001', props: { children: 2001, value: 2001 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2002', props: { children: 2002, value: 2002 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2003', props: { children: 2003, value: 2003 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2004', props: { children: 2004, value: 2004 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2005', props: { children: 2005, value: 2005 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2006', props: { children: 2006, value: 2006 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2007', props: { children: 2007, value: 2007 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2008', props: { children: 2008, value: 2008 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2009', props: { children: 2009, value: 2009 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2010', props: { children: 2010, value: 2010 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2011', props: { children: 2011, value: 2011 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2012', props: { children: 2012, value: 2012 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2013', props: { children: 2013, value: 2013 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2014', props: { children: 2014, value: 2014 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2015', props: { children: 2015, value: 2015 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2016', props: { children: 2016, value: 2016 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2017', props: { children: 2017, value: 2017 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2018', props: { children: 2018, value: 2018 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2019', props: { children: 2019, value: 2019 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2020', props: { children: 2020, value: 2020 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2021', props: { children: 2021, value: 2021 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2022', props: { children: 2022, value: 2022 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2023', props: { children: 2023, value: 2023 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2024', props: { children: 2024, value: 2024 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2025', props: { children: 2025, value: 2025 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2026', props: { children: 2026, value: 2026 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2027', props: { children: 2027, value: 2027 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2028', props: { children: 2028, value: 2028 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2029', props: { children: 2029, value: 2029 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2030', props: { children: 2030, value: 2030 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2031', props: { children: 2031, value: 2031 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2032', props: { children: 2032, value: 2032 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2033', props: { children: 2033, value: 2033 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2034', props: { children: 2034, value: 2034 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2035', props: { children: 2035, value: 2035 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2036', props: { children: 2036, value: 2036 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2037', props: { children: 2037, value: 2037 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2038', props: { children: 2038, value: 2038 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2039', props: { children: 2039, value: 2039 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2040', props: { children: 2040, value: 2040 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2041', props: { children: 2041, value: 2041 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2042', props: { children: 2042, value: 2042 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2043', props: { children: 2043, value: 2043 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2044', props: { children: 2044, value: 2044 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2045', props: { children: 2045, value: 2045 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2046', props: { children: 2046, value: 2046 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2047', props: { children: 2047, value: 2047 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2048', props: { children: 2048, value: 2048 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2049', props: { children: 2049, value: 2049 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2050', props: { children: 2050, value: 2050 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2051', props: { children: 2051, value: 2051 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2052', props: { children: 2052, value: 2052 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2053', props: { children: 2053, value: 2053 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2054', props: { children: 2054, value: 2054 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2055', props: { children: 2055, value: 2055 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2056', props: { children: 2056, value: 2056 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2057', props: { children: 2057, value: 2057 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2058', props: { children: 2058, value: 2058 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2059', props: { children: 2059, value: 2059 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2060', props: { children: 2060, value: 2060 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2061', props: { children: 2061, value: 2061 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2062', props: { children: 2062, value: 2062 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2063', props: { children: 2063, value: 2063 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2064', props: { children: 2064, value: 2064 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2065', props: { children: 2065, value: 2065 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2066', props: { children: 2066, value: 2066 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2067', props: { children: 2067, value: 2067 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2068', props: { children: 2068, value: 2068 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2069', props: { children: 2069, value: 2069 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2070', props: { children: 2070, value: 2070 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2071', props: { children: 2071, value: 2071 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2072', props: { children: 2072, value: 2072 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2073', props: { children: 2073, value: 2073 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2074', props: { children: 2074, value: 2074 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2075', props: { children: 2075, value: 2075 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2076', props: { children: 2076, value: 2076 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2077', props: { children: 2077, value: 2077 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2078', props: { children: 2078, value: 2078 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2079', props: { children: 2079, value: 2079 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2080', props: { children: 2080, value: 2080 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2081', props: { children: 2081, value: 2081 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2082', props: { children: 2082, value: 2082 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2083', props: { children: 2083, value: 2083 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2084', props: { children: 2084, value: 2084 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2085', props: { children: 2085, value: 2085 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2086', props: { children: 2086, value: 2086 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2087', props: { children: 2087, value: 2087 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2088', props: { children: 2088, value: 2088 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2089', props: { children: 2089, value: 2089 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2090', props: { children: 2090, value: 2090 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2091', props: { children: 2091, value: 2091 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2092', props: { children: 2092, value: 2092 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2093', props: { children: 2093, value: 2093 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2094', props: { children: 2094, value: 2094 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2095', props: { children: 2095, value: 2095 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2096', props: { children: 2096, value: 2096 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2097', props: { children: 2097, value: 2097 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2098', props: { children: 2098, value: 2098 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2099', props: { children: 2099, value: 2099 }, ref: null, type: 'option',
    }, {
      _owner: null, _store: {}, key: 'year2100', props: { children: 2100, value: 2100 }, ref: null, type: 'option',
    }])
  })
})
