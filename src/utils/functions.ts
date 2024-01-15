import { FieldErrors, FieldValues } from 'react-hook-form';
import _ from "lodash"
import { PickupStatus } from '../types';

export const getReadableValidationErrorMessage = <
  T extends FieldValues
>(
  errors: FieldErrors<T>
) => {
  let validationMessage = '';
  for (const [fieldName, value] of Object.entries(errors)) {
    validationMessage += `${_.capitalize(fieldName)}: ${getErrorMessageFromObjectRecursively(
      value
    )}\n`;
  }

  return validationMessage.trim();
};

export const getErrorMessageFromObjectRecursively = (o: any) => {
  if ('message' in o) {
    return o.message;
  } else {
    let message;
    Object.keys(o).forEach((objKey) => {
      if ('message' in o[objKey]) {
        message = o[objKey].message;
      } else {
        message = getErrorMessageFromObjectRecursively(o[objKey]);
      }
    });
    return message;
  }
};


/**
 * 
 * @param status a current pickup status
 * @returns a string explaning the status
 */
export function generatePickupStatusInfo(status: PickupStatus): string {
  const infoMap = {
    "pending": "Your pickup has not been processed yet",
    "assigned": "Your pickup has been processed and assigned to a driver",
    "ongoing": "The driver is on their way to pickup",
    "completed": "The driver has successfully completed your request. You can pay now",
    "cancelled": "Your pickup request was cancelled",
    "paid": "You have completed this pickup",
  }

  return infoMap[status]
}