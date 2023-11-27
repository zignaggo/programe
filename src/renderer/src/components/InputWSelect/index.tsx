import { Dispatch, InputHTMLAttributes, SetStateAction, forwardRef } from 'react'
import './style.css'
import Dropdown, { IDropdownOption } from '../Dropdown'
import clsx from 'clsx'

type Ref = HTMLInputElement

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  selectedItem: IDropdownOption | undefined
  setSelectedItem: Dispatch<SetStateAction<IDropdownOption>>
  options: IDropdownOption[]
  className?: string
}

const InputWSelect = forwardRef<Ref, InputProps>((props, ref) => {
  const { name, selectedItem, options, className, setSelectedItem, ...rest } = props
  const merged = clsx(
    'input-wrapper h-14 relative flex items-center rounded-lg border border-slate-700 focus-within:ring focus-within:ring-blue-300 px-4',
    className
  )
  return (
    <div className={merged}>
      <input
        id={name}
        ref={ref}
        className="bg-transparent remove-spin h-full w-full focus:outline-none"
        {...rest}
      />
      <Dropdown
        className="min-w-fit px-2"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        type="arrow-down"
        selectedShow="label"
        options={options}
      />
    </div>
  )
})

InputWSelect.displayName = 'InputWSelect'
export default InputWSelect
