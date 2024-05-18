import React from 'react';

type Props = {
  id: string;
  label: string;
  required?: boolean;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>> | ((state: any) => void);
};

export const CheckboxField = ({ id, label, required = false, state, setState }: Props) => {
  const toggleCheck = () => setState(!state);

  return (
    <div className="flex gap-3">
      <input type='checkbox'
             name={id}
             id={id}
             checked={state}
             onChange={toggleCheck}
             className=""
             required={required} />
      <label htmlFor={id} className="text-gray-900">{label}</label>
    </div>
  );
};
