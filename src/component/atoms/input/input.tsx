import React, { ChangeEvent } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (React.KeyboardEventHandler<HTMLInputElement>)
  type?: string;
  name?: string;
  disabled?:boolean
  className?:string | {};
}

const InputReuseable: React.FC<InputProps> = ({ label, className ='',...rest }) => {
  return (
    <>
    {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`w-full px-4 py-4 
                    rounded-lg font-medium 
                    bg-gray-100 border border-gray-200 
                    placeholder-gray-500 text-sm 
                    focus:outline-none focus:border-gray-400 focus:bg-white ${className}` }
      />
    </>
  );
};

export default InputReuseable;
