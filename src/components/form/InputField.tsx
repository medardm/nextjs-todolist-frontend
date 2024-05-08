import React from 'react';

type Props = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export const InputField = ({ id, label, placeholder, required = false, type = "text", state, setState }: Props) => {
  const handleChange = (event: { target: { value: any; }; }) => setState(event.target.value);

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input type={type}
             name={id}
             id={id}
             value={state}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
             placeholder={placeholder}
             required={required} />
    </div>
  );
};
