import { PrimitiveProperty } from "../interfaces/property"
import moment from 'moment'

export const calculateTotalCost = (startDate: string, endDate: string, property: PrimitiveProperty) => {
  const startDateObj = moment(startDate)
  const endDateObj = moment(endDate)

  const qtyDates = endDateObj.diff(startDateObj, 'days')
  const costPerNight = property.pricePerNight;

  return qtyDates * costPerNight
}