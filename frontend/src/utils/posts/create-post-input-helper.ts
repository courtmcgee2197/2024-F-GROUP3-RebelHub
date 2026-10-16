
import type { FieldErrors, FieldValues, FieldError } from "react-hook-form";
// CHANGE: Added FieldError as a type import

// CHANGE: Added this interface to define the return type
interface InputErrorResult {
  error?: FieldError;
}

// Outputs the error, if there is one, that belongs to the input name.
export function findInputError(
  errors: FieldErrors<FieldValues>,
  name: string
): InputErrorResult { // CHANGE: Added the return type
  const filtered = Object.keys(errors)
    .filter((key) => key === name) // CHANGE: Exact match instead of includes()
    .reduce<InputErrorResult>((cur, key) => { // CHANGE: Explicit reduce type
      const error = errors[key];

      // CHANGE: Check that an error exists before assigning it
      if (error && "type" in error) {
        cur.error = error as FieldError;
      }

      return cur;
    }, {});

  return filtered;
}

// Takes the filtered errors object and checks if there are any errors.
export function isFormInvalid(filteredErrors: InputErrorResult) {
  return Object.keys(filteredErrors).length > 0;
  // CHANGE: Replaced {} parameter type with InputErrorResult
}
