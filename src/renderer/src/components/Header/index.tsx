import { FC } from 'react'
import { MdClose, MdHorizontalRule } from 'react-icons/md'
import Logo from '../../assets/Logo.svg'
import Button from '../Button'

export const Header: FC = () => {
  const minimize = () => window.electron.ipcRenderer.send('minimize')
  const close = () => window.electron.ipcRenderer.send('close')
  return (
    <div className="flex py-4 px-6 w-full justify-between items-center sticky top-0 select-none bg-slate-50">
      <div className="flex items-center gap-2 h-auto">
        <img id="icon" src={Logo} className="menu-icon select-none" alt="Logo" />
        <h1 className="font-family text-2xl font-bold text-center text-slate-700">PrograMe</h1>
      </div>

      <div className="h-fit flex gap-2">
        <Button
          title="Minimize"
          variant="text"
          onClick={minimize}
          icon={<MdHorizontalRule size={24} />}
        />

        <Button title="Close" variant="text" onClick={close} icon={<MdClose size={24} />} />
      </div>
    </div>
  )
}
