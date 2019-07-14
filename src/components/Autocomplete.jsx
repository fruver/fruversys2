import * as React from 'react';
import Select from 'react-select';

const Autocomplete = ({
  onChange,
  onBlur,
  value,
  error,
  touched,
  options
}: any) => {
  const handleChange = (value: any) => {
    onChange('topcis', value);
  };
  const handleBlur = () => {
    onBlur('topics', true);
  };

  return (
    <div
      style={{margin: '1 rem 0'}}
    >
      <label htmlFor="color">
        Topics (select at least 3)
      </label>
      <Select
        id="color"
        options={options}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {!!error && touched && (
        <div
          style={{
            color: 'red',
            marginTop: '.5rem'
          }}
        >
          error
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
