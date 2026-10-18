// Small helper shared by the form sections.
// bind("rent") gives a field its current value, its error message and its onChange in one go,
// so a field can be written as <Input label="..." {...bind("rent")} />.
export const makeBind = (form, errors, onField) => (key) => ({
  value: form[key],
  error: errors[key],
  onChange: (e) => onField(key, e.target.value),
});
