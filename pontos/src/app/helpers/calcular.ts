export class Hmh {
    
    minutesToHours(minutes) {
        return minutes / 60;
    }

    restMinutesToHours(minutes) {
        return minutes % 60;
    }

    hoursToMinutes(hours) {
        return hours * 60;
    }

    sumValues(values) {
        if (!values) return 0
        return values.reduce((acc, value) => (acc + value));
    }
  
    toString = (value) => (Array.isArray(value) ? value.join('') : value);
  
    toArray = (value) => (value.replace(/\s+/g, '').split(/(\d+[hm])/).filter((item) => item));

    getArrayValue = (value) => this.toArray(this.toString(value));
    
    reduceAllValuesOnObject(value) {
        return value.reduce((acc, val) => {
            const number = Number(val.replace(/\D/, ''));
            const unit = val[val.length - 1];
            acc[unit] = acc[unit] || [];
            acc[unit].push(number);
            return acc;
        }, {});
    }
    
    getObject = (value) => {
        const arrayValue = this.getArrayValue(value)
        return this.reduceAllValuesOnObject(arrayValue)
    }
    
    maybe = (value) => value || null;
    
    showResult = (allMinutesInHours, restOfMinutes, isNegative) => {
        const showHours = (allMinutesInHours && `${allMinutesInHours}h`) || ''
        const showMinutes = (restOfMinutes && `${restOfMinutes}m`) || ''
        const negativeSymbol = isNegative ? '-' : ''
        let stringResult = `${negativeSymbol}${(showHours || showMinutes)}`
        if (showHours && showMinutes) {
            stringResult = `${negativeSymbol}${showHours} ${showMinutes}`
        }
    
        const hours = this.maybe(allMinutesInHours)
        const minutes = this.maybe(restOfMinutes)
        return {
            toString: () => stringResult,
            h: hours,
            m: minutes,
            isNegative
        }
    }

    getResult = (allMinutes, output) => {
        const isNegative = allMinutes < 0
        const absoluteAllMinutes = Math.abs(allMinutes)
        if (output === 'minutes') {
          return this.showResult(null, absoluteAllMinutes, isNegative)
        }
        let allMinutesInHours = 0
        let restOfMinutes = absoluteAllMinutes
        if (absoluteAllMinutes >= 60) {
        allMinutesInHours = this.minutesToHours(absoluteAllMinutes)
        restOfMinutes = this.restMinutesToHours(absoluteAllMinutes)
        }
        return this.showResult(allMinutesInHours, restOfMinutes, isNegative)
    }
    
    getAllMinutesAdded = (value) => {
        const obj = this.getObject(value)
        const hours = this.sumValues(obj.h)
        const minutes = this.sumValues(obj.m)
        const allMinutes = this.hoursToMinutes(hours) + minutes
        return allMinutes
    }
    
    getAllMinutesSubtracted = (value) => {
        const arrayValue = this.getArrayValue(value)
        const firstValue = arrayValue.slice(0, 1)[0]
        const firstValueInMinutes = firstValue.includes('h')
            ? this.hoursToMinutes(parseInt(firstValue, 10))
            : parseInt(firstValue, 10)
        const obj = this.reduceAllValuesOnObject(arrayValue.slice(1))
        const hours = this.sumValues(obj.h)
        const minutes = this.sumValues(obj.m)
        const allMinutes = firstValueInMinutes - (this.hoursToMinutes(hours) + minutes)
        return allMinutes
    }      

    constructor() {}

    
    sum = (value, output) => {
        const allMinutes = this.getAllMinutesAdded(value);
        return this.getResult(allMinutes, output);
    }

    sub = (value, output) => {
        const allMinutes = this.getAllMinutesSubtracted(value);
        return this.getResult(allMinutes, output);
    }

    diff = (firstHour, secondHour, output) => {
        const firstAllMinutes = this.getAllMinutesAdded(firstHour);
        const secondAllMinutes = this.getAllMinutesAdded(secondHour);
        const allMinutes = secondAllMinutes - firstAllMinutes;
        return this.getResult(allMinutes, output);
    }

    div = (value, divisor, output) => {
        const allMinutes = this.getAllMinutesAdded(value);
        const division = allMinutes / divisor;
        return this.getResult(division, output);
    }
}